// Verified against the existing public CV and project records. Shared by
// Portfolio, About and the compact homepage background preview.
export const profile = {
  name: 'Muhammad Ekramah',
  qualification: 'BS Bioinformatics graduate, Quaid-i-Azam University',
  summary:
    'I’m a Bioinformatics graduate from Quaid-i-Azam University, Islamabad. My research interests centre on microbial genomics, antimicrobial resistance and transcriptomics, with a focus on reproducible analysis. I use Python and R to explore data, create visualisations and build practical tools, alongside developing software and web applications. I also work on technical SEO and content optimisation. I’m looking to deepen my research and computational skills through postgraduate study in bioinformatics and data science.',
  education: {
    degree: 'BS in Bioinformatics',
    institution: 'Quaid-i-Azam University, Islamabad',
    institutionUrl: 'https://qau.edu.pk/',
    centre: 'National Centre for Bioinformatics',
    centreUrl: 'https://ncb.mdrip.com.pk/',
    period: 'September 2022–September 2026',
    shortPeriod: '2022–2026',
    cgpa: '3.40 / 4.00',
    coursework: [
      'Probability and Biostatistics',
      'Bioinformatics Computing',
      'Genomics',
      'Functional Genomics',
      'Systems Biology',
      'Artificial Intelligence',
      'Data Structures and Algorithms',
      'Modelling and Simulation',
      'Database Management Systems',
    ],
  },
  experience: [
    {
      organization: 'National Institutes of Health (NIH)',
      website: 'https://www.nih.org.pk/',
      location: 'Islamabad, Pakistan',
      position: 'Research Intern',
      period: 'Jul–Aug 2025',
      responsibilities: [
        'Used R and the AMR package to analyse antimicrobial-resistance surveillance data, including wastewater data, and summarise susceptibility patterns.',
        'Gained exposure to PCR-based diagnostics, Oxford Nanopore MinION sequencing and bulk RNA-seq workflows.',
      ],
      tools: ['R', 'AMR package'],
    },
    {
      organization: 'Digital Empowerment Network',
      website: undefined,
      location: 'Remote',
      position: 'Python Developer Intern',
      period: 'Jul–Sep 2024',
      responsibilities: [
        'Worked on Python backend services and REST APIs using FastAPI and PostgreSQL.',
        'Automated data cleaning and processing with Pandas and NumPy, and developed visualisation utilities for GitHub Classroom analytics as part of a team.',
      ],
      tools: ['Python', 'FastAPI', 'PostgreSQL', 'Pandas', 'NumPy'],
    },
  ],
  skills: [
    {
      category: 'Programming & Backend',
      items: 'Python, R, Bash, FastAPI and REST APIs',
    },
    {
      category: 'Bioinformatics & Genomics',
      items:
        'Genomic unitigs, bulk RNA-seq, BLAST, PyDESeq2, DESeq2, FastQC, fastp, HISAT2 and featureCounts',
    },
    {
      category: 'Data Science & Statistics',
      items:
        'Pandas, NumPy, PCA, bootstrap intervals and multiple-testing correction',
    },
    {
      category: 'Machine Learning',
      items:
        'scikit-learn, logistic regression, random forests, feature selection and grouped cross-validation',
    },
    {
      category: 'Databases & Development Tools',
      items: 'PostgreSQL, SQL, SQLite, Git/GitHub, Linux and Jupyter',
    },
    {
      category: 'Scientific Analysis & Visualization',
      items:
        'Differential-expression analysis, negative-binomial modelling, PCA plots, sample-distance heatmaps and gene-expression plots',
    },
  ],
} as const;
