import { describe, expect, it } from 'vitest';

import { jsonLd } from './json-ld';

describe('jsonLd', () => {
  it('retrieves single json-ld if html has it', async () => {
    const html = `
     <!DOCTYPE html>
     <html>
       <head>
         <script type="application/ld+json">
           {
             "@context": "https://schema.org",
             "@type": "Article",
             "headline": "Test Article",
             "datePublished": "2024-02-02"
           }
         </script>
       </head>
       <body></body>
     </html>
   `;

    const result = await jsonLd(html);
    expect(result.jsonLd.length).toBe(1);
    expect(result.jsonLd[0]['@type']).toBe('Article');
    expect(result.jsonLd[0].headline).toBe('Test Article');
    expect(result.jsonLd[0].datePublished).toBe('2024-02-02');
  });

  it('retrieves multiple json-ld scripts', async () => {
    const html = `
     <!DOCTYPE html>
     <html>
       <head>
         <script type="application/ld+json">
           {
             "@context": "https://schema.org",
             "@type": "Event",
             "name": "Test Event"
           }
         </script>
         <script type="application/ld+json">
           {
             "@context": "https://schema.org",
             "@type": "BreadcrumbList",
             "itemListElement": []
           }
         </script>
       </head>
       <body></body>
     </html>
   `;

    const result = await jsonLd(html);
    expect(result.jsonLd.length).toBe(2);
    expect(result.jsonLd[0]['@type']).toBe('Event');
    expect(result.jsonLd[1]['@type']).toBe('BreadcrumbList');
  });

  it('handles json-ld with @graph syntax', async () => {
    const html = `
     <!DOCTYPE html>
     <html>
       <head>
         <script type="application/ld+json">
           {
             "@context": "https://schema.org",
             "@graph": [
               {
                 "@type": "Organization",
                 "name": "Test Org"
               },
               {
                 "@type": "Person",
                 "name": "John Doe"
               }
             ]
           }
         </script>
       </head>
       <body></body>
     </html>
   `;

    const result = await jsonLd(html);
    expect(result.jsonLd.length).toBe(2);
    expect(result.jsonLd[0]['@type']).toBe('Organization');
    expect(result.jsonLd[1]['@type']).toBe('Person');
  });

  it('returns empty array for invalid json-ld', async () => {
    const html = `
     <!DOCTYPE html>
     <html>
       <head>
         <script type="application/ld+json">
           {invalid json}
         </script>
       </head>
       <body></body>
     </html>
   `;

    const result = await jsonLd(html);
    expect(result.jsonLd).toEqual([]);
  });

  it('handles empty html without json-ld', async () => {
    const html = `
     <!DOCTYPE html>
     <html>
       <head></head>
       <body></body>
     </html>
   `;

    const result = await jsonLd(html);
    expect(result.jsonLd).toEqual([]);
  });
});
