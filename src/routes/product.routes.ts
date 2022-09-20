import { Router } from "express";
import {
	createProductHandler,
	getAllProduct,
	getProductByName,
} from "../controllers/product.controller";

const productRoute = Router();

productRoute.post("/", createProductHandler);
productRoute.get("/", getAllProduct);
productRoute.get("/search", getProductByName);

export default productRoute;
