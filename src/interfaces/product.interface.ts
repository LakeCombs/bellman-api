import { Document } from "mongoose";
import { Comment_Interface } from "./comment.interface";
import { Gallery_Interface } from "./gallery.interface";

export interface Product_Interface extends Document {
	name: string;
	description: string;
	price: number;
	currency: string;
	category: string[];
	image_urls: string[];
	comments: Comment_Interface[];
	gallery: Gallery_Interface[];
}
