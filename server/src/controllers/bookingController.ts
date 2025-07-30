import { Request, Response } from "express";
import Booking from "../model/bookingModel.ts";
import ProductServices from "../model/productServiceModel.ts";
import User from "../model/user.ts";

export const createBooking = async (req: Request, res:  Response) => {
    const { serviceId, userId, userName, userPhone, startTime, endTime } = req.body; 

    if(!serviceId || !userId || !userName || !startTime || !endTime ) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if(!user.isEmailVerified) {
            return res.status(403).json({ success: false, message: "User is not verified" });
        }
        const service = await ProductServices.findOne({ id : serviceId });
        if(!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        const overlappingBookings = await Booking.countDocuments({
            serviceId,
            $or : [
                { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime ) } }
            ]
        });

        if ( overlappingBookings >= Number(service.numberOfDevices) ){
            return res.status(409).json({
                success: false, 
                message: "No available devices at the selected time",
            });
        }

        const newBooking = await Booking.create({ 
            serviceId, 
            userName, 
            userPhone,
            userId, 
            startTime, 
            endTime
        });

        return res.status(201).json({
            success: true,
            message: "Booking confirmed",
            data: newBooking,
        });
    } catch (error) {
        console.error("Create Booking Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
