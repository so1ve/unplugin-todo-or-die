# unplugin-todo-or-die

[![NPM version](https://img.shields.io/npm/v/unplugin-todo-or-die?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-todo-or-die)

> TODO or DIEEEEEEE!!!!!!!!!!!!!

This plugin turns these TODO comments:

```ts
// TODO(2021-01-01): do something
// TODO: do something, expires 2021-01-01
```

Into such code:

```ts
if (Date.now() > 1_704_067_200_000) {
	throw new Error("TODO expired: do something");
}
```

## 📦 Installation

```bash
$ npm install -D unplugin-todo-or-die
$ yarn add -D unplugin-todo-or-die
$ pnpm add -D unplugin-todo-or-die
```

## 🚀 Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import TodoOrDie from "unplugin-todo-or-die/vite";

export default defineConfig({
	plugins: [
		TodoOrDie({
			/* options */
		}),
	],
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import TodoOrDie from "unplugin-todo-or-die/rollup";

export default {
	plugins: [
		TodoOrDie({
			/* options */
		}),
		// other plugins
	],
};
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
	/* ... */
	plugins: [
		require("unplugin-todo-or-die/webpack")({
			/* options */
		}),
	],
};
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
	modules: ["unplugin-todo-or-die/nuxt"],
});
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
	configureWebpack: {
		plugins: [
			require("unplugin-todo-or-die/webpack")({
				/* options */
			}),
		],
	},
};
```

<br></details>

<details>
<summary>Quasar</summary><br>

```ts
// quasar.conf.js [Vite]
module.exports = {
	vitePlugins: [
		[
			"unplugin-todo-or-die/vite",
			{
				/* options */
			},
		],
	],
};
```

```ts
// quasar.conf.js [Webpack]
const TodoOrDiePlugin = require("unplugin-todo-or-die/webpack");

module.exports = {
	build: {
		chainWebpack(chain) {
			chain.plugin("unplugin-todo-or-die").use(
				TodoOrDiePlugin({
					/* options */
				}),
			);
		},
	},
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from "esbuild";

build({
	/* ... */
	plugins: [
		require("unplugin-todo-or-die/esbuild")({
			/* options */
		}),
	],
});
```

<br></details>

<details>
<summary>Astro</summary><br>

```ts
// astro.config.mjs
import TodoOrDie from "unplugin-todo-or-die/astro";

export default defineConfig({
	integrations: [
		TodoOrDie({
			/* options */
		}),
	],
});
```

<br></details>

## 🖥️ Credits

Original version (ruby): https://github.com/searls/todo_or_die

## 📝 License

[MIT](./LICENSE). Made with ❤️ by [Ray](https://github.com/so1ve)
