---
title: What grouped validation can—and cannot—tell us about genomic AMR prediction
description: A research note on duplicate genomic profiles, in-fold feature selection and the remaining limits of an internal AMR evaluation.
category: bioinformatics
format: research-note
tags: [AMR, Python, Machine Learning]
draft: true
reviewed: false
relatedProjectIds: [genomic-amr]
references:
  - label: Project notebook, data audit and scientific boundaries
    url: https://github.com/itsEkramah/N.Gonorrhoeae-AMR-prediction-ML
  - label: Machine-readable bootstrap estimates
    url: https://github.com/itsEkramah/N.Gonorrhoeae-AMR-prediction-ML/blob/main/results/tables/bootstrap_confidence_intervals.csv
---

Strong internal scores are easier to interpret when we know what was kept apart during evaluation. In my genomic AMR project, grouping identical unitig profiles prevents one specific source of overlap. It does not resolve every reason a model might look better internally than it would on new data.

## Start with the unit of separation

The project matches antibiotic-specific binary genomic unitig matrices with labelled _Neisseria gonorrhoeae_ isolates. Some isolates have identical complete feature profiles. If those profiles appear in both training and test data, the test does not provide the intended separation for those observations.

The revised analysis keeps identical profiles in the same cross-validation fold. It uses five folds and compares logistic regression and random forest with a prevalence baseline. This design addresses exact profile overlap; it should not be described as separating all related bacterial lineages.

## Keep learned feature selection inside training

Variance filtering and chi-square feature selection are fitted within each training fold. That keeps this stage of selection from using the held-out fold. The repository's executed notebook is the source of truth for the implementation and software environment; this note does not introduce a new experiment.

An audit of a validation workflow should ask:

1. Which observations must stay together?
2. Which transformations learn from the data?
3. Were those transformations fitted only on training observations?
4. Was any selection already performed before the supplied data arrived?

The fourth question is particularly important here.

## The upstream limit remains

The supplied unitig matrices were already GWAS-filtered. Putting subsequent feature selection inside training folds cannot undo that earlier selection. Upstream selection leakage cannot be excluded, so the internal results may be optimistic.

The reported logistic-regression balanced accuracies are 0.949 for azithromycin and 0.969 for ciprofloxacin. These are internal out-of-fold estimates from 3,478 and 3,088 labelled isolates respectively. They are neither clinical validation nor a guarantee of performance on an independent dataset.

## Uncertainty is a different question

The project uses 500 profile-group bootstrap resamples to describe sampling variability. Those intervals do not correct upstream feature-selection bias.

The geographic comparisons also use the same out-of-fold predictions. They are descriptive subgroup checks, not leave-one-continent-out experiments. Their role is to reveal variation worth investigating, rather than establish transfer to an unseen population.

## What would strengthen the evidence?

A stronger next evaluation would use independent data and include the upstream discovery process within a defensible validation design. Until then, grouped validation is a useful control with a specific scope. The most informative report states both that control and the limits it leaves unresolved.
