import { Document } from "mongoose";

export interface IComment extends Document {
	post_id: string;
	comment: string;
	user_id: string;
}
