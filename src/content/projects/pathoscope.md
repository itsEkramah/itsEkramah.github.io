---
title: PathoScope AI — a genomics workflow prototype
shortTitle: PathoScope AI
summary: A team-built research software prototype connecting viral sequence workflows, expression exploration and literature retrieval.
kind: Team prototype
methods:
  [
    Backend workflow execution and job tracking,
    FASTQ integration and database connectivity,
    PubMed retrieval and report generation,
  ]
resultSummary: 'A working course prototype connects research workflows and literature retrieval. Some fallbacks use simulated outputs; it is not a validated diagnostic pipeline.'
period: Mar–Aug 2026
order: 3
featured: true
tools: [Python, FastAPI, PostgreSQL, NCBI E-Utilities]
domains: [Research software, Functional genomics]
repoUrl: https://github.com/itsEkramah/FUNCTIONAL-GENOMICS-PROJECT
demoUrl: https://www.youtube.com/watch?v=fvNg29fGX2Q
verifiedEvidence:
  - label: Team source code and prototype scope
    url: https://github.com/itsEkramah/FUNCTIONAL-GENOMICS-PROJECT
limitations: A course prototype, not a validated diagnostic pipeline. Some fallbacks use simulated annotations or a substitute reference sequence. AI literature summaries need human review.
---

## Project context

PathoScope AI was a team project for the Functional Genomics course. It brings viral sequence analysis and exploratory gene-expression workflows into a web application, with a Next.js interface and Python backend.

## My contribution

My work focused on backend workflow execution, FASTQ integration, job-status tracking, database connectivity, PubMed retrieval and report generation.

## Implementation

The team implementation includes six-frame ORF scanning and wrappers for FastQC, fastp, SPAdes, DIAMOND and HMMER. An exploratory expression module uses log-CPM, Welch's tests and Benjamini–Hochberg correction.

## What the prototype demonstrates

The project connects workflow steps and external tools through an application interface. The repository and linked video show the prototype's scope. The implementation has not been containerised, and tool availability affects which execution paths can run.

## Boundaries

Fallback paths can generate simulated annotations or substitute reference sequence. Those outputs must not be interpreted as measured biological findings. The prototype does not support a claim of clinical readiness.
