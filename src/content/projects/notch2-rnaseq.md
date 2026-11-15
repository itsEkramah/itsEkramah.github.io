---
title: RNA-seq analysis of Notch2 knockout neural stem cells
shortTitle: Reading an RNA-seq experiment
summary: A public-data reanalysis that keeps biological replication, sample structure and the limits of differential expression in view.
kind: Academic project
period: 2025–2026
order: 2
featured: true
tools: [Python, PyDESeq2, R, Bash]
domains: [Transcriptomics, Exploratory analysis]
repoUrl: https://github.com/itsEkramah/RNA-Seq-DE-Mouse-Hippocampus
verifiedEvidence:
  - label: Reproducible analysis and source dataset
    url: https://github.com/itsEkramah/RNA-Seq-DE-Mouse-Hippocampus
  - label: Machine-readable analysis summary
    url: https://github.com/itsEkramah/RNA-Seq-DE-Mouse-Hippocampus/blob/main/results/summary.json
limitations: Three biological samples per condition, with WT3 differing from the other samples. Differential expression alone does not establish direct regulation by Notch2.
image: ../../assets/rnaseq-structure.png
imageAlt: PCA and sample-distance heatmap for six biological samples, showing separation of WT3.
imageCaption: Original project figure, reproduced under the repository MIT licence. PCA of the 500 most variable genes after blind variance stabilisation; sample distances use retained VST genes. PC1 explains 61.2% and PC2 18.3% of variance.
---

## The question

How does gene expression differ between Notch2 conditional-knockout and wild-type mouse hippocampal neural stem cells in the public GSE116773 dataset?

## Respecting the experimental unit

The 24 technical count files represent six biological RNA preparations, with three biological samples per condition. I combined technical files at that biological level rather than treating them as independent replicates.

## Analysis

I used the study-provided GRCm38 count data, PyDESeq2, Wald tests and Benjamini–Hochberg correction. PCA, sample-distance heatmaps and expression plots helped inspect the structure of the data.

Among 21,531 retained genes, 121 met an adjusted p-value threshold of 0.05: 77 had higher and 44 lower expression in knockout samples. None of eight predefined candidate genes, including _Id4_, passed that threshold.

## Interpretation and limits

WT3 differed noticeably from the other samples. With three biological replicates per condition, that structure matters when interpreting the differential expression results.

The repository also contains GRCm39 read-processing scripts, but their original count matrix is unavailable. The reported results use the GRCm38 count data. Neither statistical significance nor the observed expression change by itself establishes direct Notch2 regulation.
