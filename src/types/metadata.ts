export type BaseMetadata = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export type ImageMetadata = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  type?: string;
};

export type OpenGraphMetadata = BaseMetadata & {
  type?: 'website' | 'article' | 'profile' | 'book' | 'music' | 'video';
  siteName?: string;
  locale?: string;
  images?: ImageMetadata[];
  videos?: Array<{
    url: string;
    type?: string;
    width?: number;
    height?: number;
  }>;
};

export type TwitterMetadata = BaseMetadata & {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  images?: ImageMetadata[];
};

export type JsonLdType =
  | 'Article'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'Organization'
  | 'Person'
  | 'Product'
  | 'WebSite'
  | string;

export type JsonLdMetadata = {
  '@context': 'https://schema.org';
  '@type': JsonLdType;
  [key: string]: unknown;
};

export type RawMetadata = {
  title?: string;
  meta?: Record<string, string>;
  links?: Array<{
    rel: string;
    href: string;
    [key: string]: string;
  }>;
};

export type AlternatesMetadata = {
  canonical?: string;
  languages?: Record<string, string>;
  media?: Record<string, string>;
  types?: Record<string, string>;
};

export type BaseExtendedMetadata = BaseMetadata & {
  favicon?: string;
  canonicalUrl?: string;
  keywords?: string[];
  author?: string;
  themeColor?: string;
  viewport?: string;
  robots?: string;
  alternates?: AlternatesMetadata;
};

export type Metadata = {
  base: BaseExtendedMetadata;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  jsonLd?: JsonLdMetadata[];
  raw?: RawMetadata;
  custom?: Record<string, unknown>;
};

export type MetadataTransformers = {
  title?: (title: string) => string;
  description?: (description: string) => string;
  image?: (image: string | ImageMetadata) => ImageMetadata;
};

export type MetadataOptions = {
  validate?: boolean;
  strict?: boolean;
  defaults?: Partial<Metadata>;
  transformers?: MetadataTransformers;
};

export type ValidateMetadata<T extends Metadata> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};
