---
title: 'Reproducible Genomics Starts Before You Run the Pipeline'
description: 'Could you rerun an analysis three months later? Lessons from my AMR project and practical habits for clearer, reproducible bioinformatics.'
category: bioinformatics
format: essay
tags: ['Genomics', 'Reproducibility', 'Research methods']
draft: false
reviewed: true
demo: false
featured: true
featureOrder: 1
publishedAt: 2026-11-15
updatedAt: 2026-11-16
relatedProjectIds: [genomic-amr]
references:
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

Here is a small test. Open a project you finished three months ago and try to run it again. Do you remember which file was the final one? Which version of the tool you used? Why you removed that one sample?

If your answer is “not really,” you are not alone. I am a bioinformatics graduate from Quaid-i-Azam University, and I have already caught myself doing this. Before you can start new work, you have to reconstruct the old work: the files, the commands and the decisions you thought you would remember.

That is why I think reproducibility belongs in everyday bioinformatics practice. Given the recorded inputs, code, environment and notes, someone should be able to repeat the analysis and obtain consistent results under the documented conditions. That someone might be a reviewer, a lab partner or you, six months from now.

This does not make the science automatically correct. It makes the work easier to check. A mistake can be traced, an assumption can be questioned, and a result can be understood in context.

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

### 3. Record the environment, not just the command

Save tool and language versions, dependency records, reference releases and parameters. Conda or Mamba can manage environments containing bioinformatics tools; uv is useful for Python projects, and renv for R projects. Keep the environment specification or lockfile with the code, and document how to restore it.

Containers can help package the software environment. They do not guarantee identical behaviour on every computer: platform, hardware, inputs and configuration still matter. Record the container image digest where possible; a mutable tag alone may point to different software later. Docker's [version-pinning guidance](https://docs.docker.com/build/building/best-practices/#pin-base-image-versions) explains that distinction.

### 4. Make checks and exclusions visible

Make the workflow stop with a useful error when inputs are missing, IDs are duplicated or expected outputs are empty. Save logs and record how many samples enter and leave each step. If 100 samples enter and 60 remain, the other 40 need an explanation.

Keep an exclusion table with each sample, the reason for exclusion and the relevant criterion. A report showing only the retained samples leaves out an important part of the method.

For machine learning, fit data-driven preprocessing and feature selection on the training portion within each evaluation fold. Choose splits that reflect the intended use, and report class balance and uncertainty alongside the metric. The [scikit-learn leakage guide](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) shows why using held-out data during model preparation can give optimistic results.

### 5. Use workflow and reporting tools when they help

As an analysis grows, Snakemake or Nextflow can make step dependencies explicit and help resume suitable completed work. Caching depends on the workflow configuration, tracked inputs and retained outputs; it is not a substitute for checking what changed. For a small analysis, a clear script with recorded commands may be enough.

Jupyter, R Markdown and Quarto can bring explanation, code and results together. Rerun the report from a clean session so its outputs do not depend on hidden state or cells executed out of order.

### 6. Write the README you would want to find

A useful README answers five questions:

- What question does this project address?
- Where do the inputs come from, and who may access them?
- How do I restore the environment and run the analysis?
- What outputs should a successful run produce?
- What assumptions and limitations should I know about?

Try following those instructions in a clean environment. The step you forgot to document is often the one that becomes obvious when you do this.

## Three habits to start this week

I am still learning, and I would rather build these habits steadily than wait until I know every tool. If the list feels long, start here:

1. Put the code and project notes in Git.
2. Write a README with the question, data source and run steps.
3. Save the software environment and reference versions.

You can add more checks and workflow tooling as the project grows. The aim is to make the work understandable enough for someone else to inspect and build on, including where its conclusions stop.

The next time you finish an analysis, ask: **could someone else—or I, six months from now—repeat this from the recorded inputs and notes?** The parts that still depend on memory are a useful place to start.

_Updated 16 November 2026: rewritten from my supplied personal draft, with a checked synthetic example and clearer limits on model evaluation and software portability. First published 15 November 2026._
