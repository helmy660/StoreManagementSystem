import mongoose, { Schema } from "mongoose";
import { CartStatus, Currency } from "../enum";
import { ICart } from "../interfaces";

const CartSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  customerId: { type: String, required: true },
  status: { type: String, default: CartStatus.ACTIVE },
  totalItems: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  currency: { type: String, default: Currency.EGP },
  products: [{ type: Schema.Types.ObjectId, default: [] }],
});

export const CartModel = mongoose.model<ICart>("Cart", CartSchema);
