/**
 * Represents a successful safe with a value that is the same return type as the function, a null error, and a true boolean indicating success.
 * @template ReturnType The type of the successful result.
 * @example
 * ```ts
 * const myPromise = Promise.resolve("Success!");
 *
 * const [result, error, success] = await safe(myPromise);
 *
 * result === "Success!";
 * error === null;
 * success === true;
 * ```
 */
export type SuccessResult<ReturnType> = [ReturnType, null, true];

/**
 * Represents a failure result with a null value, an error, and a false boolean indicating failure.
 * @example
 * ```ts
 * const myPromise = Promise.reject("Failure.");
 *
 * const [result, error, success] = await safe(myPromise);
 *
 * result === null;
 * error === Error { "Failure." };
 * success === false;
 * ```
 */
export type FailureResult = [null, Error, false];

/**
 * Represents the result of the promise that the safe operation ran. It can either be a successful result containing a value or a failure result indicating an error.
 * @template ReturnType The type of the value returned in case of success.
 */
export type SafeResult<ReturnType> = SuccessResult<ReturnType> | FailureResult;
