import { Gallery_Interface } from "./../interfaces/gallery.interface";
import { model, Schema } from "mongoose";

const GallerySchema: Schema = new Schema<Gallery_Interface>(
	{
		post: { type: String },
		image: [{ type: String, required: true }],
		comment: { type: String },
		product: { type: Schema.Types.ObjectId, ref: "Product" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

const Gallery = model<Gallery_Interface>("Gallery", GallerySchema);

export default Gallery;
