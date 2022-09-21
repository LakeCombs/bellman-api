import { Router } from "express";
import {
	addProductToCartHandler,
	addProductToPurchased,
	createProductHandler,
	deleteProductHandler,
	editProductHandler,
	getAllProduct,
	getProductBycategory,
	getProductByName,
	removeProductFromCartHandler,
} from "../controllers/product.controller";
import { auth } from "../middleware/authentication.middleware";
import { is_admin } from "../middleware/isadminmiddleware";

const productRoute = Router();

productRoute.post("/", is_admin, createProductHandler);
productRoute.get("/", getAllProduct);
productRoute.get("/search", getProductByName);
productRoute.get("/category", getProductBycategory);
productRoute.post("/cart/:id", auth, addProductToCartHandler);
productRoute.post("/remove:id", auth, removeProductFromCartHandler);
productRoute.post("/purchased:id", auth, addProductToPurchased);
productRoute.put("/:id", is_admin, editProductHandler);
productRoute.delete("/:id", is_admin, deleteProductHandler);

export default productRoute;
