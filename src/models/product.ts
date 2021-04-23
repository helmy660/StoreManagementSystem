import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces";

const ProductSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  picture: { type: String, required: true },
  rate: { type: Number, default: 0 },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  offer: { type: Number, default: null },
  soldNumbers: { type: Number, default: 0 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, required: true }],
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
