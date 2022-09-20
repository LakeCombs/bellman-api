import { string } from "zod";
import { IUser } from "./../interfaces/user.interface";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "./JWT";
import User from "../model/user.model";
import { Query_interface } from "../interfaces/query.interface";
import logger from "../utils/logger";

export async function auth(req: Request, res: Response, next: NextFunction) {
	let user_token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			user_token = req.headers.authorization.split(" ")[1];
			let userid = verifyJWT(user_token);
			console.log("the user id ", userid);
			const user = await User.findById(userid).select("-password");
			res.locals.user = user;
			res.locals.user_id = userid;
			return next();
		} catch (error) {
			logger.error(error);
			return res
				.status(401)
				.json({ message: "Not authorized, user_token failed" });
		}
	}

	if (!user_token) {
		return res.status(400).json({ message: "Not authorized, no user_token" });
	}
}
