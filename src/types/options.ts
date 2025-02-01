export interface ScraperOptions {
  maxDescriptionLength: number;
  secureImages: boolean;
  timeout: number;
  userAgent?: string;
  followRedirects?: boolean;
  validateUrls?: boolean;
  extractRaw?: boolean;
}
