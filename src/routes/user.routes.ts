import {
	createUserLoginSchmea,
	createUserSchema,
	updateUserSchema,
} from "./../schema/user.schema";
import { Router } from "express";
import validate from "../utils/validateResources";
import {
	createLoginHandler,
	createUpdateUserHandler,
	createUserHandler,
} from "../controllers/user.controller";

const userRoute = Router();

/**
 * @openapi
 * '/api/v1'
 *	get:
 *		tags:
 *		- Healthcheck
 *		description: Responds if the app is up and running
 *		responses:
 *			200:
 *				desctription: Welcome to bellman's api 1.0.0
 *
 */
userRoute.get("/", (req, res) => {
	return res.status(200).send("Welcome to bellman's api 1.0.0");
});

userRoute.post("/signup", validate(createUserSchema), createUserHandler);
userRoute.post("/login", validate(createUserLoginSchmea), createLoginHandler);
userRoute.put("/:id", validate(updateUserSchema), createUpdateUserHandler);

export default userRoute;
