import { Document, model, Schema, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IProperty extends Document {
  name: string;
  bathrooms: number;
  businessType: string;
  garageCarsQuantity: number;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  imagePath: string;
  price: number;
  propertyType: string;
  metersSquare: number;
  coveredMetersSquare: number;
  uncoveredMetersSquare: number;
  expensas: number;
  antiquity: number;
  floors: number;
  description: string;
  _id?: string;
}

const adminSchema: Schema = new Schema<IProperty>(
  {
    bathrooms: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    garageCarsQuantity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      select: false,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    metersSquare: {
      type: Number,
      required: true,
    },
    uncoveredMetersSquare: {
      type: Number,
      required: true,
    },
    coveredMetersSquare: {
      type: Number,
      required: true,
    },
    expensas: {
      type: Number,
      required: true,
    },
    antiquity: {
      type: Number,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AdminModel = models.admin_users || model("admin_users", adminSchema);

export default AdminModel;
