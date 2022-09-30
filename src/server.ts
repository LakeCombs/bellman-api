import logger from "./utils/logger";
import dotenv from "dotenv";

import connectDB from "./utils/connectDB";
import createServer from "./utils/app";
import swaggerDocs from "./utils/swagger";

dotenv.config();

connectDB();

const app = createServer();

const PORT: number = <number>(<unknown>process.env.PORT);

// swaggerDocs(app, PORT);

app.listen(PORT, () => {
	logger.info(`App is running at http://localhost:${PORT}`);
	swaggerDocs(app, PORT);
});
