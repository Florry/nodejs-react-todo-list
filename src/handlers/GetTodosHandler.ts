import { Request, Response } from "express";
import { ResponseModel } from "../models/ResponseModel";
import { TodoModel } from "../models/TodoModel";
import { TodoRepo } from "../repos/TodoRepo";
import { debug, silly } from "../utils/log-utils";

export class GetTodosHandler {

	constructor(private todoRepo: TodoRepo) { }

	async handle({ query: { referenceId } }: Request<{}, {}, void, { referenceId: string }>, res: Response<ResponseModel<TodoModel[] | null>>) {
		debug("getting todos with referenceId", referenceId);

		if (!referenceId) {
			debug("referenceId was not provided, returning error: no referenceId provided");

			res.status(400);
			res.json(new ResponseModel(null, "no referenceId provided"));
			return;
		}

		const todos = await this.todoRepo.getTodos(referenceId);

		debug("found", todos.length, "todos with referenceId", referenceId);
		silly("returning", todos);

		res.json(new ResponseModel(todos));
	}

}
