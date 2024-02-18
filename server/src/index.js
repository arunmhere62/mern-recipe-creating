import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb+srv://1996viratarun:1996viratarun@cluster0.cig6l6m.mongodb.net/recipes?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error: ", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const port = 3003;

app.listen(port, () => console.log(`Server is running on port ${port}`));
