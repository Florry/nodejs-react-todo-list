import { Collection, Db } from "mongodb";
import { TodoModel, TodoStatus } from "../models/TodoModel";
import { silly } from "../utils/log-utils";

export const COLLECTION = "todos";

export class TodoRepo {

	private collection: Collection<TodoModel>;

	constructor(db: Db) {
		this.collection = db.collection(COLLECTION);
	}

	async createTodo(todo: TodoModel) {
		await this.collection.insertOne(todo);
		return this.getById(todo.id);
	}

	async getById(id: string) {
		silly("TodoRepo getById:", "getting todo with id", id);

		const todo = await this.collection.findOne({ id });

		/** Just a hack to remove _id from mongodb's result here, typescript gets confused when using generics with the collection. Though, the pros weighs out the cons imo. */
		// @ts-ignore
		if (todo._id)
			// @ts-ignore
			delete todo._id;

		silly("TodoRepo getById:", "found todo", todo);

		return todo;
	}

	async getTodos(referenceId: string) {
		silly("TodoRepo getTodos:", "getting todos with referenceId", referenceId);

		const todos = await this.collection.find({ referenceId })
			.project({ _id: 0 })
			.sort({ date: -1 })
			.toArray();

		silly("TodoRepo getTodos:", "found todos with referenceId", todos);

		return todos;
	}

	async updateTodo(id: string, status: TodoStatus) {
		silly("TodoRepo updateTodo:", "updating", id, "with status", status);

		await this.collection.updateOne({ id }, { $set: { status } });

		const todo = await this.getById(id);

		silly("TodoRepo updateTodo:", "updated", todo);

		return todo;
	}

	async updateTodos(ids: string[], status: TodoStatus) {
		silly("TodoRepo updateTodos:", "updating", ids, "with status", status);

		await this.collection.updateMany({ id: { $in: ids } }, { $set: { status } });

		const todos = await this.collection.find({ id: { $in: ids } })
			.project({ _id: 0 })
			.sort({ date: -1 })
			.toArray();

		silly("TodoRepo updateTodos:", "updated", todos);

		return todos;
	}

	async deleteTodo(id: string) {
		silly("TodoRepo deleteTodo:", "deleting todo", id);
		await this.collection.deleteOne({ id });
	}

}
