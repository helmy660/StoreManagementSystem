import { Document } from "mongoose";
import { OrderStatus, Currency } from "../enum";

export interface IOrder extends Document {
  customerId: string;
  sellerId?: string;
  status?: OrderStatus;
  totalItems?: number;
  totalPrice?: number;
  currency: Currency;
  products?: Array<any>;
}
