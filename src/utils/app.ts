import morgan from "morgan";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import v1 from "../version/v1";
import bodyParser from "body-parser";
import {
	error_handler,
	not_found,
} from "../middleware/error_handling.middleware";

function createServer() {
	const app = express();

	app
		.use(express.json())
		.use(helmet())
		.use(bodyParser.urlencoded({ extended: false }))
		.use(bodyParser.json())
		.use(cors())
		.use(morgan("tiny"))
		.use("/api", v1)
		.use(not_found)
		.use(error_handler);

	return app;
}

export default createServer;
