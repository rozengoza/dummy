import express from "express";
import cors from "cors";
import connect from "./db/connect.ts";
import userRouter from "./routes/user.ts";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const app = express();

connect();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(userRouter);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});