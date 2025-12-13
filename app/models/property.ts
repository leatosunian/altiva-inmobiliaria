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

  luminocity?: string;
  infrastructureStatus?: string;
  disposition?: string;

  hasElevator?: boolean;
  calefaction?: string;
  hasPatio?: boolean;
  hasPool?: boolean;
  hasQuincho?: boolean;
  hasTerrace?: boolean;
  uncoveredMetersSquare?: number;
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
      required: false,
    },
    dormitorios: {
      type: Number,
      required: false,
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
      required: false,
    },
    rooms: {
      type: Number,
      required: false,
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
      required: false,
    },
    coveredMetersSquare: {
      type: Number,
      required: false,
    },
    uncoveredMetersSquare: {
      type: Number,
      required: false,
    },
    expensas: {
      type: Number,
      required: false,
    },
    antiquity: {
      type: Number,
      required: false,
    },
    floors: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    imagePublicID: {
      type: String,
      required: false,
    },
    luminocity: {
      type: String,
      required: false,
    },
    infrastructureStatus: {
      type: String,
      required: false,
    },
    disposition: {
      type: String,
      required: false,
    },
    hasElevator: {
      type: Boolean,
      required: false,
      default: false
    },
    calefaction: {
      type: String,
      required: false,
    },
    hasPatio: {
      type: Boolean,
      required: false,
    },
    hasPool: {
      type: Boolean,
      required: false,
    },
    hasQuincho: {
      type: Boolean,
      required: false,
    },
    hasTerrace: {
      type: Boolean,
      required: false,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PropertyModel = models.properties || model("properties", propertyModel);

export default PropertyModel;
