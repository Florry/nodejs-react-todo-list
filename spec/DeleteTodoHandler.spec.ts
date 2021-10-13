import { Db } from "mongodb";
import { DELETE_TODO } from "../src/constants/paths";
import { COLLECTION } from "../src/repos/TodoRepo";
import { close, start } from "../src/server";
import { debug, silly } from "../src/utils/log-utils";
import { MONGO_SPEC_URL } from "./support/spec-constants";
import { clearDatabases, deleteRequest, getMongodb } from "./support/spec-utils";
import { todoFixtures } from "./support/todo-fixtures";

describe("DeleteTodoHandler", () => {

	let db: Db;

	beforeAll(async () => db = await getMongodb());

	beforeEach(async () => await start(MONGO_SPEC_URL));

	afterEach(async () => {
		await close();
		await clearDatabases();
	});

	it("should be possible to delete todos", async () => {
		await db.collection(COLLECTION).insertMany(todoFixtures());

		const todoIdToDelete = todoFixtures()[0].id;

		/** Sanity check */
		const dbContentsBeforeDeletion = await db.collection(COLLECTION).findOne({ id: todoIdToDelete });

		debug("Database content before deletion:", dbContentsBeforeDeletion);

		expect(dbContentsBeforeDeletion).toBeDefined();

		const { statusCode, body: { error, response } } = await deleteRequest(DELETE_TODO.replace(":id", todoIdToDelete));

		silly("response from api", { error, response });

		expect(statusCode).withContext("should send 200 status code").toBe(200);
		expect(error).withContext("should not send any error").toBeNull();
		expect(response).withContext("should not send any response").toBeNull();

		const dbContents = await db.collection(COLLECTION).findOne({ id: todoIdToDelete });

		debug("Database content after deletion:", dbContents);

		expect(dbContents).withContext("should have deleted todo item").toBeNull();
	});

	it("should not crash if todo doesn't exist", async () => {
		const todoIdToDelete = todoFixtures()[0].id;

		/** Sanity check */
		const dbContentsBeforeDeletion = await db.collection(COLLECTION).findOne({ id: todoIdToDelete });

		debug("Database content before deletion (should be null):", dbContentsBeforeDeletion);

		expect(dbContentsBeforeDeletion).toBeNull();

		const { statusCode, body: { error, response } } = await deleteRequest(DELETE_TODO.replace(":id", todoIdToDelete));

		silly("response from api", { error, response });

		expect(statusCode).withContext("should send 200 status code").toBe(200);
		expect(error).withContext("should not send any error").toBeNull();
		expect(response).withContext("should not send any response").toBeNull();

		const dbContents = await db.collection(COLLECTION).findOne({ id: todoIdToDelete });

		debug("Database content after deletion:", dbContents);

		expect(dbContents).toBeNull();
	});

});

export { };