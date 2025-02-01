import { describe, expect, it } from 'vitest';

import { twitter } from './twitter';

describe('twitter plugin', () => {
  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="twitter:title" content="Twitter Test Title">
        <meta name="twitter:description" content="Twitter Test Description">
        <meta name="twitter:image" content="http://example.com/image.jpg">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@testsite">
        <meta name="twitter:creator" content="@testuser">
      </head>
    </html>
  `;

  it('extracts all available Twitter card metadata', async () => {
    const result = await twitter(fullHTML, { secureImages: true });

    expect(result.twitter).toMatchObject({
      title: 'Twitter Test Title',
      description: 'Twitter Test Description',
      image: 'https://example.com/image.jpg',
      card: 'summary_large_image',
      site: '@testsite',
      creator: '@testuser',
    });
  });

  it('handles missing Twitter metadata', async () => {
    const html = '<html><head></head></html>';
    const result = await twitter(html, {});

    expect(result.twitter).toMatchObject({
      title: '',
    });
  });

  it('truncates description based on maxDescriptionLength', async () => {
    const longDescription = 'a'.repeat(200);
    const html = `
      <html>
        <head>
          <meta name="twitter:description" content="${longDescription}">
        </head>
      </html>
    `;

    const result = await twitter(html, { maxDescriptionLength: 100 });
    expect(result.twitter?.description?.length).toBeLessThanOrEqual(103); // 100 + '...'
  });

  it('handles secure image conversion', async () => {
    const html = `
      <html>
        <head>
          <meta name="twitter:image" content="http://example.com/image.jpg">
        </head>
      </html>
    `;

    const secureResult = await twitter(html, { secureImages: true });
    expect(secureResult.twitter?.image).toBe('https://example.com/image.jpg');

    const insecureResult = await twitter(html, { secureImages: false });
    expect(insecureResult.twitter?.image).toBe('http://example.com/image.jpg');
  });

  it('handles malformed Twitter tags gracefully', async () => {
    const html = `
      <html>
        <head>
          <meta name="twitter:title" content="">
          <meta name="twitter:description">
          <meta name="twitter:invalid" content="test">
        </head>
      </html>
    `;

    const result = await twitter(html, {});
    expect(result.twitter?.title).toBe('');
    expect(result.twitter?.description).toBeUndefined();
  });
});
