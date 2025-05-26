import { expect, test } from "vitest";
import safe, { ErrorTypes } from "./index.js";
import axios from "axios";

test("small-fetch", async () => {
	const url = "https://example.com";

	const [data, error, type] = await safe(fetch(url));

	expect(data).toBeTruthy();
	expect(data).toBeInstanceOf(Response);
	console.log("non null data (Response type) ->", data?.status);
	expect(error).toBeNull();
	console.log("null error ->", error);
	expect(type).toBe(true);
	console.log("error type ->", type);
});

test("large-xhr", async () => {
	const url = "https://www.googleapis.com/discovery/v1/apis";

	const [data, error, type] = await safe(axios(url));

	expect(data).toBeTruthy();
	console.log("non null data (Response type) ->", data?.status);
	expect(error).toBeNull();
	console.log("null error ->", error);
	expect(type).toBe(true);
	console.log("error type ->", type);
});

test("accepted-promise", async () => {
	const successPromise = Promise.resolve("Hello World");
	const [data, error, type] = await safe(successPromise);

	expect(data).toBe("Hello World");
	console.log("non null data (string type) ->", data);
	expect(error).toBeNull();
	console.log("null error ->", error);
	expect(type).toBe(true);
	console.log("error type ->", type);
});

test("thrown-error", async () => {
	const errorPromise = Promise.reject(new Error("Something went wrong"));
	const [data, error, type] = await safe(errorPromise);

	expect(data).toBeNull();
	console.log("null data ->", data);
	expect(error).toBeInstanceOf(Error);
	expect(error?.message).toBe("Something went wrong");
	console.log("non null error (Error type) ->", error?.message);
	expect(type).toBe(ErrorTypes.ERROR);
	console.log("error type ->", type);
});

test("rejected-promise", async () => {
	// supress error since we are testing the error handling
	// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
	const failPromise = Promise.reject("string error");
	const [data, error, type] = await safe(failPromise);

	expect(data).toBeNull();
	console.log("null data ->", data);
	expect(error).toStrictEqual(new Error("string error"));
	expect(error?.message).toBe("string error");
	expect(error).toBeInstanceOf(Error);
	console.log("non null error (String type) ->", error?.message);
	expect(type).toBe(ErrorTypes.PRIMITIVEERROR);
	console.log("error type ->", type);
});

test("rejected-object-promise", async () => {
	// supress error since we are testing the error handling
	// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
	const failPromise = Promise.reject({ message: "error in a object" });
	const [data, error, type] = await safe(failPromise);

	expect(data).toBeNull();
	console.log("null data ->", data);
	expect(error?.message).toStrictEqual('{"message":"error in a object"}');
	expect(error).toBeInstanceOf(Error);
	console.log("non null error (String type) ->", error?.message);
	expect(type).toBe(ErrorTypes.OBJECTERROR);
	console.log("error type ->", type);
});
