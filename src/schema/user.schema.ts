import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
	body: object({
		first_name: string({
			required_error: "First name is required",
		}),
		last_name: string({
			required_error: "Last name is required",
		}),

		password: string({
			required_error: "password is required",
		}).min(6, "The password should be at least 6 characters long"),

		email: string({
			required_error: "Email is required",
		}).email("Not a valid email"),
	}),
});

export const createUserLoginSchmea = object({
	body: object({
		email: string({
			required_error: "Email is required",
		}),

		password: string({
			required_error: "Password is required",
		}).min(6, "The password should be at least 6 characters long"),
	}),
});

export const params = {
	params: object({
		id: string({
			required_error: "user id requried",
		}),
	}),
};


export const updateUserSchema = object({
	...params,
});

export type CreateUserInput = Omit<
	TypeOf<typeof createUserSchema>,
	"body.password"
>;

export type CreateLoginInput = Omit<
	TypeOf<typeof createUserLoginSchmea>,
	"body.password"
>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
