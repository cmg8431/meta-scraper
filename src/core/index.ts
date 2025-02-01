import fetch from 'node-fetch';

import { Plugin, ScraperOptions, Metadata, BaseMetadata } from '@/types';
import { toNormalizedText, toTruncatedText } from '@/utils';

/**
 * Custom error class for scraper-specific errors
 * Extends the built-in Error class to provide better error handling
 * for metadata scraping operations
 */
export class ScraperError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'ScraperError';
  }
}

/**
 * Fetches HTML content with configurable request options.
 * Handles both direct HTML input and URL fetching with timeout and error handling.
 *
 * @param {string} input - URL or HTML content
 * @param {Partial<ScraperOptions>} options - Configuration options for the request
 * @returns {Promise<string>} The HTML content
 * @throws {ScraperError} When fetching fails or times out
 */
async function getHtmlContent(
  input: string,
  options: Partial<ScraperOptions>,
): Promise<string> {
  const isUrl = input.startsWith('http://') || input.startsWith('https://');
  if (!isUrl) {
    return input;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || 30000,
    );

    const response = await fetch(input, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent':
          options.userAgent || 'Mozilla/5.0 (compatible; MetaScraper/1.0;)',
      },
      redirect: options.followRedirects ? 'follow' : 'manual',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('text/html')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    return response.text();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ScraperError(`Request timeout after ${options.timeout}ms`);
    }
    throw new ScraperError(
      `Failed to fetch URL: ${input}`,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
}

/**
 * Creates initial metadata object with empty default values.
 * Includes raw metadata if extractRaw option is enabled.
 *
 * @param {Partial<ScraperOptions>} options - Scraper configuration options
 * @returns {Partial<Metadata>} Initial metadata structure
 */
function createInitialMetadata(
  options: Partial<ScraperOptions>,
): Partial<Metadata> {
  return {
    base: {} as BaseMetadata,
    openGraph: {},
    twitter: {},
    jsonLd: [],
    ...(options.extractRaw ? { raw: {} } : {}),
  };
}

/**
 * Processes metadata text fields according to options.
 * Handles title and description normalization, truncation,
 * and secure image URL conversion.
 *
 * @param {Partial<Metadata>} metadata - The metadata to process
 * @param {Partial<ScraperOptions>} options - Processing options
 */
function processMetadata(
  metadata: Partial<Metadata>,
  options: Partial<ScraperOptions>,
): void {
  const { base } = metadata;
  if (!base) {
    return;
  }

  if (base.title) {
    base.title = toNormalizedText(base.title);
  }

  if (base.description && options.maxDescriptionLength) {
    base.description = toTruncatedText(
      toNormalizedText(base.description),
      options.maxDescriptionLength,
    );
  }

  if (options.secureImages && base.image?.startsWith('http:')) {
    base.image = base.image.replace('http:', 'https:');
  }
}

/**
 * Executes plugins in parallel and merges their results.
 *
 * @param {string} html - The HTML content to process
 * @param {Plugin[]} plugins - Array of metadata extraction plugins
 * @param {ScraperOptions} options - Configuration options
 * @returns {Promise<Partial<Metadata>>} Combined metadata from all plugins
 */
async function executePlugins(
  html: string,
  plugins: Plugin[],
  options: ScraperOptions,
): Promise<Partial<Metadata>> {
  const results = await Promise.all(
    plugins.map((plugin) => plugin(html, options)),
  );

  return results.reduce<Partial<Metadata>>(
    (acc, curr) => ({
      ...acc,
      ...curr,
    }),
    createInitialMetadata(options),
  );
}

/**
 * Creates a metadata scraper function that extracts metadata using provided plugins.
 *
 * Features:
 * - Supports both URLs and direct HTML input
 * - Configurable timeout, user agent, and redirect handling
 * - Image URL security conversion
 * - Description length limiting
 * - Raw metadata extraction
 *
 * @param {Plugin[]} plugins - Array of metadata extraction plugins
 * @returns {(input: string, options?: Partial<ScraperOptions>) => Promise<Metadata>}
 * @throws {ScraperError} When metadata extraction fails
 *
 * @example
 * ```ts
 * const scraper = createScraper([jsonLd, openGraph]);
 * const metadata = await scraper('https://example.com', {
 *   maxDescriptionLength: 150,
 *   timeout: 5000,
 *   secureImages: true
 * });
 * ```
 */
export function createScraper(plugins: Plugin[] = []) {
  return async (
    input: string,
    options: Partial<ScraperOptions> = {},
  ): Promise<Metadata> => {
    const defaultOptions: ScraperOptions = {
      maxDescriptionLength: 200,
      secureImages: true,
      timeout: 30000,
      userAgent: 'Mozilla/5.0 (compatible; MetaScraper/1.0;)',
      followRedirects: true,
      validateUrls: true,
      extractRaw: false,
    };

    const mergedOptions = { ...defaultOptions, ...options };

    try {
      if (mergedOptions.validateUrls && input.startsWith('http')) {
        const url = new URL(input);
        if (!url.protocol.startsWith('http')) {
          throw new Error('Only HTTP(S) protocols are supported');
        }
      }

      const html = await getHtmlContent(input, mergedOptions);
      const metadata = await executePlugins(html, plugins, mergedOptions);
      processMetadata(metadata, mergedOptions);

      return metadata as Metadata;
    } catch (error) {
      if (error instanceof ScraperError) {
        throw error;
      }
      throw new ScraperError(
        'Failed to scrape metadata',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
}
