import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  picture: string;
  rate: number;
  price: number;
  quantity: number;
  offers: string;
  soldNumbers: number;
  title: string;
  description: string;
  categories: Array<string>;
}
