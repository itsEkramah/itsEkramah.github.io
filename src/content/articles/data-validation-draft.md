---
title: 'Draft example: a small, reproducible data check'
description: An unpublished authoring example demonstrating code, a table and an equation without claiming a real analysis result.
category: data-analytics
format: tutorial
tags: [Python, Data quality]
draft: true
reviewed: false
---

This is a synthetic authoring example, not a published tutorial or a report about a real dataset. Replace it with a tested workflow and its actual environment before publication.

## A minimal code block

The inputs below are invented solely to demonstrate article formatting:

```python
values = [2, 4, 6]
assert len(values) == 3
assert sum(values) / len(values) == 4
```

## A mathematical expression

The arithmetic mean of $n$ values is:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
$$

## An explicit check

| Check            | Expected result for this synthetic example |
| ---------------- | ------------------------------------------ |
| Number of values | 3                                          |
| Arithmetic mean  | 4                                          |

## Before publishing

Test the final code in a recorded environment, explain input assumptions, add useful references and replace this example with a complete article.
