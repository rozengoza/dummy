import { Request, Response } from "express";
import { nanoid } from "nanoid";
import ProductServices from "../model/productServiceModel.ts";

/**
 * @route   POST /api/product-service
 * @desc    Create/Add a new product service
 * @access  Admin 
 */

export const addProductService = async ( req: Request, res: Response ) => {
    const { name, description, numberOfDevices,  type, hourlyRate, imageUrl } = req.body;

    if (!name || !type || !hourlyRate || !imageUrl || !numberOfDevices ) {
        return res.status(400).json({
            success: false,
            message: "Name, type, hourlyRate and imageUrl are required fields",
        });
    }

    const validTypes = ["playStation", "pc", "netflixRoom"];
    if (!validTypes.includes(type)){
        return res.status(400).json({
            success: false,
            message: `Invalid service type. Must be one of: ${validTypes.join(", ")}`,
        });
    }

    try {
        const existingService = await ProductServices.findOne({ type  });
        if( existingService ) {
            return res.status(409).json({
                success: false,
                message: "A producct service with the same type already exists",
            });
        }
        const newService = await ProductServices.create({
            id: nanoid(10),
            name,
            description,
            type,
            hourlyRate,
            imageUrl,
            numberOfDevices,
            isActive: true,
        });

        return res.status(201).json({
            success: true,
            message: "Product service created successfuly",
            data: newService,
        });
    } catch (error) {
        if ((error as any).code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Duplicate service ID or name",
            });
        }

        if(error instanceof Error && error.name === "ValidationError") {
            return res.status(400).json({ success: false, message: error.message });
        }

        console.error("Add ProductService Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const updateProductService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Product service ID is required",
        });
    }

    const validTypes = ["playStation", "pc", "netflixRoom"];
    if (updateData.type && !validTypes.includes(updateData.type)) {
        return res.status(400).json({
            success: false,
            message: `Invalid service type. Must be one of ${validTypes.join(", ")}`,
        });
    }

    try {
        const updateService = await ProductServices.findOneAndUpdate(
            { id },
            { $set: updateData },
            { new : true, runValidators: true } 
        );

        if (!updateService) {
            return res.status(400).json({
                success: false,
                message: "Product service not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product service updated successfully",
            data: updateService,
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }

            console.error("Update ProductService Error:", error);
            return res.status(500).json({
                success: false,
                messasge: "Internal Server Error",
            });
    }
};

/**
 * @route DELETE /api/product-service/:id
 * Delete a single product-service by ID
 * @access Admin
 */

export const deleteProductServiceById = async ( req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Produce service ID is required",
        });
    }

    try {
        const deleted = await ProductServices.findOneAndDelete({ id });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product service not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product service deleted successfully",
            data: deleted,
        });
    } catch (error) {
        console.error("Delete ProductService Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

/**
 * @route GET /api/product-service
 * @desc Get all produce services (optionally filter by type or isActive)
 * @access Admin
 */
export const getAllProductServices = async (req: Request, res: Response) => {
    try {
        const { type, isActive } = req.query;

        const query: any = {};

        if(type) {
            const validTypes = ["playStation", "pc", "netflixRoom"];
            if (!validTypes.includes(type as  string)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid service type. Must be one of: ${validTypes}`,
                });
            }
            query.type = type;
        }

        if (isActive !== undefined) {
            query.isActive = isActive === "true";
        }

        const services = await ProductServices.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        console.error("Gell All Product Services Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}