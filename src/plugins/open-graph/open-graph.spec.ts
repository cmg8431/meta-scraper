import { describe, expect, it } from 'vitest';

import { openGraph } from './open-graph';

describe('openGraph plugin', () => {
  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="OG Test Title">
        <meta property="og:description" content="OG Test Description">
        <meta property="og:image" content="http://example.com/image.jpg">
        <meta property="og:url" content="https://example.com/page">
        <meta property="og:type" content="article">
        <meta property="og:site_name" content="Test Site">
        <meta property="og:locale" content="en_US">
      </head>
    </html>
  `;

  it('extracts all available OpenGraph metadata', async () => {
    const result = await openGraph(fullHTML, { secureImages: true });

    expect(result.openGraph).toMatchObject({
      title: 'OG Test Title',
      description: 'OG Test Description',
      image: 'https://example.com/image.jpg',
      url: 'https://example.com/page',
      type: 'article',
      siteName: 'Test Site',
      locale: 'en_US',
    });
  });

  it('handles missing OpenGraph metadata', async () => {
    const html = '<html><head></head></html>';
    const result = await openGraph(html, {});

    expect(result.openGraph).toMatchObject({});
  });

  it('truncates description based on maxDescriptionLength', async () => {
    const longDescription = 'a'.repeat(200);
    const html = `
      <html>
        <head>
          <meta property="og:description" content="${longDescription}">
        </head>
      </html>
    `;

    const result = await openGraph(html, { maxDescriptionLength: 100 });
    expect(result.openGraph?.description?.length).toBeLessThanOrEqual(103); // 100 + '...'
  });

  it('handles secure image conversion', async () => {
    const html = `
      <html>
        <head>
          <meta property="og:image" content="http://example.com/image.jpg">
        </head>
      </html>
    `;

    const secureResult = await openGraph(html, { secureImages: true });
    expect(secureResult.openGraph?.image).toBe('https://example.com/image.jpg');

    const insecureResult = await openGraph(html, { secureImages: false });
    expect(insecureResult.openGraph?.image).toBe(
      'http://example.com/image.jpg',
    );
  });

  it('handles malformed OpenGraph tags gracefully', async () => {
    const html = `
      <html>
        <head>
          <meta property="og:title" content="">
          <meta property="og:description">
          <meta property="og:invalid" content="test">
        </head>
      </html>
    `;

    const result = await openGraph(html, {});
    expect(result.openGraph?.title).toBe('');
    expect(result.openGraph?.description).toBeUndefined();
  });
});
