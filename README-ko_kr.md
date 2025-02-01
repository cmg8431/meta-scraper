![](https://github.com/user-attachments/assets/d90c0d88-c820-4ad7-ab28-193fd6491c6e)

# meta-scraper

English | [한국어](https://github.com/cmg8431/meta-scraper/blob/main/README-ko_kr.md)

`meta-scraper`는 웹 페이지에서 메타데이터를 추출하는 타입 안전한 라이브러리입니다. Node.js와 브라우저 환경을 모두 지원하는 현대적인 API를 제공하여, JSON-LD, Open Graph 및 기타 메타 태그를 손쉽게 추출할 수 있습니다. 또한, 커스텀 파싱 및 유연한 데이터 요청 옵션을 지원합니다.

## 주요 기능

- 더 나은 개발 경험을 위한 타입 안전성.
- JSON-LD, Open Graph, 메타 태그를 쉽게 추출.
- Node.js, 브라우저 환경, `pnpm`, `bun` 등 다양한 환경 지원.
- 메타데이터의 커스텀 파싱 지원.
- 커스텀 헤더 및 응답 처리를 포함한 유연한 데이터 요청 옵션.

## 설치

`meta-scraper`를 설치하려면 npm, yarn, pnpm 또는 bun을 사용할 수 있습니다:

```bash
npm install meta-scraper
# 또는
yarn add meta-scraper
# 또는
pnpm add meta-scraper
# 또는
bun add meta-scraper
```

## 사용 예시

`meta-scraper`는 웹 페이지에서 JSON-LD, Open Graph, 메타 태그 등을 손쉽게 추출할 수 있습니다. 또한, 커스텀 파싱과 유연한 요청 옵션도 지원합니다.

```tsx
import { createScraper, jsonLd, openGraph } from 'meta-scraper';

const scrape = createScraper([jsonLd, openGraph]);

const url = 'https://www.example.com';

const metadata = await scrape(url, {
  maxDescriptionLength: 150,
  secureImages: true,
});

console.log(metadata);
// 출력:
// {
//   title: "Example Title",
//   description: "Example description",
//   jsonLd: [...],
//   openGraph: {...}
// }
```

## 라이선스

`meta-scraper`는 MIT 라이선스 하에 배포됩니다.
