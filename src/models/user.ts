import mongoose, { Schema } from "mongoose";
import { UserRoles } from "../enum";
import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    userName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRoles, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
