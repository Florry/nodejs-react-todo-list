import { action, computed, observable, runInAction, toJS } from "mobx";
import { REFERENCE_ID_LOCAL_STORAGE_KEY } from "../constants";
import { TodoModel, TodoStatus } from "../models/TodoModel";
import { BaseStore } from "./BaseStore";
import shortUuid from "short-uuid";

export class TodoStore extends BaseStore {

	@observable
	private todoRegistry = observable.map<string, TodoModel>();

	@observable
	private isLoadingTodosStore = observable.box(true);

	@computed
	get todos() {
		return [...this.todoRegistry.values()];
	}

	@computed
	get isLoadingTodos() {
		return this.isLoadingTodosStore.get();
	}

	getTodoById(id: string) {
		return toJS(this.todoRegistry.get(id));
	}

	@action
	async loadTodos() {
		try {
			const todos = await this.apiClient.getTodos(this.getReferenceId());

			runInAction(() => {
				todos.forEach((todo: TodoModel) => this.todoRegistry.set(todo.id, todo));
				this.isLoadingTodosStore.set(false);
			});

		} catch (err: any) {
			alert("Error while contacting backend: " + typeof err === "object" ? JSON.stringify(err) : err);
		}
	}

	@action
	async createTodo(text: string) {
		try {
			const createdTodo = await this.apiClient.createTodo({ referenceId: this.getReferenceId(), text });

			runInAction(() => this.todoRegistry.set(createdTodo.id, createdTodo));
		} catch (err: any) {
			alert("Error while contacting backend: " + typeof err === "object" ? JSON.stringify(err) : err);
		}
	}

	@action
	async toggleCompleted(id: string) {
		try {
			const todo = this.todoRegistry.get(id);

			let status: TodoStatus;

			if (todo?.status === TodoStatus.ToDo)
				status = TodoStatus.Completed;
			else
				status = TodoStatus.ToDo;

			const updatedTodo = await this.apiClient.updateTodoStatus(id, status);

			runInAction(() => this.todoRegistry.set(id, updatedTodo));
		} catch (err: any) {
			alert("Error while contacting backend: " + typeof err === "object" ? JSON.stringify(err) : err);
		}
	}

	@action
	async markAllAsComplete() {
		try {
			const incompleteTodoIds = [...this.todoRegistry.values()]
				.filter(todo => todo.status === TodoStatus.ToDo)
				.map(todo => todo.id);

			if (!incompleteTodoIds.length)
				return;

			const updatedTodos = await this.apiClient.updateTodosStatus(incompleteTodoIds, TodoStatus.Completed);

			runInAction(() => updatedTodos.map((todo: TodoModel) => this.todoRegistry.set(todo.id, todo)));
		} catch (err: any) {
			alert("Error while contacting backend: " + typeof err === "object" ? JSON.stringify(err) : err);
		}
	}

	@action
	async deleteTodo(id: string) {
		try {
			await this.apiClient.deleteTodo(id);
			runInAction(() => this.todoRegistry.delete(id));
		} catch (err: any) {
			alert("Error while contacting backend: " + typeof err === "object" ? JSON.stringify(err) : err);
		}
	}

	@action
	clearTodos() {
		this.todoRegistry.clear();
	}

	clearReferenceId() {
		localStorage.removeItem(REFERENCE_ID_LOCAL_STORAGE_KEY);
	}

	generateNewReferenceId() {
		this.getReferenceId();
	}

	private getReferenceId() {
		const existingReferenceId = localStorage.getItem(REFERENCE_ID_LOCAL_STORAGE_KEY);

		if (existingReferenceId)
			return existingReferenceId;
		else {
			const newReferenceid = shortUuid.generate();

			localStorage.setItem(REFERENCE_ID_LOCAL_STORAGE_KEY, newReferenceid);

			return newReferenceid;
		}
	}

}
