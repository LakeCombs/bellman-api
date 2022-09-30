import express, { Request, Response } from "express";
import gallery_route from "../routes/gallery.routes";
import imageRoute from "../routes/image.routes";
import postRoute from "../routes/post.routes";
import productRoute from "../routes/product.routes";
import userRoute from "../routes/user.routes";

const v1 = express.Router();

v1.get("/", (req: Request, res: Response) => {
	res.status(200).json({
		status: 200,
		message: "welcome to bellman api",
		version: "1.0.0",
	});
});

v1.use("/v1/user", userRoute);
v1.use("/v1/product", productRoute);
v1.use("/v1/post", postRoute);
v1.use("/v1/gallery", gallery_route);
v1.use("/v1/image", imageRoute);

export default v1;
