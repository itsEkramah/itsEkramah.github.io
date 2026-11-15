---
title: Data Quality Workbench
shortTitle: Data Quality Workbench
summary: A local CSV-cleaning demonstration with explicit rules, rejected-row inspection and downloadable audit outputs.
kind: Software demonstration
methods:
  [
    Explicit CSV validation rules,
    Rejected-row review,
    Downloadable audit outputs,
  ]
resultSummary: 'Local data-cleaning application with public engine and API validation records; no client-delivery outcomes are claimed.'
order: 4
tools: [Python, FastAPI, SQLite, JavaScript]
domains: [Data quality, Web applications]
repoUrl: https://github.com/itsEkramah/data-quality-workbench
verifiedEvidence:
  - label: Source, setup and examples
    url: https://github.com/itsEkramah/data-quality-workbench
  - label: Documented validation record
    url: https://github.com/itsEkramah/data-quality-workbench/blob/main/VALIDATION.md
limitations: An AI-assisted portfolio demonstration, not a client-delivery case study. Dataset-specific rules and suitability need review before real use.
---

## The problem

Spreadsheet preparation is difficult to review when edits are implicit. This demonstration makes cleaning rules and rejected rows inspectable.

## Implementation and outputs

The local application uses Python, FastAPI, SQLite and a browser interface. It processes CSV data under explicit rules and provides source data, checked data and an audit report for download.

## Evidence and boundaries

The repository contains setup instructions and engine/API validation records. This is an AI-assisted portfolio demonstration. It is presented as evidence of workflow design and implementation, with no claimed client metrics or production deployment.
