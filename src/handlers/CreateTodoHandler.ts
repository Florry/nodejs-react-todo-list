import { Request, Response } from "express";
import { TodoModel, TodoStatus } from "../models/TodoModel";
import { TodoRepo } from "../repos/TodoRepo";
import { v4 as uuid } from "uuid";
import { ResponseModel } from "../models/ResponseModel";
import { debug, silly } from "../utils/log-utils";

export class CreateTodoHandler {

	constructor(private todoRepo: TodoRepo) { }

	async handle({ body }: Request<{}, {}, Pick<TodoModel, "referenceId" | "text">>, res: Response<ResponseModel<TodoModel>>) {
		debug("got request body to create todo with referenceId", body.referenceId);
		silly("with full body", body);

		const todoToCreate: TodoModel = {
			...body,
			id: uuid(),
			status: TodoStatus.ToDo,
			date: new Date()
		};

		const createdTodo = await this.todoRepo.createTodo(todoToCreate);

		debug("created todo", createdTodo?.id);
		silly(createdTodo);

		res.json(new ResponseModel(createdTodo));
	}

}