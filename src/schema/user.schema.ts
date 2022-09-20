import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
	body: object({
		service: string({
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

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.password'>;
