import mongoose, { Schema } from "mongoose";
import { OrderStatus, Currency } from "../enum";
import { IOrder } from "../interfaces";

const OrderSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    customerId: { type: String, required: true },
    sellerId: { type: String, default: null },
    status: { type: String, default: OrderStatus.CREATED },
    totalItems: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: Currency.EGP },
    products: [{ type: Object, required: true }],
  },
  {
    timestamps: true,
  },
);

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
