import { Db } from "mongodb";
import { TodoModel } from "../src/models/TodoModel";
import { GET_TODOS } from "../src/constants/paths";
import { COLLECTION } from "../src/repos/TodoRepo";
import { close, start } from "../src/server";
import { MONGO_SPEC_URL } from "./support/spec-constants";
import { clearDatabases, get, getMongodb } from "./support/spec-utils";
import { todoFixtures } from "./support/todo-fixtures";
import { debug } from "../src/utils/log-utils";

describe("GetTodosHandler", () => {

	let db: Db;

	beforeAll(async () => db = await getMongodb());

	beforeEach(async () => await start(MONGO_SPEC_URL));

	afterEach(async () => {
		await close();
		await clearDatabases();
	});

	it("should be possible to get todos by referenceId", async () => {
		await db.collection(COLLECTION).insertMany(todoFixtures());

		const referenceId = todoFixtures()[0].referenceId;

		const { statusCode, body: { response, error } } = await get<TodoModel[]>(GET_TODOS, { referenceId });

		debug("response from api", { response, error });

		expect(statusCode).withContext("should return status code 200").toBe(200);
		expect(error).withContext("should not return any error").toBeNull();
		expect(response?.length).withContext("should return 2 results").toBe(3);

		const [todoItem1, todoItem2, todoItem3] = response!;

		expect(todoItem1.referenceId).withContext("todo item should have inputted referenceId").toBe(referenceId);
		expect(todoItem2.referenceId).withContext("todo item should have inputted referenceId").toBe(referenceId);
		expect(todoItem3.referenceId).withContext("todo item should have inputted referenceId").toBe(referenceId);

		expect(new Date(todoItem1.date).getTime()).withContext("should sort by date").toBeGreaterThan(new Date(todoItem2.date).getTime());
		expect(new Date(todoItem1.date).getTime()).withContext("should sort by date").toBeGreaterThan(new Date(todoItem3.date).getTime());
		expect(new Date(todoItem2.date).getTime()).withContext("should sort by date").toBeGreaterThan(new Date(todoItem3.date).getTime());
	});

	it("should return error if no referenceId query is used", async () => {
		try {
			await get<TodoModel[]>(GET_TODOS, {});

			fail("didn't return any errors");
		} catch (error: any) {
			debug("response from api", error.body);

			expect(error.body.error).toBe("no referenceId provided");
		}
	});

});

export { };
