// Based on https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b -- made more like the fireship version now

export const tryCatch = async <T>(
	promise: Promise<T>,
): Promise<[T, null] | [null, Error]> => {
	try {
		const value = await promise;
		return [value, null];
	} catch (error) {
		if (error instanceof Error) return [null, error];

		return [null, new Error(String(error))];
	}
};
