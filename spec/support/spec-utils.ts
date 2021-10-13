import mongodb, { Db } from "mongodb";
import request from "request";
import { PORT } from "../../src/config";
import { ResponseModel } from "../../src/models/ResponseModel";
import { COLLECTION } from "../../src/repos/TodoRepo";
import { MONGO_SPEC_URL } from "./spec-constants";

interface Response<T> {
	statusCode: number;
	body: ResponseModel<T>;
}

let db: Db;

/**
 * Cleans up data created during the tests
 */
export async function clearDatabases() {
	if (!db)
		db = await mongodb.connect(MONGO_SPEC_URL);

	try {
		await db.collection(COLLECTION).drop();
	} catch (err) { }
}

export async function getMongodb() {
	db = await mongodb.connect(MONGO_SPEC_URL);
	return db;
}

export async function post<T>(path: string, body = {}) {
	return _request<T>("post", path, body);
}

export async function get<T>(path: string, query: Record<string, string>) {
	return _request<T>("get", path, undefined, query);
}

export async function put<T>(path: string, body = {}) {
	return _request<T>("put", path, body);
}

export async function deleteRequest<T>(path: string) {
	return _request<T>("delete", path);
}

async function _request<T>(method: string, path: string, body?: Record<string, any>, query?: Record<string, string>): Promise<Response<T>> {
	return new Promise((resolve, reject) => {
		request(`http://localhost:${PORT}${path}${toQueryString(query)}`, {
			json: body,
			method,
			callback: (error: any, response: any) => {
				if (error)
					reject(error);
				else {
					const json = response.toJSON();

					if (typeof json.body === "string")
						try {
							json.body = JSON.parse(json.body);
						} catch (err) { }

					if (response?.statusCode >= 300)
						reject(json);
					else
						resolve(json);
				}
			}
		});
	});
}

function toQueryString(query: Record<string, string> | undefined) {
	if (!query)
		return "";

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