import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        required: true,
        ref: "ProductService"
    },
    userId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false},
    isPaymentSuccessful: { type: Boolean, default: false},
} , {
    timestamps: true,
});

export default mongoose.model("Bookings", bookingSchema);