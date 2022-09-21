import { Request, Response } from "express";
import {
	COMMENT_ON_A_POST,
	CREATE_POST,
	DELETE_POST,
	EDIT_POST,
	GET_ALL_POST,
	GET_POST_BY_ID,
	GET_POST_BY_KEYWORD,
	LIKE_A_POST,
} from "../service/post.service";

export async function createPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const authorid = res.locals.user._id;
	const service = await CREATE_POST(authorid, req.body);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function editPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const postid = req.params.id;

	const service = await EDIT_POST(postid, req.body);
	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function getAllPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const service = await GET_ALL_POST();

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function getPostByIdHandler(
	req: Request,
	res: Response
): Promise<void> {
	const productid = req.params.id;
	const service = await GET_POST_BY_ID(productid);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function getPostAKeywordHandler(
	req: Request,
	res: Response
): Promise<void> {
	const keyword = req.query.query;
	const service = await GET_POST_BY_KEYWORD(`${keyword}`);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function deletePostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const postid = req.params.id;
	const service = await DELETE_POST(postid);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function likeAPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const postid = req.params.id;
	const userid = res.locals.user._id;
	const service = await LIKE_A_POST(postid, userid);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}

export async function commentAPostHandler(
	req: Request,
	res: Response
): Promise<void> {
	const postid = req.params.id;
	const userid = res.locals.user._id;
	const service = await COMMENT_ON_A_POST(postid, userid, req.body);

	service.status
		? res.status(201).json(service)
		: res.status(400).json(service);
}
