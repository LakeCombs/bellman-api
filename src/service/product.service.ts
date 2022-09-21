import { FilterQuery, Query, QueryOptions, UpdateQuery } from "mongoose";
import { Query_interface } from "./../interfaces/query.interface";
import { IProduct } from "./../interfaces/product.interface";
import logger from "../utils/logger";
import Product from "../model/product.model";
import { IpOptions } from "@hapi/joi";
import { IUser } from "../interfaces/user.interface";
import User from "../model/user.model";

export const CREATE_PRODUCT = async (
	input: IProduct
): Promise<Query_interface<IProduct>> => {
	const action = "Creating a product";

	try {
		// const validatedinput = ProductSchema.validate(input);
		const new_product: IProduct = await Product.create(input);
		return {
			status: true,
			action: action,
			data: new_product,
			message: "New user have been created successfully ",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while creating a new product",
		};
	}
};

export const GET_ALL_PRODUCT = async (): Promise<
	Query_interface<[IProduct]>
> => {
	const action = "getting all the product";

	try {
		const all_product: IProduct[] = await Product.find();
		return {
			status: true,
			action: action,
			data: all_product,
			message: "Here are all the product available currently successfully ",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching all the product",
		};
	}
};

export const EDIT_PRODUCT = async (
	query: string,
	data: UpdateQuery<IProduct>
): Promise<Query_interface<IProduct>> => {
	const action = "editing a product";
	try {
		const edit_product = await Product.findByIdAndUpdate(query, data, {
			new: true,
		});
		return {
			status: true,
			message: "this product have been updated applied sucessfully",
			action,
			data: edit_product,
		};
	} catch (error) {
		logger.error(error);
		return {
			error: error,
			status: false,
			action: action,
			message: "sorry an error occoured while editing the product",
		};
	}
};

export const GET_A_PRODUCT = async (
	query: QueryOptions
): Promise<Query_interface<IProduct>> => {
	const action = "Get a product by id";
	try {
		const singleproduct = await Product.findById(query);
		return {
			status: true,
			message: "product fetch by id sucessfully",
			action,
			data: singleproduct,
		};
	} catch (error) {
		logger.error(error);
		return {
			error: error,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching the product by id",
		};
	}
};

export const GET_PRODUCT_BY_NAME = async (
	query: string
): Promise<Query_interface<IProduct>> => {
	const action = "get product by name ";

	try {
		console.log("hey the query is ", query);

		const product_by_name: IProduct[] = await Product.find({
			$or: [
				{
					name: { $regex: query, $options: "i" },
				},
				{ description: { $regex: query, $options: "i" } },
			],
		}).sort({ updated: -1 });
		return {
			status: true,
			action: action,
			data: product_by_name,
			message: "Here are all the product with the name",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while fetching the product by name",
		};
	}
};

export const GET_PRODUCT_BY_CATEGORY = async (
	query: string
): Promise<Query_interface<IProduct>> => {
	const action = "Get product by category";
	try {
		const getting_by_category = await Product.find({
			category: {
				$in: [query],
			},
		});
		return {
			status: true,
			action: action,
			data: getting_by_category,
			message: "Here are all the product in this category",
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

export const ADD_PRODUCT_TO_CART = async (
	productid: string,
	userid: string,
	options: QueryOptions
): Promise<Query_interface<IpOptions>> => {
	const action = "Adding product to cart";

	try {
		// const  userid = res.local.user_id
		const adding_to_cart = await User.findByIdAndUpdate(
			{ _id: userid },
			{
				$push: {
					cart: productid,
				},
			},
			options
		)
			.populate("purchased")
			.populate("cart");

		return {
			status: true,
			action: action,
			data: adding_to_cart,
			message: "Here are all the product in this category",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while adding this product to cart",
		};
	}
};

export const REMOVE_PRODUCT_FROM_CART = async (
	productid: string,
	userid: string
): Promise<Query_interface<IUser>> => {
	const action = "Removing product from cart";

	try {
		const removing_from_cart = await User.findByIdAndUpdate(
			{ _id: userid },
			{
				$push: {
					cart: productid,
				},
			},
			{ new: true }
		);

		return {
			status: true,
			action: action,
			data: removing_from_cart,
			message: "Here are all the product in this category",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while removing this product to cart",
		};
	}
};

export const ADD_PRODUCT_TO_PURCHASED = async (
	productid: string,
	userid: string
): Promise<Query_interface<IUser>> => {
	const action = "purchasing an product";
	try {
		const purchasing_product = await User.findByIdAndUpdate(
			{ _id: userid },
			{
				$push: {
					purchased: productid,
				},
			},
			{ new: true }
		)
			.populate("cart")
			.populate("purchased");

		return {
			status: true,
			action: action,
			data: purchasing_product,
			message: "You just purchased this product",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while purchasing this product",
		};
	}
};

export const DELETE_PRODUCT = async (
	id: string
): Promise<Query_interface<IProduct>> => {
	const action = "Deleting this product";

	try {
		const deleting_product = await Product.findByIdAndDelete(id);
		return {
			status: true,
			action: action,
			data: deleting_product,
			message: "You have deleted  this product",
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			action: action,
			message: "sorry an error occoured while deleting this product",
		};
	}
};
