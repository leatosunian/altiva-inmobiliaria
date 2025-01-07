import { Document, model, Schema, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPropertyImage extends Document {
  propertyID: string;
  path: string;
  uuid: string;
  public_id: string;
}

const propertyImageSchema: Schema = new Schema<IPropertyImage>(
  {
    propertyID: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PropertyImageModel = models.property_images || model("property_images", propertyImageSchema);

export default PropertyImageModel;
