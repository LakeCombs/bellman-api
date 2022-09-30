import morgan from "morgan";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import v1 from "../version/v1";

function createServer() {
	const app = express();

	app
		.use(express.json())
		.use(helmet())
		.use(cors())
		.use(morgan("tiny"))
		.use("/api", v1);

	return app;
}

export default createServer;
