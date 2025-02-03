![](https://github.com/user-attachments/assets/d90c0d88-c820-4ad7-ab28-193fd6491c6e)

# web-meta-scraper
English | [한국어](https://github.com/cmg8431/meta-scraper/blob/main/README-ko_kr.md)

`meta-scraper`는 웹 페이지의 다양한 메타데이터(JSON-LD, Open Graph, 메타 태그 등)를 추출하는 타입스크립트 라이브러리입니다. Node.js와 브라우저, pnpm, bun 등 다양한 환경을 지원합니다.

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

```typescript
import { createScraper, jsonLd, openGraph } from 'meta-scraper';

const scrape = createScraper([jsonLd, openGraph]);
const metadata = await scrape('https://www.example.com', {
  maxDescriptionLength: 150,
  secureImages: true,
});
```

## 주요 기능
- 타입스크립트 지원
- 다양한 메타데이터 추출 (JSON-LD, Open Graph, 메타 태그 등)
- 여러 실행 환경 지원
- 커스텀 파싱 및 데이터 요청 옵션

## 라이선스

MIT License