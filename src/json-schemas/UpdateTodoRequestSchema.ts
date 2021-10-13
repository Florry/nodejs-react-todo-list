import { TodoStatus } from "../models/TodoModel";

export default {
	id: "UpdateTodoRequestSchema",
	type: "object",
	description: "todo request body",
	additionalProperties: false,
	properties: {
		status: {
			type: "string",
			enum: Object.values(TodoStatus)
		}
	},
	required: ["status"]
};