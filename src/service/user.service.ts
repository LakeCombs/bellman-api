import { Query_interface } from "./../interfaces/query.interface";
import { IUser, ULogin, UserData } from "./../interfaces/user.interface";
import User from "../model/user.model";
import logger from "../utils/logger";
import { generate_token } from "../middleware/JWT";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

/**
 * @openapi
 * components:
 * 	schemas:
 *		CreateUserInput:
 *			type: object
 *			required:
 *				- email
 *				- first_name
 *				- last_name
 *				- password
 *			properties:
 *				email:
 *					type: string
 *					default: lakecombs@gmail.com
 *				first_name:
 *					type:string
 *					default: lake
 *				last_name:
 *					type:string
 *					default: combs
 *				password:
 *					type:string
 *					default: mypassword1234
 * 		CreateUserResponse:
 *      	type: object
 * 			properties:
 *        		email:
 *     		    	type: string
 *        		first_name:
 *          		type: string
 *        		last_name:
 *          		type: string
 *       		 _id:
 *          		type: string
 *        		createdAt:
 *          		type: string
 *        		updatedAt:
 *          		type: string
 */

export const CREATE_USER = async (
	input: IUser
): Promise<Query_interface<IUser>> => {
	const action = "Creating a  new user";

	try {
		const new_user: IUser = await User.create(input);
		return {
			status: true,
			action: action,
			data: new_user,
			message: "New user have been created successfully ",
		};
	} catch (error) {
		logger.error(error);
		return {
			error: error,
			status: false,
			action: action,
			message: "sorry an error occoured during registration",
		};
	}
};

export const LOGIN_USER = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<any> => {
	try {
		const action = "User login";

		if (!email || !password) {
			return {
				status: false,
				action: action,
				message: "Please enter your email and password",
			};
		}

		const user = await User.findOne({ email: email })
			.populate("cart")
			.populate("purchased");

		if (!user) {
			return {
				status: false,
				action: action,
				message: "Sorry this user does not exist, signup",
			};
		}

		const confirmPassword: Boolean = await user.comparePassword(password);

		if (user && confirmPassword) {
			return {
				message: `welcome back to bellman `,
				data: { user, user_token: generate_token(user?._id) },
				status: true,
				action: action,
			};
		}
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error.message,
			status: false,
			message:
				"sorry an error occoured during login, check your email and password and try again",
		};
	}
};

export async function UPDATE_USER(
	query: FilterQuery<IUser>,
	data: UpdateQuery<IUser>,
	options: QueryOptions
): Promise<Query_interface<IUser>> {
	try {
		const action = "update user details";
		const updating = await User.findByIdAndUpdate(query, data, options)
			.populate("purchased")
			.populate("cart");

		return {
			status: true,
			message: "update applied sucessfully",
			action,
			data: { updating, user_token: generate_token(updating?._id) },
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: error,
			status: false,
			action: "User update",
			message: "sorry an error occoured while update user details",
		};
	}
}
