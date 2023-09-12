import { describe, expect, it } from "vitest";

import { transform } from "../src/core";

const testTransform = (code: string) => transform(undefined, code, "foo.ts");

describe("should", () => {
	it("transform", () => {
		expect(
			testTransform(`
		// TODO: do something, expires: 2024-01-01
		`),
		).toMatchSnapshot();
	});

	it("transform another case", () => {
		expect(
			testTransform(`
		// TODO(2024-01-01): do something
		`),
		).toMatchSnapshot();
	});
});
