---
title: Antimicrobial-resistance prediction in Neisseria gonorrhoeae
shortTitle: Genomic AMR prediction
summary: Evaluating genomic predictors of resistance, with grouped validation and an explicit account of what internal results can establish.
kind: Academic project
period: 2025–2026
order: 1
featured: true
tools: [Python, Pandas, scikit-learn]
domains: [Microbial genomics, Machine learning]
repoUrl: https://github.com/itsEkramah/N.Gonorrhoeae-AMR-prediction-ML
verifiedEvidence:
  - label: Analysis notebook, methods and scientific boundaries
    url: https://github.com/itsEkramah/N.Gonorrhoeae-AMR-prediction-ML
  - label: Bootstrap interval estimates
    url: https://github.com/itsEkramah/N.Gonorrhoeae-AMR-prediction-ML/blob/main/results/tables/bootstrap_confidence_intervals.csv
limitations: Internal cross-validation only. Supplied features were already GWAS-filtered, so upstream selection leakage cannot be excluded. These results do not establish clinical utility.
image: ../../assets/amr-robustness.png
imageAlt: Profile-group bootstrap intervals and descriptive continent-level balanced accuracy for the AMR models.
imageCaption: Original project figure. Five hundred profile-group bootstrap resamples and descriptive geographic subgroups from the same out-of-fold predictions; not leave-one-continent-out validation.
---

## The question

Can genomic unitig features distinguish resistant from susceptible _Neisseria gonorrhoeae_ isolates, and how sensitive are the results to evaluation choices?

This Bioinformatics Computing II course project examined azithromycin and ciprofloxacin resistance. The repository preserves the original submission alongside a reproducibility-focused revision.

## Data and approach

I reviewed 3,786 metadata records and matched labelled isolates to antibiotic-specific genomic matrices. Identical complete unitig profiles stay together in five-fold cross-validation. Variance filtering and chi-square feature selection are fitted inside each training fold.

I compared logistic regression and random forest models with a prevalence baseline, then examined sampling variability with profile-group bootstrap intervals and descriptive geographic subgroups.

## Results in context

The repository reports the following internal out-of-fold estimates for class-weighted logistic regression:

| Antibiotic    | Labelled isolates | Balanced accuracy |
| ------------- | ----------------: | ----------------: |
| Azithromycin  |             3,478 |             0.949 |
| Ciprofloxacin |             3,088 |             0.969 |

These figures describe this internal evaluation. They are not independent validation results. I did not train a cefixime classifier because only five isolates were labelled resistant.

## Biological interpretation

BLAST matches for selected unitigs included regions associated with _penA_ and _gyrA_. These alignments add biological context; they do not establish that a sequence causes resistance.

## What I would test next

Independent data and validation that includes upstream feature discovery would provide a stronger test of generalisation. Geographic subgroup differences also warrant evaluation on held-out populations rather than treating descriptive subgroups as external validation.
