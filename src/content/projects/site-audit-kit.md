---
title: Site Audit Kit
shortTitle: Site Audit Kit
summary: A Python command-line tool that turns a local HTML snapshot into evidence-based technical reports.
kind: Software demonstration
order: 6
tools: [Python standard library, HTML, JSON, Markdown]
domains: [Technical HTML checks, Reporting]
repoUrl: https://github.com/itsEkramah/site-audit-kit
verifiedEvidence:
  - label: Source and check definitions
    url: https://github.com/itsEkramah/site-audit-kit
  - label: Example audit report
    url: https://github.com/itsEkramah/site-audit-kit/blob/main/reports/before.md
limitations: An AI-assisted offline demonstration. It checks supplied HTML; it does not measure live indexing, search rankings, traffic or AI citations.
---

## The problem

A technical finding is useful when its evidence and limits are easy to inspect. This tool reports common issues found in a supplied HTML snapshot.

## Approach

The implementation uses the Python standard library and produces JSON and Markdown reports. The repository includes a sample report so the output can be inspected before running the tool.

## Boundaries

This is an AI-assisted portfolio demonstration, not a claim of SEO outcomes. Offline HTML checks cannot establish whether a page is indexed or how changes affect visibility. Live search experiments need their own baseline, dates, measurements and limitations.
