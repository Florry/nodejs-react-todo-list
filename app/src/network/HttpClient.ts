import { API_ROOT } from "../config";

export class HttpClient {

	protected async post(path: string, body: any) {
		return await this.doRequest("POST", path, body);
	}

	protected async get(path: string, query: Record<string, string>) {
		return await this.doRequest("GET", path, undefined, query);
	}

	protected async put(path: string, body: any) {
		return await this.doRequest("PUT", path, body);
	}

	protected async delete(path: string) {
		return await this.doRequest("DELETE", path);
	}

	private async doRequest(method: string, path: string, body?: any, query?: Record<string, string>) {
		const options: any = {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		};

		if (body)
			options.body = JSON.stringify(body);

		const queryString = query ? this.toQueryString(query) : "";

		try {
			const response = await fetch(API_ROOT + path + queryString, options);

			let responseBody: any = {};

			try {
				responseBody = await response.json();

				if (responseBody.error)
					throw responseBody.error;
			} catch (err) { }

			return responseBody.response;
		} catch (err) {
			throw err;
		}
	}

	private toQueryString(query: Record<string, string>) {
		let queryString = "";

		Object.keys(query).forEach((queryKey, i) => {
			if (query[queryKey]) {
				if (i !== 0)
					queryString += "&";
				queryString += `${queryKey}=${query[queryKey]}`;
			}
		});

		if (queryString.length > 0)
			queryString = "?" + queryString;

		return queryString;
	}

}
