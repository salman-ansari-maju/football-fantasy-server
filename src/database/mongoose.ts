import mongoose from "mongoose";
import { MONGODB_URI } from "../constants";

mongoose.connect(MONGODB_URI, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});
