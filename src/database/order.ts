import mongoose from "mongoose";
import { OrderModel } from "../models";
import { CustomError, ErrorTypes } from "../services";
import { OrderStatus } from "../enum";

export class Order {
  async create(customerId: string, data: any) {
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

  async removeOrder(orderId: string) {
    try {
      return await OrderModel.findByIdAndDelete(orderId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async removeProduct(orderId: string, products: Array<any>, totalItems: number, totalPrice: number) {
    try {
      return await OrderModel.updateOne(
        { _id: orderId },
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

  async removeAllProducts(orderId: string) {
    try {
      return await OrderModel.updateOne(
        { _id: orderId },
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

  async getById(orderId: string) {
    try {
      return await OrderModel.findById(orderId);
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

  async getCustomerOrders(customerId: string) {
    try {
      return await OrderModel.find().where("customerId").equals(customerId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getSellerOrders(sellerId: string) {
    try {
      return await OrderModel.find().where("sellerId").equals(sellerId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getAssigned() {
    try {
      return await OrderModel.find().where("status").equals(OrderStatus.ASSIGNED_TO_SELLER);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getUnAssigned() {
    try {
      return await OrderModel.find().where("sellerId").equals(null);
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

  async refuseBySeller(orderId: string) {
    try {
      return await OrderModel.findByIdAndUpdate(orderId, { sellerId: null, status: OrderStatus.REFUSED_BY_SELLER });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async assignToSeller(orderId: string, sellerId: string) {
    try {
      return await OrderModel.findByIdAndUpdate(orderId, { sellerId, status: OrderStatus.ASSIGNED_TO_SELLER });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async deliverOrder(orderId: string) {
    try {
      return await OrderModel.findByIdAndUpdate(orderId, { status: OrderStatus.READY_FOR_DELIVERY });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }
}
