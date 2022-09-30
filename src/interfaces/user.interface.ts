import { Product_Interface } from "./product.interface";
import { Document } from "mongoose";
import { Gallery_Interface } from "./gallery.interface";

export interface User_Interface extends Document {
	create: any;
	first_name: string;
	last_name: string;
	email: string;
	contact_address: string;
	is_admin: boolean;
	cart: Product_Interface[];
	purchased: Product_Interface[];
	phone: string;
	password: string;
	my_gallery: Gallery_Interface[];

	comparePassword(password: string): Promise<Boolean>;
}

export interface UserData extends User_Interface {
	user_token?: string;
}
export interface ULogin {
	email: string;
	password: string;
}
