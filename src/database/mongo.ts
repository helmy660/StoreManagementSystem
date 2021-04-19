import mongoose from "mongoose";
import { DB_USER, DB_PASSWORD, DB_NAME } from "../util/secrets";

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@store.oe62u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

export const dbConnection = async () => {
  await mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err: any) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};
