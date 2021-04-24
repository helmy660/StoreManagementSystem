import { Document } from "mongoose";
import { OrderStatus } from "../enum";

export interface IOrder extends Document {
  customerId: string;
  sellerId?: string;
  status?: OrderStatus;
  totalItems?: number;
  totalPrice?: number;
  products?: Array<any>;
}
