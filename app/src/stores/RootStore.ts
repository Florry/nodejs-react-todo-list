import React from "react";
import { APIClient } from "../network/APIClient";
import { TodoStore } from "./TodoStore";

export class RootStore {

	protected apiClient: APIClient;

	todoStore: TodoStore;

	constructor() {
		this.apiClient = new APIClient();

		this.todoStore = new TodoStore(this.apiClient);
	}
}

const StoreContext = React.createContext(new RootStore());

export const useStore = () => React.useContext(StoreContext);