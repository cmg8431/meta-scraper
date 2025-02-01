import { Plugin, ScraperOptions, Metadata, BaseMetadata } from '@/types';
import { toNormalizedText, toTruncatedText } from '@/utils';

/**
 * Post-processes text metadata fields like title and description.
 * Applies text normalization and truncation based on options.
 */
const processTextMetadata = (
  metadata: Partial<Metadata>,
  options: Partial<ScraperOptions>,
): void => {
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
};

/**
 * Creates initial metadata object with empty default values.
 */
const createInitialMetadata = (): Partial<Metadata> => ({
  base: {} as BaseMetadata,
  openGraph: {},
  twitter: {},
  jsonLd: [],
});

/**
 * Custom error class for scraper-specific errors
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
 * Creates a metadata scraper function that uses the provided plugins.
 *
 * The scraper runs all plugins in parallel and merges their results.
 * Handles basic post-processing like text normalization and truncation.
 *
 * @param {Plugin[]} plugins - Array of metadata extraction plugins
 * @returns {(html: string, options?: Partial<ScraperOptions>) => Promise<Metadata>}
 * @throws {ScraperError} When metadata extraction fails
 */
export const createScraper = (plugins: Plugin[] = []) => {
  return async (
    html: string,
    options: Partial<ScraperOptions> = {},
  ): Promise<Metadata> => {
    try {
      const results = await Promise.all(
        plugins.map((plugin) => plugin(html, options as ScraperOptions)),
      );

      const metadata = results.reduce<Partial<Metadata>>(
        (acc, curr) => ({
          ...acc,
          ...curr,
        }),
        createInitialMetadata(),
      );

      processTextMetadata(metadata, options);

      return metadata as Metadata;
    } catch (error) {
      throw new ScraperError(
        'Failed to scrape metadata',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
