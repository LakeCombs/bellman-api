import { User_Interface } from "./user.interface";
import { Product_Interface } from "./product.interface";
import { Document } from "mongoose";
import { Comment_Interface } from "./comment.interface";

export interface Gallery_Interface extends Document {
	post: string;
	image: string[];
	comment: Comment_Interface[];
	product: Product_Interface;
	user: User_Interface;
}
