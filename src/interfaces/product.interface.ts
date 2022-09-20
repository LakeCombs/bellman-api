import { Document } from "mongoose";

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	currency: string;
	category: string[];
	image_urls: string[];
}
