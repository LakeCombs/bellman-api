import mongoose from "mongoose";
import logger from "./logger";

async function connectDB(): Promise<void> {
	const dbURI = process.env.MONGO_URI;
	try {
		await mongoose.connect(dbURI as string);
		logger.info("connected to mongo database");
	} catch (error) {
		logger.error(`an error occoured while connecting to db`, error);
		process.exit(1);
	}
}

export default connectDB;
