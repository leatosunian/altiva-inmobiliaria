import PropertyImageModel from "@/app/models/propertyimage";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";

// GET GALLERY IMAGES
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();
  console.log(params.uuid);

  try {
    const images = await PropertyImageModel.find({ propertyID: params.uuid }).sort({createdAt: -1});

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ msg: "NO_FILE_PROVIDED" }, { status: 400 });
  }
}


