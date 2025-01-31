import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/cmg8431/meta-scraper',
  },
  docsRepositoryBase: 'https://github.com/cmg8431/meta-scraper/tree/main/docs',
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – meta-scrapper',
      };
    }
  },
  logo: function useLogo() {
    const isDarkMode = useIsDarkMode();

    return (
      <Image
        src={isDarkMode ? '/logo-white.png' : '/logo.png'}
        alt="logo"
        width={120}
        height={48}
      />
    );
  },
  head: function useHead() {
    const { title } = useConfig();
    const { route } = useRouter();

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={'/og.png'} />
        <meta
          name="og:title"
          content={title ? title + ' – meta-scrapper' : 'meta-scrapper'}
        />
        <meta name="og:image" content={'/og.png'} />
        <meta name="apple-mobile-web-app-title" content="Nextra" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: function useText() {
      const isDarkMode = useIsDarkMode();

      return (
        <div className="flex w-full flex-col items-center sm:items-start">
          <div>
            <a
              className="flex items-center gap-1 text-current"
              target="_blank"
              rel="noopener noreferrer"
              title="github"
              href="https://github.com/cmg8431"
            >
              <span>Powered by</span> @cmg8431
            </a>
          </div>
          <p className="mt-6 text-xs">
            © {new Date().getFullYear()} The Meta-scraper Project.
          </p>
        </div>
      );
    },
  },
  toc: {
    backToTop: true,
  },
};

export default config;
