export interface TodoModel {

	id: string;

	text: string;

	status: TodoStatus;

	/** 
	 * Unique id each user is assigned by the frontend to keep todos separated for each user 
	 * Used when creating and fetching todos to get them to belong to the correct user.
	*/
	referenceId: string;

	date: Date;

}

export enum TodoStatus {
	ToDo = "TO_DO",
	Completed = "COMPLETED"
}