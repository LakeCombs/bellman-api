import { Document, ObjectId, Types } from "mongoose";

export interface IUser extends Document {
	create: any;
	first_name: string;
	last_name: string;
	email: string;
	contact_address: string;
	is_admin: boolean;
	cart: string[];
	purchased: string[];
	// purchased: Types.Array<ObjectId>;/
	phone: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(password: string): Promise<Boolean>;
}

export interface UserData extends IUser {
	user_token?: string;
}
export interface ULogin {
	email: string;
	password: string;
}
