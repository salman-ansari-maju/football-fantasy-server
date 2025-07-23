require("dotenv").config();
require("./database/mongoose");
import express from "express";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
