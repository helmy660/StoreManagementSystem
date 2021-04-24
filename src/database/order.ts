import mongoose from "mongoose";
import { OrderModel } from "../models";
import { CustomError, ErrorTypes } from "../services";
import { OrderStatus } from "../enum";
import { IOrder } from "../interfaces";

export class Order {
  async create(customerId: string, data: IOrder) {
    try {
      return await OrderModel.create({
        _id: new mongoose.Types.ObjectId(),
        customerId,
        totalItems: data.totalItems,
        totalPrice: data.totalPrice,
        products: data.products,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeProduct(cartId: string, products: Array<any>, totalItems: number, totalPrice: number) {
    try {
      return await OrderModel.updateOne(
        { _id: cartId },
        {
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
      return await OrderModel.updateOne(
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
      return await OrderModel.findById(cartId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getAll() {
    try {
      return await OrderModel.find();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getByCustomerId(customerId: string) {
    try {
      return await OrderModel.findOne({ customerId });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async refuseBySeller(cartId: string) {
    try {
      return await OrderModel.findByIdAndUpdate(cartId, { status: OrderStatus.REFUSED_BY_SELLER });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async assignToSeller(cartId: string, sellerId: string) {
    try {
      return await OrderModel.findByIdAndUpdate(cartId, { sellerId, status: OrderStatus.ASSIGNED_TO_SELLER });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async deliverOrder(cartId: string) {
    try {
      return await OrderModel.findByIdAndUpdate(cartId, { status: OrderStatus.READY_FOR_DELIVERY });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }
}
