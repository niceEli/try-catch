export type Success<T> = [T, null];
export type Failure<E> = [null, E];

export type Result<T, E> = Success<T> | Failure<E>;
export type PromiseResult<T, E> = Promise<Result<T, E>>;

export type Operation<T> = Promise<T> | (() => T);

export type Output<T, E> = PromiseResult<T, E> | Result<T, E>;