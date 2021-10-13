export default {
	id: "CreateTodoRequestSchema",
	type: "object",
	description: "todo request body",
	additionalProperties: false,
	properties: {
		text: {
			type: "string"
		},
		referenceId: {
			type: "string"
		}
	},
	required: ["text", "referenceId"]
};