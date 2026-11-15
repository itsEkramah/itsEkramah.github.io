import { getCollection } from 'astro:content';
export const reviewMode =
  import.meta.env.DEV || import.meta.env.MODE === 'review';
export async function visibleArticles() {
  return (
    await getCollection('articles', ({ data }) => !data.draft || reviewMode)
  ).sort((a, b) => +(b.data.publishedAt || 0) - +(a.data.publishedAt || 0));
}
