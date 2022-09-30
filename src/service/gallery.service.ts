import { model } from 'mongoose';
import { Gallery_Interface } from "./../interfaces/gallery.interface";
import { Query_interface } from "../interfaces/query.interface";
import Gallery from "../model/gallery.model";
import User fro '../model/user.model'

export const POST_IN_Gallery = async (
	input: any
): Promise<Query_interface<Gallery_Interface>> => {
	const action = "Posting in Gallery";

	try {
		const create_product_post = await Gallery.create(input);
		await User.findByIdAndUpdate(
			{_id : input.id}, {}, [new: true]
		)
	} catch (error: any) {
		return {
			status: true,
			action: action,
			error: error,
			message: "Sorry an error occoured while post photo to Gallery",
		};
	}
};
