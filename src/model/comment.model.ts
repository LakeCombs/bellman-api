import { IComment } from "./../interfaces/comment.interface";
import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema<IComment>(
	{
		post_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		comment: { type: String, required: true, minlength: 50 },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const commentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default commentModel;
