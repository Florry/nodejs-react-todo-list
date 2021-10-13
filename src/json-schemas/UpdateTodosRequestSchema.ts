import { TodoStatus } from "../models/TodoModel";

export default {
	id: "UpdateTodoRequestSchema",
	type: "object",
	description: "todo request body",
	additionalProperties: false,
	properties: {
		ids: {
			type: "array",
			items: { type: "string" }
		},
		status: {
			type: "string",
			enum: Object.values(TodoStatus)
		}
	},
	required: ["ids", "status"]
};