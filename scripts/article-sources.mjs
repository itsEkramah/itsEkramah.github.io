import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { filesIn } from './html.mjs';
export async function articleSources() {
  return Promise.all(
    (await filesIn('src/content/articles'))
      .filter((file) => /\.mdx?$/.test(file))
      .map(async (file) => {
        const { frontmatter: data } = parseFrontmatter(
          await readFile(file, 'utf8'),
        );
        const id = data.slug || path.basename(file).replace(/\.mdx?$/, '');
        return { id, data, url: `/writing/${data.category}/${id}/` };
      }),
  );
}
