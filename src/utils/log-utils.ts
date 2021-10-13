import { inspect } from "util";

/** Quick hack log library 😁 */
export function debug(...logs: any[]) {
	if (process.env.LOG_LEVEL === "debug" || process.env.LOG_LEVEL === "silly")
		log("debug", ...logs);
}

export function silly(...logs: any[]) {
	if (process.env.LOG_LEVEL === "silly")
		log("silly", ...logs);
}

function log(logLevel: string, ...logs: any[]) {
	console.log(`[${logLevel}]`, new Date().toJSON().slice(0, 16).replace("T", " "), "-", ...logs.map(log => {
		if (typeof log !== "string")
			return inspect(log, true, null, true);
		else
			return log;
	}));
}