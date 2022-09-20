import { createUserSchema } from "./../schema/user.schema";
import { Router } from "express";
import validate from "../utils/validateResources";
import { createUserHandler } from "../controllers/user.controller";

const userRoute = Router();

userRoute.get("/", (req, res) => {
	return res.status(200).send("hello lakes");
});
userRoute.post("/signup", validate(createUserSchema), createUserHandler);

export default userRoute;
