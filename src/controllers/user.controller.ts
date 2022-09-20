import { Request, Response } from "express";
import { CreateUserInput, UpdateUserInput } from "../schema/user.schema";
import { CREATE_USER, LOGIN_USER, UPDATE_USER } from "../service/user.service";

export async function createUserHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await CREATE_USER(req.body);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function createLoginHandler(
	req: Request<{}, {}, CreateUserInput["body"]>,
	res: Response
): Promise<void> {
	const service = await LOGIN_USER(req.body);

	service.status
		? res.status(200).json(service)
		: res.status(400).json(service);
}

export async function createUpdateUserHandler(
	req: Request<UpdateUserInput["params"]>,
	res: Response
): Promise<void> {
	const userid = req.params.id;
	const service = await UPDATE_USER({ _id: userid }, req.body, {
		new: true,
	});
	service.status
		? res.status(201).json(service)
		: res.status(404).json(service);
}
