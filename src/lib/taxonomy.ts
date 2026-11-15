export const categories = {
  bioinformatics: {
    label: 'Bioinformatics & Genomics',
    description: 'Genomic data, RNA-seq and careful model evaluation.',
  },
  'medicine-pharma': {
    label: 'Medicine & Pharma',
    description: 'AMR and biomedical data methods, with research boundaries.',
  },
  'data-analytics': {
    label: 'Data Science & Analytics',
    description: 'Python, R, statistics and reproducible reporting.',
  },
  'software-web': {
    label: 'Software & Web Development',
    description: 'Research tools, APIs and maintainable websites.',
  },
  'business-seo': {
    label: 'Business & SEO',
    description: 'Technical site checks and documented search experiments.',
  },
} as const;
export type Category = keyof typeof categories;
export const categoryIds = Object.keys(categories) as [Category, ...Category[]];
