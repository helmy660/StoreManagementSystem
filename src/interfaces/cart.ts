import { Document } from "mongoose";
import { CartStatus, Currency } from "../enum";

export interface ICart extends Document {
  customerId: string;
  status?: CartStatus;
  totalItems?: number;
  totalPrice?: number;
  products?: Array<any>;
  currency: Currency;
}
