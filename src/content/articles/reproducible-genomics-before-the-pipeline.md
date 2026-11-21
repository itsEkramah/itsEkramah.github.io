---
seoTitle: 'Bioinformatics Reproducibility Guide'
title: 'Reproducibility in Bioinformatics: Why It Matters and Where to Start'
description: 'What a paper-reproduction assignment taught me about random seeds, missing code and software versions, with practical steps for bioinformatics beginners.'
category: bioinformatics
format: essay
tags: ['Genomics', 'Reproducibility', 'Research methods']
draft: false
reviewed: true
demo: false
featured: true
featureOrder: 1
publishedAt: 2026-11-15
updatedAt: 2026-11-21
relatedProjectIds: [genomic-amr]
references:
  - label: 'Ioannidis et al. (2009): Repeatability of published microarray gene expression analyses'
    url: https://doi.org/10.1038/ng.295
  - label: 'Garijo et al. (2013): Quantifying reproducibility in computational biology: the case of the tuberculosis drugome'
    url: https://doi.org/10.1371/journal.pone.0080278
  - label: 'Sandve et al. (2013): Ten simple rules for reproducible computational research'
    url: https://doi.org/10.1371/journal.pcbi.1003285
  - label: 'Wilkinson et al. (2016): The FAIR Guiding Principles for scientific data management and stewardship'
    url: https://doi.org/10.1038/sdata.2016.18
  - label: 'Kapoor and Narayanan (2023): Leakage and the reproducibility crisis in machine-learning-based science'
    url: https://doi.org/10.1016/j.patter.2023.100804
  - label: 'The five pillars of computational reproducibility: bioinformatics and beyond'
    url: https://pmc.ncbi.nlm.nih.gov/articles/PMC10591307/
  - label: 'Snakemake: Getting started tutorial'
    url: https://snakemake.readthedocs.io/en/stable/tutorial/tutorial.html
  - label: 'Nextflow: Hello Nextflow training'
    url: https://training.nextflow.io/latest/hello_nextflow/
  - label: 'PyTorch: Reproducibility'
    url: https://docs.pytorch.org/docs/stable/notes/randomness.html
  - label: 'Snakemake: Distribution and Reproducibility'
    url: https://snakemake.readthedocs.io/en/stable/snakefiles/deployment.html
  - label: 'Nextflow: Caching and resuming'
    url: https://docs.seqera.io/nextflow/cache-and-resume
  - label: 'scikit-learn: Common pitfalls and data leakage'
    url: https://scikit-learn.org/stable/common_pitfalls.html
  - label: 'Git: About Version Control'
    url: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
  - label: 'Conda: Managing environments'
    url: https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html
  - label: 'uv: Locking and syncing'
    url: https://docs.astral.sh/uv/concepts/projects/sync/
  - label: 'renv: Introduction and reproducible R environments'
    url: https://rstudio.github.io/renv/articles/renv.html
  - label: 'Docker: Building best practices'
    url: https://docs.docker.com/build/building/best-practices/
---

My teacher gave our class an assignment that sounded straightforward: choose a published bioinformatics paper and reproduce its analysis.

I thought the difficult work had already been done. The data had been analysed, the methods were written down and the results were in the figures. I expected to follow the steps and obtain something similar.

I tried several papers published between 2023 and 2025. Across those attempts, I ran into problems with software versions, database releases, and the availability of data and source code. Reading the methods section was one thing. Reconstructing the analysis from what was actually available was another.

One lesson has stayed with me. While trying to reproduce a machine-learning study involving genomic prediction, I first learned why random seeds matter.

## The small setting I had overlooked: a random seed

An analysis can involve randomness before a model has even started learning. Splitting samples into training and test sets, shuffling observations and initialising a model can all involve random choices.

Change those choices and the result can change too. A performance score may depend partly on which samples were held out. Scikit-learn's [guide to controlling randomness](https://scikit-learn.org/stable/common_pitfalls.html#controlling-randomness) explains how `random_state` affects estimators and data splitters. Before that assignment, I had not understood that these settings belonged in the methods as much as the model parameters did.

A fixed seed helps repeat the random operations it controls under the same conditions. It does not guarantee identical results across software releases, hardware or nondeterministic operations. The [PyTorch reproducibility notes](https://docs.pytorch.org/docs/stable/notes/randomness.html) explain these limits, including why setting a seed alone may be insufficient.

Repeating one run also answers a different question from checking whether a model performs reliably. A recorded seed lets someone inspect that run. Appropriate repeated evaluations can show how sensitive performance is to the split or initialisation. Repeating an unsuitable split will not make it a sound evaluation.

What I took from this was simple: record the random settings and explain the evaluation. Do not keep trying seeds until one gives the score you want.

## The other obstacles were harder to resolve

Across the papers I attempted, software and database versions were not always easy to reconstruct. In other cases, obtaining the data or source code was the difficulty.

When an output differed, I had several possible explanations and little way to separate them. Had I misunderstood a step? Was I using a different release? Was something missing from the available materials?

I could not assume that a disagreement meant the published result was wrong. But missing information made it harder to investigate. That experience changed what I looked for in a paper and what I wanted to record in my own projects.

There is useful published guidance on this. [The five pillars of computational reproducibility: bioinformatics and beyond](https://pmc.ncbi.nlm.nih.gov/articles/PMC10591307/) brings together practices around automation, documentation, software environments, version control and sharing. These practices help explain why sharing a script alone may leave someone unable to reconstruct an analysis.

## What reproducibility actually means

Here, I use computational reproducibility to mean obtaining consistent results from the same inputs and a sufficiently documented analysis. Testing a finding with independently collected data addresses a different question.

Recording the inputs, code, environment and decisions makes a result easier to inspect. It does not establish that the research question was appropriate, the statistical method was sound or the conclusion was justified.

## This problem has been documented

In a 2009 study, [Ioannidis and colleagues](https://doi.org/10.1038/ng.295) examined selected analyses from 18 microarray articles published in _Nature Genetics_ in 2005 and 2006. They reproduced two in principle, six partly or with discrepancies, and could not reproduce ten. Missing data and incomplete descriptions of annotation or analysis were important obstacles. Those figures describe that sample of older studies, not a current failure rate for bioinformatics as a whole.

[Garijo and colleagues](https://doi.org/10.1371/journal.pone.0080278) documented the work required to reproduce a tuberculosis drug-repositioning study. Reconstructing the method took several months and involved difficulties with software and validation. That case shows how much work can sit between understanding a published method and being able to run it.

Neither example means that every unsuccessful reproduction disproves the original finding. It means the obstacle needs to be identified and recorded before drawing that conclusion.

## Why the small decisions matter

**An analysis contains many choices.** Which samples belong in the study? How should reads be filtered? Which reference genome should be used? These decisions can change the result. Commands alone will not explain why you made them.

**Tools and databases change.** Software updates can alter defaults, while reference databases gain or revise records. Two resistance-gene searches performed a year apart may give different answers because their inputs or resources differ. Record the tool version, database release, parameters and retrieval date so the difference can be investigated.

**Other work may depend on the result.** Bioinformatics often informs further research in health and medicine. An unclear analysis can send a collaborator down an unhelpful path or waste laboratory time. Being able to rerun it is valuable; deciding whether its conclusions are scientifically or clinically justified is a separate task.

**Documentation helps your future self.** A short README written while the decisions are fresh is usually easier than rebuilding the story from filenames and memory later.

## What my AMR project taught me

In my [genomic AMR course project](/portfolio/genomic-amr/), I worked on predicting antimicrobial resistance in _Neisseria gonorrhoeae_. One decision made me think more carefully about what it means to test a model.

Cross-validation separates data into training and held-out portions. But some rows in my feature tables had exactly the same genomic profile. A random row split could place one copy in training and another in evaluation. The held-out row would then contain a feature profile already represented in training, potentially making the model look better at handling unseen profiles than it really is.

I kept identical profiles together when constructing the folds. This addressed that specific overlap. It did not establish independence between all related isolates, or prove that the model would generalise to a new population.

There was another limitation: the supplied feature tables had already been filtered using genome-wide association study (GWAS) results. Leakage from that earlier selection step could not be excluded. I therefore describe the results as **internal estimates**, rather than evidence of performance on an independently collected dataset.

This is a broader concern too. [Kapoor and Narayanan's 2023 review](https://doi.org/10.1016/j.patter.2023.100804) brought together earlier investigations reporting leakage affecting 294 papers across 17 scientific fields. Their survey was not a representative estimate of how often all scientific machine learning suffers from leakage. It does show why evaluation design needs attention alongside the ability to rerun code.

Here is a small **synthetic teaching example**, not data from the project. It runs with Python 3's standard library:

```python
profiles = [(1, 0, 1), (1, 0, 1), (0, 1, 0), (0, 0, 1)]

def profiles_in(indices):
    return {profiles[index] for index in indices}

# Different row numbers do not guarantee different feature profiles.
overlap = profiles_in([0, 2]) & profiles_in([1, 3])
assert overlap == {(1, 0, 1)}

# Keep identical profiles together to remove this particular overlap.
assert profiles_in([0, 1, 2]).isdisjoint(profiles_in([3]))
```

Rows 0 and 1 are identical. The example shows one overlap check; it does not train a model or establish the right split for every study. The useful question is: **does this evaluation reflect the kind of new data I want the model to handle?**

## Habits worth learning first

You do not need to learn every workflow tool at once. I would start with the habits that make an ordinary project easier to understand.

The foundations matter here: navigating files in a Linux shell, understanding paths and permissions, and writing a small analysis in Python or R. Practise reading an error message and checking an intermediate file. Those skills make it easier to see what a workflow is actually doing when something goes wrong.

### 1. Track code and decisions with Git

[Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) records changes you commit, so you can inspect earlier versions and develop ideas on branches. Commit useful steps with specific messages, such as `add sample-ID validation`, instead of a series of commits called `update`.

Keep large sequencing files in appropriate storage or archives, with accessions or paths recorded in the project. Git is not a reason to put sensitive data, credentials or patient information in a public repository.

### 2. Give files and samples a clear home

A small project can start with this structure:

```text
project/
├── data/raw/       # Original inputs; read-only
├── metadata/       # Sample sheets and exclusion records
├── scripts/        # Analysis code
├── results/        # Generated outputs
├── logs/           # Run records and errors
└── README.md       # Question, inputs and run instructions
```

Treat original data as read-only. Save filtered or transformed files separately. Prefer a descriptive name such as `2026-11-16_amr-results.csv` to `final_final2.csv`, and record the run's configuration and code version. A date alone does not explain what produced a file.

Treat the sample sheet as data too. Columns such as `sample_id`, `group`, `batch` and `file_path` make relationships explicit. Check for missing or duplicated IDs and confirm that the files match the metadata. A quiet mismatch can affect every plot that follows.

The [FAIR principles](https://doi.org/10.1038/sdata.2016.18) offer a useful framework: data should be findable, accessible, interoperable and reusable. Accessible does not mean unrestricted. Some human datasets need controlled access; document that process, the available metadata and the files the analysis requires.

### 3. Record the environment, not just the command

Save tool and language versions, dependency records, reference releases and parameters, including random seeds where relevant. Keep data accessions, retrieval dates and checksums so someone can check which inputs you used.

For software environments, the [Conda guide](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html) is a starting point for managing bioinformatics dependencies. For a Python project, learn how [uv locks and syncs dependencies](https://docs.astral.sh/uv/concepts/projects/sync/); for an R analysis, the [renv introduction](https://rstudio.github.io/renv/articles/renv.html) shows how to record and restore a project library. Choose what fits the project and keep its specification or lockfile with the code.

Containers can help package the software environment. They do not guarantee identical behaviour on every computer: platform, hardware, inputs and configuration still matter. Record the container image digest where possible; a mutable tag alone may point to different software later. Docker's [version-pinning guidance](https://docs.docker.com/build/building/best-practices/#pin-base-image-versions) explains that distinction.

### 4. Make checks and exclusions visible

Make the workflow stop with a useful error when inputs are missing, IDs are duplicated or expected outputs are empty. Save logs and record how many samples enter and leave each step. If 100 samples enter and 60 remain, the other 40 need an explanation.

The same care applies to manual work. Record spreadsheet edits and other actions that affect the data. Graphical tools are not inherently unreproducible: Galaxy, for example, can preserve analysis histories and workflows. What matters is whether someone can recover the steps, settings and inputs.

Keep an exclusion table with each sample, the reason for exclusion and the relevant criterion. A report showing only the retained samples leaves out an important part of the method.

For machine learning, fit data-driven preprocessing and feature selection on the training portion within each evaluation fold. Choose splits that reflect the intended use, and report class balance and uncertainty alongside the metric. The [scikit-learn leakage guide](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) shows why using held-out data during model preparation can give optimistic results.

### 5. Use workflow and reporting tools when they help

As an analysis grows, Snakemake or Nextflow can make step dependencies explicit and help resume suitable completed work. Caching depends on the workflow configuration, tracked inputs and retained outputs; it is not a substitute for checking what changed. For a small analysis, a clear script with recorded commands may be enough.

If you are ready to turn a few scripts into a workflow, the [official Snakemake tutorial](https://snakemake.readthedocs.io/en/stable/tutorial/tutorial.html) introduces rules that connect input files to outputs. Its [basic read-mapping example](https://snakemake.readthedocs.io/en/stable/tutorial/basics.html) gives those ideas a familiar bioinformatics setting.

For Nextflow, [Hello Nextflow](https://training.nextflow.io/latest/hello_nextflow/) starts with small exercises and builds towards connected processes, file handling and software dependencies. Work through one of these courses before trying to learn both systems. Then use a small analysis you already understand to practise. You should be able to explain the underlying commands before handing them to a workflow manager.

Once the workflow runs, learn what it records and what it reuses. Snakemake's [deployment guidance](https://snakemake.readthedocs.io/en/stable/snakefiles/deployment.html) and Nextflow's [caching and resuming documentation](https://docs.seqera.io/nextflow/cache-and-resume) are useful follow-ups when you begin managing environments or restarting interrupted work.

Jupyter, R Markdown and Quarto can bring explanation, code and results together. Rerun the report from a clean session so its outputs do not depend on hidden state or cells executed out of order.

### 6. Write the README you would want to find

A useful README answers five questions:

- What question does this project address?
- Where do the inputs come from, and who may access them?
- How do I restore the environment and run the analysis?
- What outputs should a successful run produce?
- What assumptions and limitations should I know about?

Try following those instructions in a clean environment. Better still, ask someone else to try them. The missing step is often easier for a new reader to spot. Recording the path from inputs to results is also a central recommendation in [Sandve and colleagues' guidance](https://doi.org/10.1371/journal.pcbi.1003285) on reproducible computational research.

## Before choosing a paper to reproduce

Check the materials before committing to the project. Can you obtain the data, locate the relevant code version, identify the dependencies and estimate the computing resources needed? Start with a defined target, such as one figure or analysis, rather than promising to reproduce the entire study.

If a step fails, save the inputs, environment, command and error, along with any changes you made. Describe the obstacle and the possible explanations you have not ruled out. That is more useful than simply writing that a paper could not be reproduced.

## Before calling an analysis finished

I would check that another person can find:

- The input data or access instructions, with accessions, versions and checksums where available.
- The sample sheet and a record of exclusions or manual cleaning.
- The code version, software environment and reference database release.
- The run command, configuration and random settings.
- The expected outputs and logs, including which differences would matter scientifically.
- The evaluation design and limitations, including possible leakage or dependence between samples.

A clean rerun is a useful test of those records. It can reveal an undocumented path or dependency even when the original run worked perfectly.

## Three habits to start this week

I am still learning, and I would rather build these habits steadily than wait until I know every tool. If the list feels long, start here:

1. Put the code and project notes in Git.
2. Write a README with the question, data source and run steps.
3. Save the software environment and reference versions.

You can add more checks and workflow tooling as the project grows. The aim is to make the work understandable enough for someone else to inspect and build on, including where its conclusions stop.

That class assignment made me notice how much an analysis can depend on things its author no longer thinks to mention. I want fewer of those gaps in my own work. A useful place to start is the next project: leave enough information that you can return to it six months later without having to guess.

_First published 15 November 2026. Revised to include my paper-reproduction assignment, lessons about random seeds, and a learning path for workflow tools._
