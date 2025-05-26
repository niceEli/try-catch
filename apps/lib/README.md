<h1 align="center"><a href="https://github.com/niceEli/try-catch">Try Catch</a></h1>

<p align="center">A Go Like try-catch System</p>

<p align="center">
	<a href="https://github.com/niceEli/try-catch/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
bun i @niceeli/try-catch
```

```ts
import safe from "@niceeli/try-catch";

const [data, err, type] = await safe(fetch("https://example.com"));

// data is Response | null
if (err) {
	console.error(`Error: ${err} (${type})`);
	return;
}

// data is Response now, both you and the type system know 100% sure its not null
console.log(data.text());
```
