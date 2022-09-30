import { Gallery_Interface } from "./Gallery.interface";
import { Document } from "mongoose";
import { Comment_Interface } from "./comment.interface";

export interface Product_Interface extends Document {
	name: string;
	description: string;
	price: number;
	currency: string;
	category: string[];
	image_urls: string[];
	comments: Comment_Interface[];
	Gallery: Gallery_Interface[];
}
