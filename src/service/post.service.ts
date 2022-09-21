import { UpdateQuery } from "mongoose";
import { Query_interface } from "./../interfaces/query.interface";
import { IPost } from "./../interfaces/post.interface";
import Post from "../model/post.model";
import logger from "../utils/logger";
import Comment from "../model/comment.model";

export const CREATE_POST = async (
	authorid: string,
	input: IPost
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

export const EDIT_POST = async (
	postid: string,
	input: UpdateQuery<IPost>
): Promise<Query_interface<IPost>> => {
	const action = "Editing a post";

	try {
		const editpost = Post.findByIdAndUpdate(postid, input, {
			new: true,
		});
		return {
			status: true,
			action: action,
			data: editpost,
			message: "Your new post was edited successfully",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while editing this post",
		};
	}
};

export const GET_ALL_POST = async (): Promise<Query_interface<IPost>> => {
	const action = "Getting all post";

	try {
		const allpost: IPost[] = await Post.find()
			.sort({ createdAt: -1 })
			.populate("author");
		return {
			status: true,
			action: action,
			data: allpost,
			message: "Here are all the post currently available",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching all the post",
		};
	}
};

export const GET_POST_BY_ID = async (
	postid: string
): Promise<Query_interface<IPost>> => {
	const action = "Get a post by id";
	try {
		const postById: IPost | null = await Post.findById(postid).populate(
			"author"
		);
		return {
			status: true,
			action: action,
			data: postById,
			message: "Here is the post with the id",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching a post by id",
		};
	}
};

export const GET_POST_BY_KEYWORD = async (
	query: string
): Promise<Query_interface<IPost>> => {
	const action = "get post by keyword";
	try {
		const postByKeyWord: IPost[] = await Post.find({
			$or: [
				{
					title: { $regex: query, $options: "i" },
				},
				{ content: { $regex: query, $options: "i" } },
			],
		}).sort({ updated: -1 });

		return {
			status: true,
			action: action,
			data: postByKeyWord,
			message: "These are all the post containing the keyword",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching a post by keyword",
		};
	}
};

export const DELETE_POST = async (
	postid: string
): Promise<Query_interface<IPost>> => {
	const action = "Delete a post";

	try {
		const deleteAPost: IPost | null = await Post.findByIdAndDelete(postid);

		return {
			status: true,
			action: action,
			data: deleteAPost,
			message: "You have deleted this post",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while deleting this post",
		};
	}
};

export const LIKE_A_POST = async (
	postid: string,
	userid: string
): Promise<Query_interface<IPost>> => {
	const action = "Like a post";

	try {
		const likeThePost = await Post.updateOne({ _id: postid }, [
			{
				$set: {
					likes: {
						$cond: {
							if: {
								$in: [userid, "$likes"],
							},
							then: "$likes",
							else: {
								$concatArrays: ["$likes", [userid]],
							},
						},
					},
				},
			},
		]);

		return {
			status: true,
			action: action,
			data: likeThePost,
			message: "You have like this post",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while deleting this post",
		};
	}
};

export const COMMENT_ON_A_POST = async (
	postid: string,
	userid: string,
	input: any
): Promise<Query_interface<IPost>> => {
	const action = "Liking a post";
	try {
		const create_comment = await Comment.create({
			comment: input.comment,
			post_id: postid,
			user_id: userid,
		});

		const add_comment = await Post.findByIdAndUpdate(
			postid,
			{
				$push: {
					comments: create_comment._id,
				},
			},
			{ new: true }
		);

		return {
			status: true,
			action: action,
			data: add_comment,
			message: "You have commented on this post",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while commenting on this post",
		};
	}
};
