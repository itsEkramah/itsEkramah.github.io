import { getCollection } from 'astro:content';
export const demoMode = import.meta.env.MODE === 'demo';
export const reviewMode =
  import.meta.env.DEV || import.meta.env.MODE === 'review' || demoMode;
export async function visibleArticles() {
  return (
    await getCollection(
      'articles',
      ({ data }) => !data.draft || (reviewMode && (!demoMode || data.demo)),
    )
  ).sort((a, b) => +(b.data.publishedAt || 0) - +(a.data.publishedAt || 0));
}
export async function featuredArticles() {
  const articles = await visibleArticles();
  const published = articles.filter((article) => !article.data.draft);
  if (published.length)
    return published
      .sort(
        (a, b) =>
          Number(b.data.featured) - Number(a.data.featured) ||
          (a.data.featured && b.data.featured
            ? a.data.featureOrder - b.data.featureOrder
            : 0) ||
          +b.data.publishedAt! - +a.data.publishedAt!,
      )
      .slice(0, 3);
  return reviewMode
    ? articles
        .filter((article) => article.data.demo)
        .sort((a, b) => a.data.featureOrder - b.data.featureOrder)
        .slice(0, 3)
    : [];
}
