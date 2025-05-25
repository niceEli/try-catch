<h1 align="center">Try Catch</h1>

<p align="center">A Go Like try-catch System</p>

<p align="center">
	<a href="https://github.com/niceEli/try-catch/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
bun i try-catch
```

```ts
import tryCatch from "try-catch";

const [data, err] = await tryCatch(greet("fetch"));

if (err) {
	console.error("Error:", err);
	return;
}

// use data here
```

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
