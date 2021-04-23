import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces";

const CategorySchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
});

export const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
