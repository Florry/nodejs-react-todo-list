import { TodoModel } from "../models/TodoModel";

export function sortTodosByDate(a: TodoModel, b: TodoModel) {
	const aDate = new Date(a.date);
	const bDate = new Date(b.date);

	if (aDate > bDate)
		return -1;
	else if (aDate < bDate)
		return 1;
	else
		return 0;
}