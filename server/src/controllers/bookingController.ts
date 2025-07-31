import { Request, Response } from "express";
import Booking from "../model/bookingModel.ts";
import ProductServices from "../model/productServiceModel.ts";
import User from "../model/user.ts";

export const createBooking = async (req: Request, res: Response) => {
    const { serviceId, userId, startTime, endTime } = req.body;

    if (!serviceId || !userId || !startTime || !endTime) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    if (start < now) {
        return res.status(400).json({
            success: false,
            message: "Cannot book a time slot in the past",
        });
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
        return res.status(400).json({ success: false, message: "Invalid time range" });
    }

    const maxDurationMinutes = 120;
    const duration = (end.getTime() - start.getTime()) / (1000 * 60);

    if (duration > maxDurationMinutes) {
        return res.status(400).json({
            success: false,
            message: `Bookings cannot exceed ${maxDurationMinutes} minutes.`,
        });
    }

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!user.isEmailVerified) {
            return res.status(403).json({ success: false, message: "User is not verified" });
        }
        const service = await ProductServices.findById(serviceId);
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        const overlappingBookings = await Booking.countDocuments({
            serviceId,
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        });

        if (overlappingBookings >= Number(service.numberOfDevices)) {
            return res.status(409).json({
                success: false,
                message: "No available devices at the selected time",
            });
        }

        const userOverlappingBooking = await Booking.findOne({
            userId,
            serviceId,
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        });

        if (userOverlappingBooking) {
            return res.status(409).json({
                success: false,
                message: "You already have a booking for this time slot.",
            });
        }

        const newBooking = await Booking.create({
            serviceId,
            userEmail: user.email,
            userPhone: user?.phoneNumber,
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
