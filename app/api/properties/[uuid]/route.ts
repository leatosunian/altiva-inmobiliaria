import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import BranchModel from "@/app/models/branch";
import { v2 as cloudinary } from "cloudinary";
import PropertyModel, { IProperty } from "@/app/models/property";
import PropertyImageModel from "@/app/models/propertyimage";

// GET CAR BY UUID
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();
  try {
    const property = await PropertyModel.findOne({ _id: params.uuid });
    //console.log(property);
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_PROPERTY" });
  }
}

// DELETE PROPERTY BY UUID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();

  try {
    cloudinary.config({
      cloud_name: "dm4mkjisn",
      api_key: "274595485733553",
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    // get property data
    const propertyToDelete = await PropertyModel.findOne({ _id: params.uuid });
    // get gallery data
    const gallery = await PropertyImageModel.find({ propertyID: params.uuid });
    // delete property
    await PropertyModel.findOneAndDelete({ _id: params.uuid });
    // delete thumbnail from cloudinary
    await cloudinary.uploader.destroy(propertyToDelete.imagePublicID);
    // delete gallery images from cloudinary
    for (const image of gallery) {
      await cloudinary.uploader.destroy(image.public_id);
      await PropertyImageModel.deleteOne({ _id: image._id });
    }

    return NextResponse.json({ msg: "PROPERTY_DELETED" });
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_DELETE_PROPERTY" });
  }
}

// EDIT PROPERTY
export async function PUT(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();
  const { uuid } = params;
  const data: IProperty = await request.json();
  try {
    const property = await PropertyModel.findOneAndUpdate({ _id: uuid }, data, {
      new: true,
    });
    console.log("property editada:", property);
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_EDIT_PROPERTY" });
  }
}
