import { ErrorTypes, SafeResult } from "./types.js";
// Based on https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b -- made more like the fireship version now

/**
 * Executes a promise within a try-catch block, providing error handling similar to GoLang.
 *
 * @template Result The type of the promise's resolved value.
 * I know, I know, templates are hard for you vibe coders, but think of it like this:
 * ```ts
 * const a = async (): number => 1; // lambda promise that returns a number (1)
 * await safe(a());
 * ```
 * The template (`Result`) is just a `number` since `a` returns a number.
 *
 * @param {Promise<Result>} promise The promise to be executed.
 * @returns {Promise<SafeResult<Result>>} A promise that resolves to a tuple representing the outcome of the operation.
 *   - On success: `[value: Result, error: null, failure: false]` - The resolved value of the promise, a null error, and the failure flag set to false.
 *   - On failure: `[value: null, error: Error, failure: ErrorTypes]` - A null value, the error that was caught, and the failure flag set to an ErrorType.
 *
 * @example
 * ```ts
 * // fetch example
 * import { safe } from "@niceEli/try-catch";
 *
 * const [result, error, errorType] = await safe(fetch("https://example.com"));
 *
 * if (error) { // or you can do: if (errorType)... since errorType is truthy when there is an error
 *   console.error(error, errorType); // If this ran, Output: "URL not found" or something similar
 *   return;
 * }
 * console.log(result); // Output: "Result: Response { ... }"
 * ```
 *
 * @remarks
 * Check out https://gh.niceeli.tech/try-catch/ for more information, and documentation.
 */
export async function safe<Result>(
	promise: Promise<Result>,
): Promise<SafeResult<Result>> {
	try {
		// Await for promise to resolve
		const value = await promise;
		// Assuming you on this line the promise was successful
		// now return the data, with no error, and a success flag
		return [value, null, false];
	} catch (error) {
		let returnedError: Error;
		let errorType: ErrorTypes = ErrorTypes.UNKNOWN;

		if (error instanceof Error) {
			// When its an Error, just return it
			returnedError = error;
			errorType = ErrorTypes.ERROR;
		} else if (error instanceof Object) {
			// When its an object, stringify it
			returnedError = new Error(JSON.stringify(error));
			errorType = ErrorTypes.OBJECTERROR;
		} else {
			// When its a primitive, turn it into an Error
			returnedError = new Error(String(error));
			errorType = ErrorTypes.PRIMITIVEERROR;
		}

		// Return null as the data since we have no data, the error, and the failure flag
		return [null, returnedError, errorType];
	}
}

/**
 * Executes a function within a try-catch block, providing error handling similar to GoLang.
 *
 * @template Result The type of the function's return value.
 * I know, I know, templates are hard for you vibe coders, but think of it like this:
 * ```ts
 * const a = (a: number, b: number): number => a + b; // lambda function that returns a number (1)
 * safeSync(a, 1, 2);
 * ```
 * The template (`Result`) is just a `number` since `a` returns a number.
 *
 * @param {Promise<Result>} promise The promise to be executed.
 * @returns {Promise<SafeResult<Result>>} A promise that resolves to a tuple representing the outcome of the operation.
 *   - On success: `[value: Result, error: null, failure: false]` - The resolved value of the promise, a null error, and the failure flag set to false.
 *   - On failure: `[value: null, error: Error, failure: ErrorTypes]` - A null value, the error that was caught, and the failure flag set to an ErrorType.
 *
 * @example
 * ```ts
 * // fetch example
 * import { safeSync } from "@niceEli/try-catch";
 *
 * const add = (a: number, b: number): number => a + b;
 * const [result, error, errorType] = safe(add, 1, 2);
 *
 * if (error) { // or you can do: if (errorType)... since errorType is truthy when there is an error
 *   console.error(error, errorType); // If this ran, Output: "function add not found" or something similar
 *   return;
 * }
 * console.log(result); // Output: 3 (as number)
 * ```
 *
 * @remarks
 * Check out https://gh.niceeli.tech/try-catch/ for more information, and documentation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeSync<Result extends (...args: any[]) => any>( // This is one of the few times I will use any
	func: Result,
	// Arguments, this is cursed since i want linting for args
	...args: Parameters<Result>
): SafeResult<ReturnType<Result>> {
	try {
		// Run the function, this error is caused because im using any, i want ANY function to work here
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const value = func(...args);
		// Assuming you on this line the function was successful, so return the data, with no error, and a success flag
		return [value, null, false];
	} catch (error) {
		let returnedError: Error;
		let errorType: ErrorTypes = ErrorTypes.UNKNOWN;

		if (error instanceof Error) {
			// When its an Error, just return it
			returnedError = error;
			errorType = ErrorTypes.ERROR;
		} else if (error instanceof Object) {
			// When its an object, stringify it
			returnedError = new Error(JSON.stringify(error));
			errorType = ErrorTypes.OBJECTERROR;
		} else {
			// When its a primitive, turn it into an Error
			returnedError = new Error(String(error));
			errorType = ErrorTypes.PRIMITIVEERROR;
		}

		// Return null as the data since we have no data, the error, and the failure flag
		return [null, returnedError, errorType];
	}
}
