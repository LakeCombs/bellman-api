import { Request, Response } from "express";
import {
	CREATE_PRODUCT,
	GET_ALL_PRODUCT,
	GET_PRODUCT_BY_NAME,
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
	const search = req.query.name;
	const service = await GET_PRODUCT_BY_NAME({ search });

	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}
