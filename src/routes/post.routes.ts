import { Router } from "express";
import { createPostHandler } from "../controllers/post.controller";
import { is_admin } from "../middleware/isadminmiddleware";

const postRoute = Router();

postRoute.post("/", is_admin, createPostHandler);

export default postRoute;
