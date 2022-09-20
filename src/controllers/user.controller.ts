import { Request, Response } from "express";
import { CREATE_USER } from "../service/user.service";

export async function createUserHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await CREATE_USER(req.body);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}
