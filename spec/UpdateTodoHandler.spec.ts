import { Db } from "mongodb";
import { UPDATE_TODO, UPDATE_TODOS } from "../src/constants/paths";
import { TodoModel, TodoStatus } from "../src/models/TodoModel";
import { COLLECTION } from "../src/repos/TodoRepo";
import { close, start } from "../src/server";
import { debug } from "../src/utils/log-utils";
import { MONGO_SPEC_URL } from "./support/spec-constants";
import { clearDatabases, getMongodb, put } from "./support/spec-utils";
import { todoFixtures } from "./support/todo-fixtures";

describe("UpdateTodoHandler", () => {

	let db: Db;

	beforeAll(async () => db = await getMongodb());

	beforeEach(async () => await start(MONGO_SPEC_URL));

	afterEach(async () => {
		await close();
		await clearDatabases();
	});

	it("should be possible to update one todo", async () => {
		await db.collection(COLLECTION).insertMany(todoFixtures());

		const todoId = todoFixtures()[0].id;

		const todoDatabaseItemBeforeUpdate = await db.collection(COLLECTION).findOne({ id: todoId });

		/** Sanity check */
		expect(todoDatabaseItemBeforeUpdate.status).toBe(TodoStatus.ToDo);

		const { statusCode, body: { error, response: updatedTodo } } = await put<TodoModel>(UPDATE_TODO.replace(":id", todoId), { status: TodoStatus.Completed });

		debug("response from api", { error, response: updatedTodo });

		expect(statusCode).withContext("should send status code 200").toBe(200);
		expect(updatedTodo?.status).withContext("should update status to COMPLETED").toBe(TodoStatus.Completed);
		expect(error).withContext("should not return any error").toBeNull();

		const todoDatabaseItem = await db.collection(COLLECTION).findOne({ id: todoId });

		expect(todoDatabaseItem?.status).withContext("should update status to COMPLETED").toBe(TodoStatus.Completed);
	});

	it("should be possible to update multiple todos", async () => {
		await db.collection(COLLECTION).insertMany(todoFixtures());

		const todoIds = todoFixtures().filter(todo => todo.status === TodoStatus.ToDo).map(todo => todo.id);

		const { statusCode, body: { error, response: updatedTodos } } = await put<TodoModel[]>(UPDATE_TODOS, { ids: todoIds, status: TodoStatus.Completed });

		debug("response from api", { error, response: updatedTodos });

		expect(statusCode).withContext("should send status code 200").toBe(200);
		expect(error).withContext("should not return any error").toBeNull();
		expect(updatedTodos?.length).withContext("should update two todos").toBe(2);

		updatedTodos?.forEach(todo => expect(todo.status).withContext("should update status to COMPLETED").toBe(TodoStatus.Completed));

		const todoDatabaseItems = await db.collection(COLLECTION).find({ id: { $in: todoIds } }).toArray();

		todoDatabaseItems.forEach(todo => expect(todo.status).withContext("should update status to COMPLETED").toBe(TodoStatus.Completed));
	});

});

export { };

