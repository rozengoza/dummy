import { Router } from "express";
import { createBooking } from "../controllers/bookingController.ts";
const bookingRouter = Router();

bookingRouter.post( "/create-booking", createBooking );

export default bookingRouter;