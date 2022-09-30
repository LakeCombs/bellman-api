import { Image_interface } from "./../interfaces/image.interface";
import { model, Schema } from "mongoose";

const image_schema = new Schema<Image_interface>(
	{
		image: {
			type: String,
		},
		cloudinary_id: {
			type: String,
		},
	},
	{ timestamps: true }
);

const imageModel = model<Image_interface>("Image", image_schema);

export default imageModel;
