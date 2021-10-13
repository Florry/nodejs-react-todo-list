/** A response model to keep all responses from the api the same format */
export class ResponseModel<T> {

	constructor(public response: T | null = null, public error: any = null) { }

}
