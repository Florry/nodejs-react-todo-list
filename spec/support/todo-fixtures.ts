import { TodoModel, TodoStatus } from "../../src/models/TodoModel";

export const todoFixtures = () => _todoFixtures.map(todo => Object.assign({}, todo));

const _todoFixtures: TodoModel[] = [
	{
		referenceId: "74a9f348-b270-4931-99b3-74ba1e82be95",
		text: "hello 1",
		id: "b6cfc17f-2f40-4ae2-946b-ee1c139871b6",
		status: TodoStatus.ToDo,
		date: new Date("2021-05-12T16:55:10.573Z")
	},
	{
		referenceId: "74a9f348-b270-4931-99b3-74ba1e82be95",
		text: "hello 1",
		id: "81095038-eab6-41cc-a997-45982d3c51a0",
		status: TodoStatus.ToDo,
		date: new Date("2021-03-12T16:55:10.573Z")
	},
	{
		referenceId: "74a9f348-b270-4931-99b3-74ba1e82be95",
		text: "hello 2",
		id: "7232af80-3856-43bd-bf72-9b67f2bc85f5",
		status: TodoStatus.Completed,
		date: new Date("2021-09-10T16:55:10.573Z")
	},
	{
		referenceId: "929125e2-0704-4908-bfe7-b4b400c97542",
		text: "hello 3",
		id: "5b261108-14f6-433f-b4e9-bb93414b9a2e",
		status: TodoStatus.Completed,
		date: new Date("2021-09-10T16:55:10.573Z")
	}
];