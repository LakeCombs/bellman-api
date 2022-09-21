import { IUser } from "./../interfaces/user.interface";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema: Schema = new mongoose.Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		first_name: { type: String },
		last_name: { type: String },
		password: { type: String },
		phone: { type: String },
		is_admin: { type: Boolean, default: false },
		cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		purchased: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	let user = this as IUser;
	if (!user.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;
});

userSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	const user = this as IUser;
	return bcrypt.compare(password, user.password).catch((error) => false);
};

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
