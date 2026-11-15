import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './lib/taxonomy';

const httpsUrl = z
  .url()
  .refine((url) => url.startsWith('https://'), 'Use HTTPS evidence links');
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.enum(categoryIds),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
      format: z.enum([
        'tutorial',
        'research-note',
        'essay',
        'case-study',
        'review',
      ]),
      tags: z.array(z.string()).max(5).default([]),
      draft: z.boolean().default(true),
      reviewed: z.boolean().default(false),
      publishedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      references: z
        .array(z.object({ label: z.string(), url: httpsUrl }))
        .default([]),
      relatedProjectIds: z.array(reference('projects')).default([]),
    })
    .superRefine((data, ctx) => {
      if (!data.draft && (!data.reviewed || !data.publishedAt))
        ctx.addIssue({
          code: 'custom',
          message:
            'Published articles need owner review and a real publication date',
        });
      if (data.publishedAt && data.publishedAt > new Date())
        ctx.addIssue({
          code: 'custom',
          message: 'Publication dates cannot be in the future',
        });
      if (
        data.updatedAt &&
        (data.updatedAt > new Date() ||
          (data.publishedAt && data.updatedAt < data.publishedAt))
      )
        ctx.addIssue({
          code: 'custom',
          message: 'An update date must be between publication and today',
        });
    }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string(),
      summary: z.string(),
      kind: z.enum([
        'Academic project',
        'Team prototype',
        'Software demonstration',
      ]),
      period: z.string().optional(),
      order: z.number(),
      featured: z.boolean().default(false),
      tools: z.array(z.string()),
      domains: z.array(z.string()),
      repoUrl: httpsUrl,
      demoUrl: httpsUrl.optional(),
      verifiedEvidence: z
        .array(z.object({ label: z.string(), url: httpsUrl }))
        .min(1),
      limitations: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCaption: z.string().optional(),
    }),
});
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    audience: z.string(),
    deliverables: z.array(z.string()),
    boundaries: z.array(z.string()),
    relatedProjectIds: z.array(reference('projects')).min(1),
  }),
});
export const collections = { articles, projects, services };
