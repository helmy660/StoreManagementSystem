import mongoose from "mongoose";
import { ProductModel } from "../models";
import { IProduct } from "../interfaces";
import { CustomError, ErrorTypes } from "../services";

export class Product {
  async add(data: IProduct) {
    try {
      return await ProductModel.create({
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        picture: data.picture,
        rate: data.rate,
        price: data.price,
        quantity: data.quantity,
        offers: data.offers,
        soldNumbers: data.soldNumbers,
        title: data.title,
        description: data.description,
        categories: data.categories,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_REQUEST_BODY);
    }
  }
}
