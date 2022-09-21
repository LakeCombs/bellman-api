import { Query_interface } from "./../interfaces/query.interface";
import { IPost } from "./../interfaces/post.interface";
import Post from "../model/post.model";
import logger from "../utils/logger";

export const CREATE_POST = async (
	input: IPost,
	authorid: string
): Promise<Query_interface<IPost>> => {
	const action = "Creating a post";
	try {
		if (!input.title || !input.content) {
			return {
				status: false,
				action: action,
				message: "Please add a post title and content before posting",
				error: "Sorry! an error while trying to create this post",
			};
		}

		const new_post: IPost = await Post.create({ input, author: authorid });
		return {
			status: true,
			action: action,
			data: new_post,
			message: "Your new post was created successfully",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching the product by category",
		};
	}
};
