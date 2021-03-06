import { Document } from "mongoose";
import { Currency } from "../enum";

export interface IProduct extends Document {
  picture: string;
  rate: number;
  price: number;
  quantity: number;
  offer: number;
  soldNumbers: number;
  title: string;
  description: string;
  categories: Array<string>;
  currency: Currency;
}
