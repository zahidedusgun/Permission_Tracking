import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwtAuthMiddleware from "./routes/jwtAuth";
import pool from "./db";
import request from "./routes/requests";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", jwtAuthMiddleware);
app.use("/date", request);

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
