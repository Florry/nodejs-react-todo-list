import { APIClient } from "../network/APIClient";

export class BaseStore {

	protected apiClient: APIClient;

	constructor(apiClient: APIClient) {
		this.apiClient = apiClient;
	}

}
