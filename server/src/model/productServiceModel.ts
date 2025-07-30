import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";

export interface IProductService extends Document {
    id: string;
    name: string;
    numberOfDevices: Number;
    description: string;
    type: "playStation" | "pc" | "netflixRoom";
    hourlyRate: number;
    imageUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productServiceSchema = new Schema<IProductService>(
    {
        id: {
            type: String,
            default: () => nanoid(),
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        numberOfDevices: {
            type: Number,
            min: 0,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ["playStation", "pc", "netflixRoom"],
            required: true,
            index: true,
        },
        hourlyRate: {
            type: Number,
            required: true,
            min: 0,
            max: 5000,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProductServices = mongoose.model<IProductService>("ProductService", productServiceSchema);
export default ProductServices;