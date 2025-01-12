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
  currency: string;
  propertyType: string;
  metersSquare: number;
  rooms: number;
  coveredMetersSquare: number;
  expensas: number;
  antiquity: number;
  floors: number;
  description: string;
  show: boolean;
  status: string;
  _id?: string;
  dormitorios: number;
  imagePublicID?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

const propertyModel: Schema = new Schema<IProperty>(
  {
    show: {
      type: Boolean,
      required: true,
      default: true
    },
    status: {
      type: String,
      required: true,
      default: 'Disponible'
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    dormitorios: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currency: {
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
    rooms: {
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
      default: ''
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
    imagePublicID: {
      type: String,
      required: false,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PropertyModel = models.properties || model("properties", propertyModel);

export default PropertyModel;
