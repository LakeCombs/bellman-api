import { Document } from "mongoose";

export interface Image_interface extends Document {
	image: string;
	cloudinary_id: string;
}
