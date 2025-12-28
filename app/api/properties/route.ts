import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import BranchModel from "@/app/models/branch";
import { v4 as uuidv4 } from "uuid";
import PropertyModel from "@/app/models/property";

// GET ALL CARS
export async function GET(request: NextRequest, context: any) {
  await connectDB();
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const businessType = url.searchParams.get("businessType");
  const propertyType = url.searchParams.get("propertyType");
  console.log('businessType', businessType);
  console.log('propertyType', propertyType);
  console.log('search', search);
  
  try {
    // escape regex helper to avoid injection/issues with special chars
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let query: any = {};

    if (businessType) {
      query.businessType = { $regex: new RegExp(`^${escapeRegExp(businessType)}$`, "i") };
    }

    if (propertyType) {
      query.propertyType = { $regex: new RegExp(`^${escapeRegExp(propertyType)}$`, "i") };
    }

    if (search) {
      const s = escapeRegExp(search);
      const searchRegex = { $regex: new RegExp(s, "i") };
      const searchClause = {
        $or: [
          { name: searchRegex },
          { businessType: searchRegex },
          { propertyType: searchRegex },
          { address: searchRegex },
        ],
      };

      // if other filters already set, combine with AND
      if (Object.keys(query).length > 0) {
        query = { $and: [query, searchClause] };
      } else {
        query = searchClause;
      }
    }

    const properties = await PropertyModel.find(query);
    return NextResponse.json(properties);
  } catch (error) {
    console.error("ERROR_GET_PROPERTY", error);
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
