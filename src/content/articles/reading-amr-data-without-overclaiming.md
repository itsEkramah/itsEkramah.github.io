---
title: 'Reading Antimicrobial Resistance Data Without Overclaiming'
description: 'How denominators, sampling and susceptibility methods shape what an AMR dataset can support.'
category: medicine-pharma
format: essay
tags: [demo, educational]
draft: true
reviewed: false
demo: true
featured: true
featureOrder: 4
---

> **DEMO DRAFT — NOT PUBLISHED.** This sample was prepared to test the article library, layout, headings, and reading experience. Verify technical details, add genuine references and original examples, and remove this notice only when ready to publish.

Antimicrobial resistance is often presented through a heatmap, a percentage, or a ranking of drugs. Those summaries are useful, but they can hide the most important questions: who was sampled, why the sample was collected, what laboratory method was used, and how an isolate was classified as susceptible or resistant. A chart cannot be interpreted responsibly without the clinical and surveillance context that produced it.

This article is an educational guide to reading antimicrobial susceptibility datasets. It is not clinical advice and should not be used to select treatment for an individual patient.

## Start with the unit of analysis

The first question is whether each row represents a patient, an encounter, a specimen, an isolate, or a single antibiotic test. These units are not interchangeable. One patient might contribute several samples, and one isolate might be tested against several antibiotics. A table with one row per test can contain far more rows than unique isolates. Dividing resistant tests by total rows without grouping correctly can create a misleading resistance rate.

Document the data dictionary before generating any summary. Identify the organism, specimen type, facility, collection date, antimicrobial agent, raw measurement if provided, interpretation category, and patient identifier if permitted. For privacy-sensitive datasets, keep identifiers in an access-controlled environment and use a suitable de-identified analysis table.

## Ask how isolates entered the dataset

Routine clinical laboratory data are usually collected because a clinician ordered a test, not because researchers sampled an entire population randomly. Patients with complicated infections, treatment failure, or prior antibiotic exposure may be overrepresented. Consequently, a hospital antibiogram does not automatically describe prevalence in the wider community.

The selection mechanism matters even when data volume is large. Tens of thousands of records cannot remove a systematic sampling bias. A defensible report names its population and avoids applying hospital findings directly to unrelated populations.

## Understand what the interpretation means

Susceptibility categories are assigned using defined breakpoints and methods. Breakpoints can differ by antimicrobial agent, organism, testing standard, and revision year. A dataset that mixes standards or time periods needs careful harmonization. Changes in apparent resistance over time may partly reflect laboratory definitions rather than a biological shift.

Retain raw MIC or inhibition-zone measurements when available, alongside the interpreted categories. Do not silently transform intermediate or unknown results into resistant or susceptible. If categories are combined for analysis, explain the rule, the rationale, and the information lost.

## Deduplication needs a policy

Repeated isolates from the same patient can distort aggregate estimates. A common surveillance approach is to define a first-isolate rule for a particular organism and analysis period, but the appropriate policy depends on the study's purpose and governing surveillance guidance. For a longitudinal question, removing all subsequent records may discard meaningful information about changing susceptibility.

Before applying any rule, quantify duplicates. Report the number of unique patients, episodes if defined, isolates, and tests. Readers should see which denominator is used for each percentage. Store deduplication code rather than making undocumented manual deletions in a spreadsheet.

## Missingness is not a neutral detail

Not all isolates are tested against every antimicrobial agent. Laboratories often use panels selected by organism, specimen, clinical needs, or local practice. Therefore, the count of tested isolates can differ sharply across drugs. An apparent 40% resistance rate based on ten tested isolates is not equivalent in precision or representativeness to the same percentage based on several hundred.

Show tested denominators alongside percentages. Explore whether missing tests cluster by facility, year, or organism. Avoid filling missing susceptibility values with a convenient default. The absence of a test result does not establish susceptibility.

## Visualize questions, not just numbers

A useful first report usually includes an organism distribution, specimen breakdown, counts of isolates tested by drug, and the proportion interpreted as resistant using a clearly stated denominator. Trends can be shown by month or year when sample size supports it. Include count labels or accessible tables so readers do not have to estimate values from colored bars.

Heatmaps work well for comparing organism–drug combinations, but they should not become the only output. Cells with sparse data can look just as visually authoritative as cells based on large samples. Consider displaying counts or suppressing unstable estimates under an explicitly documented rule.

## Separate descriptive patterns from causes

Suppose a hospital's observed resistance percentage rises between two years. That alone does not establish that prescribing caused the increase, that a new lineage emerged, or that an infection-control intervention failed. The composition of tested patients, clinical services, laboratory methods, and testing policies might also have changed.

Causal explanations require additional study design and supporting evidence. A surveillance dashboard can identify questions worth investigating, but should not pretend to answer them all. Good analytical writing distinguishes observation, hypothesis, and supported conclusion.

## Handle small groups carefully

Subgroup comparisons by ward, sex, age band, or specimen type may be informative, but small cell sizes increase uncertainty and can create disclosure risk. Display counts, consider appropriate uncertainty intervals, and avoid publishing combinations that could identify individuals. Before sharing dashboards, confirm that the data owner permits the intended level of detail.

Comparing facilities also needs caution. Hospitals differ in populations, testing intensity, and case mix. Presenting a simple league table of resistance percentages without these caveats may reward less intensive testing rather than better care.

## Make your analysis reproducible

Use scripts in R or Python for data validation, cleaning, deduplication, and figure generation. Maintain a log of assumptions: how organism names were standardized, whether blank tests were excluded, how duplicate isolates were handled, and which interpretation standards were used. Version the code and document the dataset's permission and provenance.

Useful outputs include a clean data dictionary, quality-check table, carefully labelled charts, and a short limitations section written for nontechnical stakeholders. A technically correct analysis is more valuable when hospital teams can understand its scope and avoid using it outside that scope.

## A responsible conclusion

AMR analysis is not simply counting resistant results. It is an exercise in denominators, sampling, clinical context, methods, and uncertainty. The most trustworthy reports are often those that make their limits explicit: which isolates were included, who was tested, what was measured, and what comparisons are supportable.

That transparency does not weaken the findings. It makes them more useful for surveillance, quality improvement, and deciding what evidence should be collected next.
