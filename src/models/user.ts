import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { UserRoles } from "../enum";
import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRoles, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.generateHash = async (password: string) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = async (givenPassword: string, userPassword: string) => {
  return bcrypt.compare(givenPassword, userPassword);
};

export const UserModel = mongoose.model<IUser>("User", UserSchema);
