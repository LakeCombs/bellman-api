import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "./JWT";
import User from "../model/user.model";
import logger from "../utils/logger";

export async function is_admin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let user_token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			user_token = req.headers.authorization.split(" ")[1];
			let userid = verifyJWT(user_token);

			if (userid.expired) {
				return res.status(404).json({
					status: false,
					message: "Your session has expired please login and try again ",
				});
			}

			const user = await User.findById(userid.decoded.payload).select(
				"-password"
			);

			if (user?.is_admin) {
				res.locals.user = user;
				res.locals.user_id = userid;
				return next();
			}
		} catch (error: any) {
			logger.error(error.message);
			return res.status(401).json({
				status: false,
				message:
					"Sorry only admin are allowed to perform this operation, please contact our customer service for any assistance ",
			});
		}
	}

	if (!user_token) {
		return res.status(400).json({
			status: false,
			message:
				"Sorry only admin are allowed to perform this operation, kindly login and visit our store",
		});
	}
}
