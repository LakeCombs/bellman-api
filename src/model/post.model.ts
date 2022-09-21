import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/post.interface";

const PostSchema: Schema = new mongoose.Schema<IPost>(
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

const postModel = mongoose.model<IPost>("Post", PostSchema);

export default postModel;
