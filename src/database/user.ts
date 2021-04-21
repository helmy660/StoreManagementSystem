import mongoose from "mongoose";
import { UserModel } from "../models";
import { IUser } from "../interfaces";
import { CustomError, ErrorTypes } from "../services";

export class User {
  async add(data: IUser) {
    try {
      console.log(`Creating a user account with data: ${JSON.stringify(data)}`);
      const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        userName: data.userName,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      user.password = await user.generateHash(data.password);
      await user.save();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_CREDENTIALS);
    }
  }

  async getByUserName(userName: string) {
    try {
      console.log(`Getting a user account with userName: ${userName}`);
      const user = await UserModel.findOne({ userName }).exec();
      if (user) return user;
      else throw new Error();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_CREDENTIALS);
    }
  }
}
