import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger";
import dotenv from "dotenv";
import v1 from "./version/v1";
import morgan from "morgan";
import connectDB from "./utils/connectDB";
import swaggerDocs from "./utils/swagger";

dotenv.config();

connectDB();

const app: Express = express();
const PORT: number = <number>(<unknown>process.env.PORT);

app
	.use(express.json())
	.use(helmet())
	.use(cors())
	.use(morgan("tiny"))
	.use("/api", v1);

// swaggerDocs(app, PORT);

app.listen(PORT, () => {
	logger.info(`App is running at http://localhost:${PORT}`);
	swaggerDocs(app, PORT);
});
