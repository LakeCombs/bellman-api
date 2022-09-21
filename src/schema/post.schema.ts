import { object, string, TypeOf } from "zod";

export const createPostSchema = object({
	body: object({
		title: string({
			required_error: "A post title is required",
		}),
		content: string({
			required_error: "A post content is required",
		}),
	}),
});
