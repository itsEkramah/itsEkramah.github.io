import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import wrapTables from './scripts/markdown-tables.mjs';

const math = [rehypeKatex, { trust: false, strict: 'error', output: 'mathml' }];
const reviewBuild =
  process.argv.includes('review') || process.argv.includes('demo');
const safeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes.code || []),
      ['className', /^language-./, 'math-inline', 'math-display'],
    ],
    span: ['className'],
    pre: ['tabIndex', 'className', 'dataLanguage'],
  },
};

export default defineConfig({
  site: 'https://itsekramah.github.io',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  // Inline small page styles to avoid an extra render-blocking request;
  // the larger shared stylesheet remains a cacheable external resource.
  vite: { build: { assetsInlineLimit: 8192 } },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
      ],
    },
  },
  integrations: [
    mdx({
      processor: unified({
        remarkPlugins: [remarkMath],
        rehypePlugins: [math, wrapTables],
      }),
    }),
    sitemap({
      filter: (url) =>
        !url.includes('/404') &&
        !url.includes('/work/') &&
        (!reviewBuild || !url.includes('/writing/')),
    }),
  ],
  devToolbar: { enabled: false },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeSanitize, safeSchema], math, wrapTables],
    }),
    syntaxHighlight: 'prism',
  },
});
