![](https://github.com/user-attachments/assets/d90c0d88-c820-4ad7-ab28-193fd6491c6e)

# meta-scraper

English | [한국어](https://github.com/cmg8431/meta-scraper/blob/main/README-ko_kr.md)

`meta-scraper` is a TypeScript-safe library for extracting metadata from web pages. It provides a modern API that supports various environments, including Node.js, browsers, `pnpm`, and `bun`. The library simplifies the process of scraping common metadata, including JSON-LD, Open Graph, and other meta tags, with support for custom parsing and flexible fetching options.

## Features

- TypeScript-safe for better development experience.
- Extracts JSON-LD, Open Graph, and meta tags easily.
- Supports various environments including Node.js, browsers, `pnpm`, and `bun`.
- Allows custom parsing of metadata.
- Offers flexible fetching options, including custom headers and response handling.

## Installation

To install `meta-scraper`, you can use npm, yarn, pnpm, or bun:

```bash
npm install meta-scraper
# or
yarn add meta-scraper
# or
pnpm add meta-scraper
# or
bun add meta-scraper
```

## Examples

`meta-scraper` allows you to easily extract metadata from web pages, such as JSON-LD, Open Graph, and meta tags. It also supports custom parsing and flexible fetching options.

```tsx
import { createScraper, jsonLd, openGraph } from 'meta-scraper';

const scrape = createScraper([jsonLd, openGraph]);

const url = 'https://www.example.com';

const metadata = await scrape(url, {
  maxDescriptionLength: 150,
  secureImages: true,
});

console.log(metadata);
// Output:
// {
//   title: "Example Title",
//   description: "Example description",
//   jsonLd: [...],
//   openGraph: {...}
// }
```

## License

`meta-scraper` is licensed under the MIT License.
