import mongoose from "mongoose";
import { DB_USER, DB_PASSWORD, DB_NAME } from "../util/secrets";

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@store.oe62u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = () => {
  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
};
