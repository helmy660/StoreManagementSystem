import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces";

const CategorySchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  parent: { type: String, required: true },
  path: { type: String, required: true },
});

export const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
