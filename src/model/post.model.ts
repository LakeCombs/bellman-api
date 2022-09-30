import mongoose, { Schema } from "mongoose";
import { Post_Interface } from "../interfaces/post.interface";

const PostSchema: Schema = new mongoose.Schema<Post_Interface>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true, minLength: 50 },
		image_url: { type: String },
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

const postModel = mongoose.model<Post_Interface>("Post", PostSchema);

export default postModel;
