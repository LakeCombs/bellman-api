import { Gallery_Interface } from "./../interfaces/gallery.interface";
import { Query_interface } from "../interfaces/query.interface";
import Gallery from "../model/gallery.model";
import Product from "../model/product.model";
import User from "../model/user.model";
import { Comment_Interface } from "../interfaces/comment.interface";
import Comment from "../model/comment.model";
import logger from "../utils/logger";

export const GET_ALL_GALLERY = async (): Promise<
	Query_interface<Gallery_Interface>
> => {
	const action = "Getting all gallery";
	try {
		const gallery: Gallery_Interface[] = await Gallery.find();
		logger.info("you fetched all the product in the gallery");
		return {
			status: true,
			action: action,
			data: gallery,
			message: "Here  are all the product in the gallery",
		};
	} catch (error: any) {
		logger.error(error?.message || error);
		return {
			status: false,
			action: action,
			error: error,
			message: "Sorry an error occoured while post photo to Gallery",
		};
	}
};

export const GET_ALL_GALLERY_FOR_PRODUCT = async (
	id: string
): Promise<Query_interface<Gallery_Interface>> => {
	const action = `Get all the gallery for product with id ${id}`;
	try {
		const gallery: Gallery_Interface[] = await Gallery.find({
			product: id,
		});

		console.log("the gallery is ", id);
		logger.info("you have fetched all the gallery for this product");
		return {
			status: true,
			action,
			data: gallery,
			message: "Here are all the gallery for this product ",
		};
	} catch (error: any) {
		logger.error(error?.message || error);
		return {
			status: false,
			action,
			error: error,
			message:
				"Sorry an error occoured while fetching all the gallery for this product",
		};
	}
};

export const POST_IN_Gallery = async (
	input: any
): Promise<Query_interface<Gallery_Interface>> => {
	const action = "Posting in Gallery";

	try {
		const create_gallery_post = await Gallery.create(input);
		await User.findByIdAndUpdate(
			{ _id: input.userid },
			{
				$push: {
					my_gallery: create_gallery_post._id,
				},
			},
			{ new: true }
		);
		await Product.findByIdAndUpdate(
			{ _id: input.productid },
			{ gallery: create_gallery_post._id },
			{ new: true }
		);

		return {
			status: true,
			action,
			data: create_gallery_post,
			message: "You have added a post to this product gallery",
		};
	} catch (error: any) {
		return {
			status: false,
			action: action,
			error: error,
			message: "Sorry an error occoured while post photo to Gallery",
		};
	}
};

export const COMMENT_ON_GALLARY_POST = async (
	id: string,
	comment: Comment_Interface
): Promise<Query_interface<Gallery_Interface>> => {
	const action = "Comment of a gallary post";

	try {
		const create_comment: Comment_Interface = await Comment.create(comment);
		await Gallery.findByIdAndUpdate(
			{ _id: id },
			{ comment: create_comment._id },
			{
				new: true,
			}
		);

		return {
			action,
			status: true,
			data: create_comment,
			message: "You have commented on this gallery product",
		};
	} catch (error: any) {
		return {
			status: false,
			action: action,
			error: error,
			message: "Sorry an error occoured while commenting on a Gallery post",
		};
	}
};

export const DELETE_GALLERY_POST = async (
	id: string
): Promise<Query_interface<Gallery_Interface>> => {
	const action = "Delete gallary post";
	try {
		await User.updateMany({
			$pull: {
				my_gallery: {
					$in: [id],
				},
			},
		});

		const delete_galley = await Gallery.findByIdAndDelete(id);
		return {
			status: true,
			action,
			data: delete_galley,
			message: "You have remove this gallery post from this product",
		};
	} catch (error: any) {
		return {
			status: false,
			action: action,
			error: error,
			message: "Sorry an error occoured while deleteing this Gallery post",
		};
	}
};
