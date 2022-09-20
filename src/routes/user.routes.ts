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

userRoute.get("/", (req, res) => {
	return res.status(200).send("hello lakes");
});
userRoute.post("/signup", validate(createUserSchema), createUserHandler);
userRoute.post("/login", validate(createUserLoginSchmea), createLoginHandler);
userRoute.put("/:id", validate(updateUserSchema), createUpdateUserHandler);

export default userRoute;
