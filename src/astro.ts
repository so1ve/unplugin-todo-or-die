import type { Options } from "./types";
import VitePlugin from "./vite";

export default (options: Options) => ({
	name: "unplugin-todo-or-die",
	hooks: {
		"astro:config:setup": async (astro: any) => {
			astro.config.vite.plugins ||= [];
			astro.config.vite.plugins.push(VitePlugin(options));
		},
	},
});
