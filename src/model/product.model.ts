import { Product_Interface } from "./../interfaces/product.interface";
import mongoose, { Schema } from "mongoose";

const product_schema: Schema = new mongoose.Schema<Product_Interface>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true, minlength: 50 },
		price: { type: Number, required: true },
		currency: { type: String, default: "NGN" },
		image_urls: [{ type: String }],
		category: [{ type: String }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
		Gallery: [{ type: Schema.Types.ObjectId, ref: "Gallery" }],
	},
	{ timestamps: true }
);

const productModel = mongoose.model<Product_Interface>(
	"Product",
	product_schema
);

export default productModel;
