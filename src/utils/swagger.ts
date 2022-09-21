import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import logger from "./logger";

const option: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Bellman api docs",
			version,
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: "http",
					schema: `bearer`,
					bearerFormat: "JWT",
				},
			},
		},

		security: [
			{
				bearerAuth: [],
			},
		],
	},

	apis: ["./src/routes.ts", "./src/service/*.ts"],
};

const swaggerSpec = swaggerJSDoc(option);

function swaggerDocs(app: Express, port: number) {
	//swagger page
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	//docs in json format
	app.get("docs.json", (req: Request, res: Response) => {
		res.setHeader("Content-type", "application/json");
		res.send(swaggerSpec);
	});

	logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
