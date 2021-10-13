import { Request, Response } from "express";
import { ResponseModel } from "../models/ResponseModel";
import { TodoRepo } from "../repos/TodoRepo";
import { debug } from "../utils/log-utils";

export class DeleteTodoHandler {

	constructor(private todoRepo: TodoRepo) { }

	async handle({ params: { id } }: Request<{ id: "string" }>, res: Response<ResponseModel<void>>) {
		debug("deleting todo", id);

		await this.todoRepo.deleteTodo(id);

		res.json(new ResponseModel());
	}

}