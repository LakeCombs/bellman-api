import { Router } from "express";
import {
	deleteImageHandler,
	editImageHandler,
	getAllImageHandler,
	getImageHandler,
	uploadImageHandler,
} from "../controllers/image.controller";
import upload_to_cloudinary from "../service/multer.service";

const imageRoute = Router();

imageRoute.get("/", getAllImageHandler);
imageRoute.get("/:id", getImageHandler);
imageRoute.post("/", upload_to_cloudinary.array("image"), uploadImageHandler);
imageRoute.put("/:id", upload_to_cloudinary.single("image"), editImageHandler);
imageRoute.delete(
	"/:id",
	upload_to_cloudinary.single("image"),
	deleteImageHandler
);

export default imageRoute;
