![](https://github.com/user-attachments/assets/d90c0d88-c820-4ad7-ab28-193fd6491c6e)

# web-meta-scraper
English | [한국어](https://github.com/cmg8431/meta-scraper/blob/main/README-ko_kr.md)

A TypeScript library for extracting various types of web page metadata (including JSON-LD, Open Graph, meta tags, and more) that works across Node.js, browsers, pnpm, and bun environments.

## Installation
To install `web-meta-scraper`, you can use npm, yarn, pnpm, or bun:

```bash
npm install web-meta-scraper
# or
yarn add web-meta-scraper
# or
pnpm add web-meta-scraper
# or
bun add web-meta-scraper
```

## Usage
`web-meta-scraper` allows you to easily extract metadata from web pages, such as JSON-LD, Open Graph, and meta tags. It also supports custom parsing and flexible fetching options.

```typescript
import { createScraper, jsonLd, openGraph } from 'web-meta-scraper';

const scrape = createScraper([jsonLd, openGraph]);
const metadata = await scrape('https://www.example.com', {
  maxDescriptionLength: 150,
  secureImages: true,
});
```

## Features
- TypeScript support
- Flexible metadata extraction (JSON-LD, Open Graph, meta tags, and more)
- Cross-platform compatibility
- Customizable parsing and fetching options

## License

MIT License