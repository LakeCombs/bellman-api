import { Comment_Interface } from "./../interfaces/comment.interface";
import mongoose, { Schema } from "mongoose";

const CommentSchema: Schema = new mongoose.Schema<Comment_Interface>(
	{
		post_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		comment: { type: String, required: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const commentModel = mongoose.model<Comment_Interface>(
	"Comment",
	CommentSchema
);

export default commentModel;
