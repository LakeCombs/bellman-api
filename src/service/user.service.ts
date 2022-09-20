import { string } from "zod";
import { Query_interface } from "./../interfaces/query.interface";
import { IUser, ULogin } from "./../interfaces/user.interface";
import User from "../model/user.model";
import logger from "../utils/logger";
import { generate_token } from "../middleware/JWT";

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

export const LOGIN_USER = async (input: ULogin): Promise<any> => {
	try {
		const action = "User login";

		if (!input.email || !input.password) {
			return {
				status: false,
				action: action,
				message: "Please enter your email and password",
			};
		}

		const user = await User.findOne({ email: input.email })
			.populate("cart")
			.populate("purchased");

		if (!user) {
			return {
				status: false,
				action: action,
				message: "Sorry this user does not exist, signup",
			};
		}

		const confirmPassword: Boolean = await user.comparePassword(input.password);

		if (user && confirmPassword) {
			return {
				message: "welcome back to bellman",
				data: {
					...user,
					user_token: generate_token(user._id),
				},
				status: true,
			};
		}
	} catch (error) {
		logger.error(error);
		return {
			error: error,
			status: false,
			message:
				"sorry an error occoured during login, check your email and password and try again",
		};
	}
};
