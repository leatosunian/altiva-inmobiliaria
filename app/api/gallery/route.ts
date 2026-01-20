import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import PropertyImageModel from "@/app/models/propertyimage";
import connectDB from "@/lib/db";

// SAVE GALLERY IMAGES
export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const data = await request.formData();
    const propertyID = data.get("property_id") as string;
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
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
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

      await PropertyImageModel.create({
        propertyID,
        path: cloudinaryResponse.secure_url,
        uuid: uuidv4(),
        public_id: cloudinaryResponse.public_id
      });
    }

    return NextResponse.json({ msg: "FILES_UPLOADED" });
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}
