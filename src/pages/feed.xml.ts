import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { articleUrl, site } from '../lib/site';
const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
export const GET: APIRoute = async () => {
  const articles = (
    await getCollection('articles', ({ data }) => !data.draft)
  ).sort((a, b) => +b.data.publishedAt! - +a.data.publishedAt!);
  const items = articles
    .map(
      (a) =>
        `<item><title>${escape(a.data.title)}</title><link>${site.url}${articleUrl(a)}</link><guid isPermaLink="true">${site.url}${articleUrl(a)}</guid><description>${escape(a.data.description)}</description><pubDate>${a.data.publishedAt!.toUTCString()}</pubDate></item>`,
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Muhammad Ekramah — Writing</title><link>${site.url}/writing/</link><description>Research notes and practical methods.</description><language>en</language>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
};
