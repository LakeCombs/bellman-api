import {
	GET_ALL_GALLERY,
	GET_ALL_GALLERY_FOR_PRODUCT,
} from "./../service/gallery.service";
import { Response, Request } from "express";
import {
	DELETE_GALLERY_POST,
	POST_IN_Gallery,
} from "../service/gallery.service";

export async function CreateGalleryPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const productid = req.params.id;
	const userid = res.locals.user_id;

	const service = await POST_IN_Gallery({
		productid,
		userid,
		...req.body,
	});

	service.status
		? res.status(201).json(service)
		: res.status(404).json(service);
}

export async function DeleteGalleryPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await DELETE_GALLERY_POST(req.params.id);

	service?.status
		? res.status(202).json(service)
		: res.status(404).json(service);
}

export async function GetAllGalleryHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await GET_ALL_GALLERY();

	service.status
		? res.status(200).json(service)
		: res.status(400).json(service);
}

export async function GetAllGalleryForAProductHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await GET_ALL_GALLERY_FOR_PRODUCT(req.params.id);

	service.status
		? res.status(200).json(service)
		: res.status(400).json(service);
}
