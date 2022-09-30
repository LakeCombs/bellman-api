import cloudinary from "../config/cloudinary";
import { Image_interface } from "../interfaces/image.interface";
import { Query_interface } from "../interfaces/query.interface";
import Image from "../model/image.model";
import logger from "../utils/logger";
import fs from "fs";

export const UPLOAD_IMAGE = async (
	filepath: any[]
): Promise<Query_interface<Image_interface>> => {
	const action = "upload image";
	try {
		const uploader = async (path: any) => {
			return await cloudinary.uploader.upload(path, {
				folder: "bellman",
			});
		};

		const urls = [];
		for (const file of filepath) {
			const newPath = await uploader(file.path);
			urls.push({
				image: newPath?.secure_url,
				cloudinary_id: newPath?.public_id,
			});
		}

		let new_image = await Image.create(urls);
		logger.info(`an image have been uploaded`);
		return {
			status: true,
			action: action,
			message: "You have uploaded some photo",
			data: new_image,
		};
	} catch (error: any) {
		logger.error(error);
		return {
			error: error,
			status: false,
			action: action,
			message: "Sorry! an error while uploading photo",
		};
	}
};

export const DELETE_IMAGE = async (
	id: string
): Promise<Query_interface<Image_interface>> => {
	const action = "Deleting image";

	try {
		let image: Image_interface | null = await Image.findById(id);
		await cloudinary.uploader.destroy(image?.cloudinary_id as string);
		await image?.remove();
		logger.info(`an image have been deleted`);
		return {
			status: true,
			action: action,
			message: "You have deleted this image",
			data: image,
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "Sorry! an error while deleting photo",
		};
	}
};

export const GET_ALL_IMAGE = async (): Promise<
	Query_interface<Image_interface>
> => {
	const action = "Getting all the images";
	try {
		const images: Image_interface[] = await Image.find();

		logger.info("You have fetch all the images");
		return {
			status: true,
			action: action,
			message: "You have fetch an image",
			data: images,
		};
	} catch (error: any) {
		logger.error(error?.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "Sorry! an error while getting all photo",
		};
	}
};
export const GET_IMAGE = async (
	id: string
): Promise<Query_interface<Image_interface>> => {
	const action = "Get the image";
	try {
		if (!id || id === "") {
			return {
				status: true,
				action: action,
				message:
					"no image id provided, please provide an image id and try again ",
			};
		}
		const image = await Image.findById({ _id: id });
		logger.info("You have fetch an image");
		return {
			status: true,
			action: action,
			message: "You have fetch an image",
			data: image,
		};
	} catch (error: any) {
		logger.error(error?.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "Sorry! an error while getting this photo",
		};
	}
};

export const EDIT_IMAGE = async (
	id: string,
	file: string
): Promise<Query_interface<Image_interface>> => {
	const action = "Editing an image";
	try {
		let get_image = await Image.findById({ _id: id });
		await cloudinary.uploader.destroy(get_image?.cloudinary_id as string);
		let result;
		if (file) {
			result = await cloudinary.uploader.upload(file, {
				folder: "bellman",
			});
		}

		const data = {
			image: result?.secure_url || result?.url,
			cloudinary_id: result?.public_id || get_image?.cloudinary_id,
		};
		get_image = await Image.findByIdAndUpdate(id, data, { new: true });

		logger.info("You have fetch an image");
		return {
			status: true,
			action: action,
			message: "You have fetch an image",
			data: get_image,
		};
	} catch (error: any) {
		logger.error(error?.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "Sorry! an error while editing this photo",
		};
	}
};
