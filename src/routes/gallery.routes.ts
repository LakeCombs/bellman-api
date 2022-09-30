import { Router } from "express";
import {
	CreateGalleryPostHandler,
	DeleteGalleryPostHandler,
	GetAllGalleryForAProductHandler,
	GetAllGalleryHandler,
} from "../controllers/gallery.controller";
import { auth } from "../middleware/authentication.middleware";
import { is_admin } from "../middleware/isadminmiddleware";

const gallery_route = Router();

gallery_route.get("/", GetAllGalleryHandler);
gallery_route.get("/:id", GetAllGalleryForAProductHandler);
gallery_route.post("/:id", auth, CreateGalleryPostHandler);
gallery_route.delete("/:id", is_admin, DeleteGalleryPostHandler);

export default gallery_route;
