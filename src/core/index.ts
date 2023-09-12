import { parse } from "@babel/parser";
import { createFilter } from "@rollup/pluginutils";
import MagicString from "magic-string";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";

import { transform as _transform } from "./transform";
import type { Options } from "./types";

export function transform(
	options: Options | undefined,
	code: string,
	id: string,
) {
	const filter = createFilter(
		options?.include ?? /\.[cm]?[jt]?sx?$/,
		options?.exclude ?? /node_modules/,
	);
	if (!filter(id)) {
		return null;
	}
	const parsed = parse(code);
	const s = new MagicString(code);

	return _transform(parsed, s);
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options,
) => ({
	name: "unplugin-todo-or-die",
	transform(code, id) {
		return transform(options, code, id);
	},
});

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
