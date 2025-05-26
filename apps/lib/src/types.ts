/**
 * Represents a successful safe with a value that is the same return type as the function, a null error, and a true boolean indicating success.
 * @template Result The type of the successful result.
 * @example
 * ```ts
 * const myPromise = Promise.resolve("Success!");
 *
 * const [result, error, failure] = await safe(myPromise);
 *
 * result === "Success!";
 * error === null;
 * failure === false;
 * ```
 */
export type SuccessResult<Result> = [Result, null, false];

/**
 * Represents a failure result with a null value, an error, and a false boolean indicating failure.
 * @example
 * ```ts
 * const myPromise = Promise.reject("Failure.");
 *
 * const [result, error, failure] = await safe(myPromise);
 *
 * result === null;
 * error === Error { "Failure." };
 * failure === ErrorTypes.PRIMITIVEERROR;
 * ```
 */
export type FailureResult = [null, Error, ErrorTypes];

/**
 * Represents the result of the promise that the safe operation ran. It can either be a successful result containing a value or a failure result indicating an error.
 * @template Result The type of the value returned in case of success.
 */
export type SafeResult<Result> = SuccessResult<Result> | FailureResult;

/**
 * Enum representing different types of errors that can occur during the execution of a promise.
 * - `ERROR`: A standard error type, used for when the Error is the Error type.
 * - `OBJECTERROR`: An error that was thrown as an object, which is turned into the Error type before being returned.
 * - `PRIMITIVEERROR`: An error that was thrown as a primitive (string, number, boolean), which is stringified and turned into the Error type before being returned.
 * - `UNKNOWN`: Fallback Error type.
 */
export enum ErrorTypes {
	UNKNOWN = "unknown",
	ERROR = "error",
	OBJECTERROR = "objectError",
	PRIMITIVEERROR = "primitiveError",
}
