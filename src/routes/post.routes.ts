import { Router } from "express";
import {
	commentAPostHandler,
	createPostHandler,
	deletePostHandler,
	editPostHandler,
	getAllPostHandler,
	getPostByIdHandler,
	likeAPostHandler,
} from "../controllers/post.controller";
import { auth } from "../middleware/authentication.middleware";
import { is_admin } from "../middleware/isadminmiddleware";

const postRoute = Router();

postRoute.get("/", getAllPostHandler);
postRoute.get("/:id", getPostByIdHandler);
postRoute.post("/", is_admin, createPostHandler);
postRoute.post("/like/:id", auth, likeAPostHandler);
postRoute.post("/comment/:id", auth, commentAPostHandler);
postRoute.put("/:id", is_admin, editPostHandler);
postRoute.delete("/:id", is_admin, deletePostHandler);

export default postRoute;
