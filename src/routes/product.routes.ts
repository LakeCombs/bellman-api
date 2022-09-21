import { Router } from "express";
import {
	addProductToCartHandler,
	createProductHandler,
	getAllProduct,
	getProductBycategory,
	getProductByName,
} from "../controllers/product.controller";
import { auth } from "../middleware/authentication.middleware";

const productRoute = Router();

productRoute.post("/", createProductHandler);
productRoute.get("/", getAllProduct);
productRoute.get("/search", getProductByName);
productRoute.get("/category", getProductBycategory);
productRoute.post("/cart/:id", auth, addProductToCartHandler);

export default productRoute;
