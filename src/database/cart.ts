import mongoose from "mongoose";
import { CartModel } from "../models";
import { CustomError, ErrorTypes } from "../services";
import { CartStatus } from "../enum";

export class Cart {
  async create(customerId: string) {
    try {
      const existingCart = await this.getByCustomerId(customerId);
      if (existingCart) {
        throw new CustomError(ErrorTypes.CUSTOMER_ALREADY_HAS_CART);
      }
      return await CartModel.create({
        _id: new mongoose.Types.ObjectId(),
        customerId,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.CUSTOMER_ALREADY_HAS_CART);
    }
  }

  async addProduct(cartId: string, products: Array<any>, totalItems: number, totalPrice: number) {
    try {
      return await CartModel.updateOne(
        { _id: cartId },
        {
          status: CartStatus.ACTIVE,
          $inc: { totalItems, totalPrice },
          products,
        },
      );
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async removeProduct(cartId: string, products: Array<any>, totalItems: number, totalPrice: number) {
    try {
      return await CartModel.updateOne(
        { _id: cartId },
        {
          status: CartStatus.ACTIVE,
          $inc: { totalItems: -totalItems, totalPrice: -totalPrice },
          products,
        },
      );
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async removeAllProducts(cartId: string) {
    try {
      return await CartModel.updateOne(
        { _id: cartId },
        {
          totalItems: 0,
          totalPrice: 0,
          products: [],
        },
      );
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getById(cartId: string) {
    try {
      return await CartModel.findById(cartId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getAll() {
    try {
      return await CartModel.find();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getByCustomerId(customerId: string) {
    try {
      return await CartModel.findOne({ customerId });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async susbend(cartId: string) {
    try {
      return await CartModel.findByIdAndUpdate(cartId, { status: CartStatus.SUSPENDED });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }
}
