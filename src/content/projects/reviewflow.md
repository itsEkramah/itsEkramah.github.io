---
title: ReviewFlow Automation
shortTitle: ReviewFlow Automation
summary: A review queue that turns support requests into structured drafts and records human approval or rejection.
kind: Software demonstration
order: 5
tools: [Python, FastAPI, SQLite, JavaScript]
domains: [Workflow automation, Human review]
repoUrl: https://github.com/itsEkramah/reviewflow-automation
verifiedEvidence:
  - label: Source and setup
    url: https://github.com/itsEkramah/reviewflow-automation
  - label: Documented validation record
    url: https://github.com/itsEkramah/reviewflow-automation/blob/main/VALIDATION.md
limitations: AI-assisted demonstration using keyword rules by default. The optional AI adapter has mock-based tests; no live AI run or messaging integration is claimed.
---

## The problem

Automated drafts need a clear boundary between preparing a response and approving it. ReviewFlow makes that review step visible.

## Workflow

The demonstration stores requests, prevents duplicate stored requests, produces structured drafts and records approval or rejection. Python, FastAPI and SQLite support the workflow, with a JavaScript interface.

## Evidence and boundaries

The public validation record describes the checks performed. This AI-assisted portfolio demonstration uses keyword rules by default. Mock-based AI adapter tests do not establish live model performance, and the project does not claim a connected messaging service.
