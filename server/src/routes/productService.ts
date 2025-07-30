import { Router } from "express";
import { addProductService, updateProductService, deleteProductServiceById, getAllProductServices } from "../controllers/productServiceController.ts";

const productServiceRouter = Router();

productServiceRouter.post("/product-service", addProductService);
productServiceRouter.patch("/product-service/:id", updateProductService);
productServiceRouter.delete("/product-service/:id", deleteProductServiceById);
productServiceRouter.get("/product-service/", getAllProductServices);

export default productServiceRouter;