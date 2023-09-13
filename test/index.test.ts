import { describe, expect, it } from "vitest";

import { transform } from "../src/core/transform";

const testTransform = (code: string) => transform(code, "foo.ts");

describe("should", () => {
	it("transform", () => {
		expect(
			testTransform(`
		// TODO::expires(2000-01-01): do something
		`),
		).toMatchSnapshot();
	});

	it("transform another case", () => {
		expect(
			testTransform(`
		// TODO::expire(2000-01-01): do something
		`),
		).toMatchSnapshot();
	});
});
