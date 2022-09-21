import { Document } from "mongoose";
import { IComment } from "./comment.interface";
import { IUser } from "./user.interface";

export interface IPost extends Document {
	title: string;
	content: string;
	image_url: string;
	author: IUser;
	likes: IUser[];
	comments: IComment[];
}
