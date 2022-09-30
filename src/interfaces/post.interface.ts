import { Document } from "mongoose";
import { Comment_Interface } from "./comment.interface";
import { User_Interface } from "./user.interface";

export interface Post_Interface extends Document {
	title: string;
	content: string;
	image_url: string;
	author: User_Interface;
	likes: User_Interface[];
	comments: Comment_Interface[];
}
