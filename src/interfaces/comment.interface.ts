import { User_Interface } from "./user.interface";
import { Post_Interface } from "./post.interface";
import { Document } from "mongoose";

export interface Comment_Interface extends Document {
	post_id: Post_Interface;
	comment: string;
	user_id: User_Interface;
}
