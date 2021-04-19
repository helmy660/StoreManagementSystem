import mongoose from "mongoose";
import { DB_USER, DB_PASSWORD, DB_NAME } from "../util/secrets";

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@store.oe62u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, connectionParams);

//Get the default connection
export const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
