import { object } from "zod";
import { TypeOf } from "zod";
import Joi from "@hapi/joi";
import { IProduct } from "../interfaces/product.interface";
import { params } from "./user.schema";

export const ProductSchema = Joi.object<IProduct>({
	name: Joi.string().required(),
	description: Joi.string().required(),
	price: Joi.number(),
	currency: Joi.string(),
	image_urls: Joi.array(),
	category: Joi.array(),
});

export const productqueryParamSchma = object({
	...params,
});

export type GetProductByName = TypeOf<typeof productqueryParamSchma>;
