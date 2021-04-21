import { Document } from "mongoose";
import { UserRoles } from "../enum";

export interface IUser extends Document {
  userName: string;
  password: string;
  role: UserRoles;
  firstName: string;
  lastName: string;
}
