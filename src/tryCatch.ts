// Based on https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b

import { Failure, Operation, Output, Success } from "./types.js";

const onSuccess = <T>(value: T): Success<T> => [value, null];
const onFailure = <E>(error: E): Failure<E> => [null, error];

export const tryCatch = <T, E>(operation: Operation<T>): Output<T, E> => {
	if (operation instanceof Promise) {
		return operation.then(onSuccess).catch(onFailure);
	}

	try {
		const value = operation();
		return [value, null] as Success<T>;
	} catch (error) {
		return [null, error as E] as Failure<E>;
	}
};
