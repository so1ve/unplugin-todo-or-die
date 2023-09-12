import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";

import type { Options } from "./types";

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	_options,
) => ({
	name: "pkg-name",
	transform(code) {
		return code;
	},
});

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
