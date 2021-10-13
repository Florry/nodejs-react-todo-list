import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { Server } from "http";
import { connect, Db } from "mongodb";
import { MONGO_DB_URL, PORT } from "./config";
import { COLLECTION } from "./repos/TodoRepo";
import routes from "./routes";

let app: Express;
let server: Server;
let db: Db;

export async function start(mongoDbUrl: string = MONGO_DB_URL) {
	app = express();
	app.use(express.json());

	app.use(
		cors({
			origin: ["http://localhost:3000", "localhost:3000", "http://localhost:8080", "localhost:8080"],
			credentials: true,
			allowedHeaders: ["Authentication", "accesstoken", "X-Requested-With", "X-HTTP-Method-Override", "Content-Type", "Accept"],
			exposedHeaders: "accesstoken"
		})
	);

	db = await connect(mongoDbUrl);
	console.log(`Connected to ${MONGO_DB_URL}`);

	await setupIndexes();

	routes(app, db);

	app.use(function (err: Error, _req: Request, res: Response, next: NextFunction) {
		console.error(err);

		if (err) {
			res.status(500).json(err);

			/** If running tests, the server can over take the tests and just keep running if an error occurs */
			if (process.env.CI === "1")
				close();
		} else
			next();
	});

	server = app.listen(PORT, () => { console.log(`Server running on ${PORT}.`); });

	return server;
}

export function close() {
	server.close();
	db.close();
}

async function setupIndexes() {
	await db.collection(COLLECTION).createIndex({ referenceId: 1 });
	await db.collection(COLLECTION).createIndex({ id: 1 });
}