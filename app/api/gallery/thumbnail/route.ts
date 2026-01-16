import { v2 as cloudinary } from "cloudinary";
import PropertyModel from "@/app/models/property";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import connectDB from "@/lib/db";

// SAVE GALLERY IMAGES
export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const data = await request.formData();
    const carID = data.get("carID") as string;
    const files = data.getAll("gallery_images") as File[];

    cloudinary.config({
      cloud_name: "dm4mkjisn",
      api_key: "274595485733553",
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    if (files.length === 0) {
      return NextResponse.json({ msg: "NO_FILES_PROVIDED" }, { status: 400 });
    }

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      try {
        const cloudinaryResponse: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, (error, result) => {
              if (error) {
                reject(error);
              }
              resolve(result);
            })
            .end(buffer);
        });
        console.log('cloudinaryResponse', cloudinaryResponse);
        
        const updatedCar = await PropertyModel.findOneAndUpdate(
          { _id: carID },
          {
            imagePath: cloudinaryResponse.secure_url,
            imagePublicID: cloudinaryResponse.public_id,
          }
        );
        if (updatedCar.imagePublicID !== "") {
          await cloudinary.uploader.destroy(updatedCar.imagePublicID);
        }
      } catch (writeError) {
        console.error("Error writing file:", writeError);
        return NextResponse.json(
          { msg: "ERROR_WRITING_FILE" },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ msg: "THUMBNAIL_UPLOADED" });
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}
