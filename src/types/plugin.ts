import { Metadata } from './metadata';
import { ScraperOptions } from './options';

export type Plugin = (
  html: string,
  options: ScraperOptions,
) => Promise<Partial<Metadata>>;
