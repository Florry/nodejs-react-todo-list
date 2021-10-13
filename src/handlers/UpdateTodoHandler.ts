import { Request, Response } from "express";
import { ResponseModel } from "../models/ResponseModel";
import { TodoModel, TodoStatus } from "../models/TodoModel";
import { TodoRepo } from "../repos/TodoRepo";
import { debug, silly } from "../utils/log-utils";

export class UpdateTodoHandler {

	constructor(private todoRepo: TodoRepo) { }

	async handle({ params: { id }, body: { status } }: Request<{ id: string }, {}, { status: TodoStatus }>, res: Response<ResponseModel<TodoModel>>) {
		debug("updating todo", id, "with status", status);

		const updatedTodo = await this.todoRepo.updateTodo(id, status!);

		debug("updated todo", id);
		silly(updatedTodo);

		res.json(new ResponseModel(updatedTodo));
	}

	async updateMany({ body: { ids, status } }: Request<{}, {}, { ids: string[], status: TodoStatus }>, res: Response<ResponseModel<TodoModel[]>>) {
		debug("updating todos", ids, "with status", status);

		const updatedTodos = await this.todoRepo.updateTodos(ids, status);

		debug("updated", updatedTodos.length, "todos");
		silly(updatedTodos);

		res.json(new ResponseModel(updatedTodos));
	}

}