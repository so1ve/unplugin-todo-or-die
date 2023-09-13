import { createFilter } from "@rollup/pluginutils";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";

import { transform } from "./transform";
import type { Options } from "./types";

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options,
) => ({
	name: "unplugin-todo-or-die",
	transform(code, id) {
		const filter = createFilter(
			options?.include ?? /\.[cm]?[jt]?sx?$/,
			options?.exclude ?? /node_modules/,
		);
		if (!filter(id)) {
			return null;
		}

		return transform(code, id);
	},
});

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
