import mongoose from "mongoose";
import { ProductModel } from "../models";
import { IProduct } from "../interfaces";
import { CustomError, ErrorTypes } from "../services";

export class Product {
  async add(data: IProduct) {
    try {
      return await ProductModel.create({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        description: data.description,
        picture: data.picture,
        rate: data.rate,
        price: data.price,
        quantity: Number(data.quantity),
        offer: data.offer,
        soldNumbers: Number(data.soldNumbers),
        categories: data.categories,
        currency: data.currency,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_REQUEST_BODY);
    }
  }

  async update(productId: string, data: any) {
    try {
      return await ProductModel.findByIdAndUpdate(productId, data);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async updateQuantity(productId: string, quantity: number, soldNumbers: number) {
    try {
      return await ProductModel.updateOne(
        { _id: productId },
        {
          $inc: { soldNumbers },
          quantity,
        },
      );
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getById(productId: string) {
    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getByCategoryId(categoryId: string) {
    try {
      return await ProductModel.find({ categories: categoryId });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getAll() {
    try {
      return await ProductModel.find();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }
}
