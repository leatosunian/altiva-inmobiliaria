import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import BranchModel from "@/app/models/branch";
import { v4 as uuidv4 } from "uuid";
import PropertyModel from "@/app/models/property";

// GET ALL CARS
export async function GET(request: NextRequest, context: any) {
  await connectDB();
  const { search } = Object.fromEntries(new URL(request.url).searchParams);
  try {
    const searchQuery =
      search && (search !== "null") !== null
        ? {
          name: { $regex: new RegExp(search.toLowerCase(), "i") },
        }
        : {};
    const properties = await PropertyModel.find(searchQuery);
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_PROPERTY" });
  }
}

// CREATE NEW PROPERTY
export async function POST(request: NextRequest) {

  await connectDB();
  const data = await request.json();
  data.imagePublicID = ''
  
  //data.bathrooms = Number(data.bathrooms)
  //data.floors = Number(data.floors)
  //data.antiquity = Number(data.antiquity)
  //data.expensas = Number(data.expensas)
  //data.price = Number(data.price)
  //data.coveredMetersSquare = Number(data.coveredMetersSquare)
  //data.metersSquare = Number(data.metersSquare)
  //data.garageCarsQuantity = Number(data.garageCarsQuantity)
  //data.rooms = Number(data.rooms)
  //data.dormitorios = Number(data.dormitorios)
  console.log(data)
  try {
    const property = await PropertyModel.create(data);
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error al crear la propiedad:", error);
    return NextResponse.json({ msg: "ERROR_CREATE_PROPERTY" });
  }
}
