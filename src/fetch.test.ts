import { expect, test } from "vitest";
import tryCatch from "./index.js";
import axios from "axios";

test("small-fetch", async () => {
	const url = "https://example.com";

	const [data, error] = await tryCatch(fetch(url));

	expect(data).toBeTruthy();
	expect(data).toBeInstanceOf(Response);
	console.log("non null data (Response type) ->", data?.status);
	expect(error).toBeNull();
	console.log("null error ->", error);
});

test("large-xhr", async () => {
	const url = "https://www.googleapis.com/discovery/v1/apis";

	const [data, error] = await tryCatch(axios(url));

	expect(data).toBeTruthy();
	console.log("non null data (Response type) ->", data?.status);
	expect(error).toBeNull();
	console.log("null error ->", error);
});

test("accepted-promise", async () => {
	const successPromise = Promise.resolve("Hello World");
	const [data, error] = await tryCatch(successPromise);

	expect(data).toBe("Hello World");
	console.log("non null data (string type) ->", data);
	expect(error).toBeNull();
	console.log("null error ->", error);
});

test("rejected-promise", async () => {
	const errorPromise = Promise.reject(new Error("Something went wrong"));
	const [data, error] = await tryCatch(errorPromise);

	expect(data).toBeNull();
	console.log("null data ->", data);
	expect(error).toBeInstanceOf(Error);
	expect((error as Error).message).toBe("Something went wrong");
	console.log("non null error (Error type) ->", (error as Error).message);
});

test("thrown-error", async () => {
	// supress error since we are testing the error handling
	// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
	const failPromise = Promise.reject("string error");
	const [data, error] = await tryCatch(failPromise);

	expect(data).toBeNull();
	console.log("null data ->", data);
	expect(error).toBe("string error");
	console.log("non null error (String type) ->", error);
});
