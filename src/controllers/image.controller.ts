import { Request, Response } from "express";
import {
	DELETE_IMAGE,
	EDIT_IMAGE,
	GET_ALL_IMAGE,
	GET_IMAGE,
	UPLOAD_IMAGE,
} from "../service/image.service";

export async function uploadImageHandler(
	req: Request,
	res: Response
): Promise<void> {
	const filepath = req.file?.path;
	const service = await UPLOAD_IMAGE(filepath);
	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function deleteImageHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await DELETE_IMAGE(req.params.id);
	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function getAllImageHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await GET_ALL_IMAGE();
	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function getImageHandler(
	req: Request,
	res: Response
): Promise<void> {
	const imageid = req.params.id;
	const service = await GET_IMAGE(imageid);
	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}

export async function editImageHandler(
	req: Request,
	res: Response
): Promise<void> {
	const imageid = req.params.id;
	const file = req.file?.path;

	const service = await EDIT_IMAGE(imageid, file as string);

	service.status
		? res.status(200).json(service)
		: res.status(404).json(service);
}
