export const MONGO_SPEC_URL = process.env.MONGO_DB_URL ?? "mongodb://localhost:27017/todos-spec";

export const UUID_REGEXP = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");