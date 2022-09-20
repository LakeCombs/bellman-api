import { IProduct } from "./../interfaces/product.interface";
import mongoose, { Schema } from "mongoose";

const product_schema: Schema = new mongoose.Schema<IProduct>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true, minlength: 50 },
		price: { type: Number, required: true },
		currency: { type: String, default: "NGN" },
		image_urls: [{ type: String }],
		category: [{ type: String }],
	},
	{ timestamps: true }
);

const productModel = mongoose.model<IProduct>("Product", product_schema);

export default productModel;
