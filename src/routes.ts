import express, { Application } from "express";
import { validate } from "express-jsonschema";
import { JSONSchema4 } from "json-schema";
import { Db } from "mongodb";
import { CREATE_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO, UPDATE_TODOS } from "./constants/paths";
import { CreateTodoHandler } from "./handlers/CreateTodoHandler";
import { DeleteTodoHandler } from "./handlers/DeleteTodoHandler";
import { GetTodosHandler } from "./handlers/GetTodosHandler";
import { UpdateTodoHandler } from "./handlers/UpdateTodoHandler";
import CreateTodoRequestSchema from "./json-schemas/CreateTodoRequestSchema";
import UpdateTodoRequestSchema from "./json-schemas/UpdateTodoRequestSchema";
import UpdateTodosRequestSchema from "./json-schemas/UpdateTodosRequestSchema";
import { TodoRepo } from "./repos/TodoRepo";

export default (app: Application, db: Db) => {
	const todoRepo = new TodoRepo(db);
	const createTodo = new CreateTodoHandler(todoRepo);
	const getTodos = new GetTodosHandler(todoRepo);
	const updateTodo = new UpdateTodoHandler(todoRepo);
	const deleteTodo = new DeleteTodoHandler(todoRepo);

	app.post(CREATE_TODO, validate({ body: CreateTodoRequestSchema as JSONSchema4 }), (req, res) => createTodo.handle(req, res));
	app.get(GET_TODOS, (req, res) => getTodos.handle(req as any, res));
	app.put(UPDATE_TODO, validate({ body: UpdateTodoRequestSchema as unknown as JSONSchema4 }), (req, res) => updateTodo.handle(req as any, res));
	app.put(UPDATE_TODOS, validate({ body: UpdateTodosRequestSchema as unknown as JSONSchema4 }), (req, res) => updateTodo.updateMany(req as any, res));
	app.delete(DELETE_TODO, (req, res) => deleteTodo.handle(req as any, res));

	app.use(express.static("app/build"));
};