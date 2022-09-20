import { Query_interface } from "./../interfaces/query.interface";
import { IUser } from "./../interfaces/user.interface";
import User from "../model/user.model";
import logger from "../utils/logger";

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

// export async function
