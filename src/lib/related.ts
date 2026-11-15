import type { CollectionEntry } from 'astro:content';
export function relatedArticles(
  current: CollectionEntry<'articles'>,
  articles: CollectionEntry<'articles'>[],
) {
  return articles
    .filter((a) => a.id !== current.id && !a.data.draft)
    .map((article) => ({
      article,
      score:
        (article.data.category === current.data.category ? 5 : 0) +
        article.data.tags.filter((t) => current.data.tags.includes(t)).length,
    }))
    .filter((a) => a.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        +(b.article.data.publishedAt || 0) - +(a.article.data.publishedAt || 0),
    )
    .slice(0, 3)
    .map((a) => a.article);
}
