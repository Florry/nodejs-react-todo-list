import { Db } from "mongodb";
import { v4 as uuid } from "uuid";
import { TodoModel, TodoStatus } from "../src/models/TodoModel";
import { CREATE_TODO } from "../src/constants/paths";
import { COLLECTION } from "../src/repos/TodoRepo";
import { close, start } from "../src/server";
import { MONGO_SPEC_URL, UUID_REGEXP } from "./support/spec-constants";
import { clearDatabases, getMongodb, post } from "./support/spec-utils";
import { silly } from "../src/utils/log-utils";

describe("CreateTodoHandler", () => {

	let db: Db;

	beforeAll(async () => db = await getMongodb());

	beforeEach(async () => await start(MONGO_SPEC_URL));

	afterEach(async () => {
		await close();
		await clearDatabases();
	});

	it("should be possible to create todo item", async () => {
		const todoItemToCreate: Pick<TodoModel, "referenceId" | "text"> = {
			referenceId: uuid(),
			text: "hello"
		};

		const { statusCode, body: { response: createdTodoItem, error } } = await post<TodoModel>(CREATE_TODO, todoItemToCreate);

		silly("response from api", { response: createdTodoItem, error });

		expect(statusCode).withContext("should return status 200").toBe(200);
		expect(error).withContext("should not return an error").toBeNull();

		expect(createdTodoItem?.status).withContext("should set status to TO_DO by default").toBe(TodoStatus.ToDo);
		expect(createdTodoItem?.referenceId).withContext("should match request body").toBe(todoItemToCreate.referenceId);
		expect(createdTodoItem?.text).withContext("should match request body").toBe(todoItemToCreate.text);
		expect(createdTodoItem?.id).withContext("should add uuid id to todo item").toMatch(UUID_REGEXP);
		expect(createdTodoItem?.date).withContext("should add date to todo item").toBeDefined();

		const [databaseTodoItem]: TodoModel[] = await db.collection(COLLECTION).find().toArray();

		expect(databaseTodoItem?.status).withContext("should set status to TO_DO by default").toBe(TodoStatus.ToDo);
		expect(databaseTodoItem?.referenceId).withContext("should match request body").toBe(todoItemToCreate.referenceId);
		expect(databaseTodoItem?.text).withContext("should match request body").toBe(todoItemToCreate.text);
		expect(databaseTodoItem?.id).withContext("should add uuid id to todo item").toMatch(UUID_REGEXP);
		expect(databaseTodoItem?.date).withContext("should add date to todo item").toBeDefined();
	});

	it("should not be possible to send in invalid request body", async () => {
		try {
			await post<TodoModel>(CREATE_TODO, {
				id: "c6a4734a-f169-46bc-a7c1-3dbfe0e84162"
			});

			fail("was able to send in invalid request body");
		} catch (error: any) {
			silly("response from api", error.body);

			expect(error.body).toEqual({
				name: "JsonSchemaValidation",
				message: "express-jsonschema: Invalid data found",
				validations: {
					body: [
						{
							value: { id: "c6a4734a-f169-46bc-a7c1-3dbfe0e84162" },
							property: "instance",
							messages: [
								'is not allowed to have the additional property "id"',
								'requires property "text"',
								'requires property "referenceId"'
							]
						}
					]
				}
			});
		}
	});

});

export { };
