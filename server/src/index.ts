import express from "express";
import cors from "cors";
import connect from "./db/connect.ts";
import userRouter from "./routes/user.ts";
import productServiceRouter from "./routes/productService.ts";
import bookingRouter from "./routes/booking.ts";
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
app.use(productServiceRouter);
app.use(bookingRouter);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});