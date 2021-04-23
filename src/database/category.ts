import mongoose from "mongoose";
import { CategoryModel } from "../models";
import { ICategory } from "../interfaces";
import { CustomError, ErrorTypes } from "../services";

export class Category {
  async add(data: ICategory) {
    try {
      return await CategoryModel.create({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        name: data.name,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async update(categoryId: string, data: any) {
    try {
      return await CategoryModel.findByIdAndUpdate(categoryId, { title: data.title });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getById(categoryId: string) {
    try {
      return await CategoryModel.findById(categoryId);
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }

  async getAll() {
    try {
      return await CategoryModel.find();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }
  }
}
