import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  picture: String;
  rate: Number;
  price: Number;
  quantity: Number;
  offers: String;
  soldNumbers: Number;
}
