import { SafeResult } from "./types.js";
// Based on https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b -- made more like the fireship version now

/**
 * Executes a promise within a try-catch block, providing error handling similar to GoLang.
 *
 * @template ReturnType The type of the promise's resolved value.
 * I know, I know, templates are hard for you vibe coders, but think of it like this:
 * ```ts
 * const a = () => 1; // lambda function that returns a number (1)
 * await safe(a());
 * ```
 * The template (`ReturnType`) is just a `number` since `a` returns a number.
 *
 * @param {Promise<ReturnType>} promise The promise to be executed.
 * @returns {Promise<SafeResult<ReturnType>>} A promise that resolves to a tuple representing the outcome of the operation.
 *   - On success: `[value: ReturnType, error: null, success: true]` - The resolved value of the promise, a null error, and a success flag set to true.
 *   - On failure: `[value: null, error: Error, success: false]` - A null value, the error that was caught, and a success flag set to false.
 *
 * @example
 * ```ts
 * // fetch example
 * import safe from "@niceEli/try-catch";
 *
 * const [result, error, success] = await safe(fetch("https://example.com"));
 *
 * if (error) { // or you can do: if (!success)
 *   console.error(error); // If this ran, Output: "URL not found" or something similar
 *   return;
 * }
 * console.log(result); // Output: "Result: Response { ... }"
 * ```
 */
export async function safe<ReturnType>(
	promise: Promise<ReturnType>,
): Promise<SafeResult<ReturnType>> {
	try {
		// Await for promise to resolve
		const value = await promise;
		// Assuming you on this line the promise was successful
		// now return the data, with no error, and a success flag
		return [value, null, true];
	} catch (error) {
		let returnedError: Error;

		if (error instanceof Error)
			// When its an Error, just return it
			returnedError = error;
		else if (error instanceof Object)
			// When its an object, stringify it
			returnedError = new Error(JSON.stringify(error));
		else
			// When its a string, turn it into an Error
			returnedError = new Error(String(error));

		// Return null as the data since we have no data, the error, and a failure flag
		return [null, returnedError, false];
	}
}
