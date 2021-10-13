import { TodoModel, TodoStatus } from "../models/TodoModel";
import { HttpClient } from "./HttpClient";

export class APIClient extends HttpClient {

	async createTodo(todo: Pick<TodoModel, "text" | "referenceId">) {
		return await this.post("/todo", todo);
	}

	async getTodos(referenceId: string) {
		return await this.get("/todo", { referenceId });
	}

	async updateTodoStatus(id: string, status: TodoStatus) {
		return await this.put(`/todo/${id}`, { status });
	}

	async updateTodosStatus(ids: string[], status: TodoStatus) {
		return await this.put(`/todo`, { ids, status });
	}

	async deleteTodo(id: string) {
		return await this.delete(`/todo/${id}`);
	}

}
