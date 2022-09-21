import { Request, Response } from "express";
import {
	ADD_PRODUCT_TO_CART,
	CREATE_PRODUCT,
	GET_ALL_PRODUCT,
	GET_PRODUCT_BY_CATEGORY,
	GET_PRODUCT_BY_NAME,
	REMOVE_PRODUCT_FROM_CART,
} from "../service/product.service";

export async function createProductHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await CREATE_PRODUCT(req.body);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function getAllProduct(
	req: Request,
	res: Response
): Promise<void> {
	const service = await GET_ALL_PRODUCT();

	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function getProductByName(
	req: Request,
	res: Response
): Promise<void> {
	const name = req.query.name;
	const service = await GET_PRODUCT_BY_NAME(`${name}`);

	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function getProductBycategory(
	req: Request,
	res: Response
): Promise<void> {
	const search = req.query.category;

	const service = await GET_PRODUCT_BY_CATEGORY(`${search}`);
	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function addProductToCartHandler(
	req: Request,
	res: Response
): Promise<void> {
	const productid = req.params.id;
	const userid = res.locals.user._id;

	console.log("the use id is ", userid);

	const service = await ADD_PRODUCT_TO_CART(`${productid}`, userid, {
		new: true,
	});
	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function removeProductFromCartHandler(
	req: Request,
	res: Response
): Promise<void> {
	const productid = req.params.id;
	const userid = res.locals.user._id;

	console.log("the use id is ", userid);

	const service = await REMOVE_PRODUCT_FROM_CART(`${productid}`, userid);

	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}
