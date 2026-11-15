---
title: Data preparation & validation
summary: Turn inconsistent CSV files into checked datasets with an inspectable record of changes.
order: 1
audience: Researchers and small teams preparing tabular data for analysis.
deliverables:
  [
    Checked files and rejected-row reports,
    A change summary and explicit validation rules,
    A reusable Python script where appropriate,
  ]
boundaries:
  [
    Rules and sample data are agreed before work begins.,
    No confidential or patient-identifiable data through email.,
    Data cleaning does not establish scientific validity.,
  ]
relatedProjectIds: [data-quality-workbench]
---

Start with a small, anonymised sample and the output you need. We can define duplicate checks, missing-value rules, consistency checks and transformations before processing the full dataset.

Original files stay intact. The aim is a preparation step that another person can inspect and repeat.
