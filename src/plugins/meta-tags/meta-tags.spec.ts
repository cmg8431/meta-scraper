import { describe, expect, it } from 'vitest';

import { metaTags } from './meta-tags';

describe('metaTags plugin', () => {
  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Page</title>
        <meta name="description" content="Page Description">
        <meta name="keywords" content="key1, key2, key3">
        <meta name="author" content="John Doe">
        <link rel="canonical" href="https://example.com/page">
        <link rel="icon" href="http://example.com/favicon.ico">
      </head>
    </html>
  `;

  const minimalHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Minimal Page</title>
      </head>
    </html>
  `;

  it('extracts all available metadata from complete HTML', async () => {
    const result = await metaTags(fullHTML, { secureImages: true });

    expect(result.base).toMatchObject({
      title: 'Test Page',
      description: 'Page Description',
      keywords: ['key1', 'key2', 'key3'],
      author: 'John Doe',
      canonicalUrl: 'https://example.com/page',
      favicon: 'https://example.com/favicon.ico',
    });
  });

  it('handles minimal HTML gracefully', async () => {
    const result = await metaTags(minimalHTML, {});

    expect(result.base).toMatchObject({
      title: 'Minimal Page',
      keywords: [],
    });
  });

  it('processes favicon URL based on secureImages option', async () => {
    const withSecureImages = await metaTags(fullHTML, { secureImages: true });
    expect(withSecureImages.base?.favicon).toBe(
      'https://example.com/favicon.ico',
    );

    const withoutSecureImages = await metaTags(fullHTML, {
      secureImages: false,
    });
    expect(withoutSecureImages.base?.favicon).toBe(
      'http://example.com/favicon.ico',
    );
  });

  it('handles malformed keywords correctly', async () => {
    const malformedHTML = `
      <html>
        <head>
          <meta name="keywords" content="key1,,  ,key2, ,key3,">
        </head>
      </html>
    `;

    const result = await metaTags(malformedHTML, {});
    expect(result.base?.keywords).toEqual(['key1', 'key2', 'key3']);
  });

  it('returns empty strings for missing metadata', async () => {
    const result = await metaTags('<html></html>', {});

    expect(result.base).toMatchObject({
      title: '',
      description: '',
      author: '',
      keywords: [],
    });
  });
});
