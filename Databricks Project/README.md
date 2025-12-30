# PySpark & Databricks – Core Concepts Overview

This document provides a **concise overview of PySpark and Databricks fundamentals**, summarizing concepts related to Spark architecture, DataFrame operations, transformations, aggregations, joins, window functions, and data writing.

It is intended as a **quick-reference guide** and learning summary.

---

## 1. Databricks & PySpark

- **Databricks** is a managed cloud platform built on Apache Spark.
- **PySpark** is the Python API for Apache Spark, allowing distributed data processing using Python.

Databricks simplifies:
- Cluster management
- Spark optimization
- Data governance
- Notebook-based development

---

## 2. Apache Spark Basics

Apache Spark is a **distributed data processing engine** designed to process large datasets efficiently by distributing work across multiple machines.

Key characteristics:
- In-memory computation
- Lazy execution
- Fault tolerance
- Parallel processing using partitions

---

## 3. Spark Architecture

Spark follows a **master–worker architecture**:

- **Driver Program**
  - Executes user code
  - Creates execution plans
  - Coordinates work

- **Cluster Manager**
  - Manages cluster resources
  - Allocates worker nodes

- **Worker Nodes**
  - Execute tasks
  - Contain executors

- **Executors**
  - Run tasks
  - Cache data in memory

Execution flow:
1. User submits code
2. Driver creates logical plan
3. Cluster manager allocates resources
4. Executors process data

---

## 4. Spark Benefits

- **In-Memory Computation**: Faster than disk-based systems
- **Lazy Evaluation**: Transformations execute only when actions are triggered
- **Fault Tolerance**: Data can be recomputed using lineage
- **Partitioning**: Enables parallel execution

---

## 5. DataFrames in Spark

A **DataFrame** is a distributed table-like structure with rows and columns.

DataFrames are:
- Immutable
- Schema-based
- Optimized by Spark’s Catalyst Optimizer

---

## 6. Data Reading

Spark reads data using the DataFrame Reader API.

Common options:
- `header = true`
- `inferSchema = true`

Data can be read from:
- CSV
- Parquet
- JSON
- Delta

---

## 7. Transformations

Transformations are **lazy operations** that return a new DataFrame.

Common transformations include:
- `select`
- `filter / where`
- `withColumn`
- `withColumnRenamed`
- `drop`
- `sort / orderBy`
- `limit`

Transformations do not execute until an **action** is called.

---

## 8. Handling Columns & Data Types

- Columns can be renamed or modified using `withColumn`
- Data types can be converted using `cast`
- String functions like `upper`, `lower`, `initcap` are commonly used

---

## 9. Handling Null Values

Spark provides utilities to:
- Drop nulls using `dropna`
- Fill nulls using `fillna`

Null handling is critical before joins and aggregations.

---

## 10. String, Date, and Array Operations

Common operations:
- String functions (`upper`, `lower`, `regexp_replace`)
- Date functions (`current_date`, `datediff`, `date_add`)
- Array operations (`split`, `explode`, `array_contains`)

---

## 11. Aggregations & Grouping

Aggregation operations summarize data.

Examples:
- `groupBy`
- `sum`
- `avg`
- `count`

Grouping allows data to be analyzed at different levels of granularity.

---

## 12. Advanced Transformations

### collect_list
- Collects multiple row values into an array per group

### pivot
- Converts row values into columns (similar to pivot tables)

### when / otherwise
- Implements conditional logic (similar to SQL CASE WHEN)

---

## 13. Joins

Joins combine data from multiple DataFrames.

Common join types:
- Inner
- Left
- Right
- Full
- Anti

Joins are fundamental for enrichment and analytics.

---

## 14. Window Functions

Window functions perform calculations **across related rows without collapsing them**.

Common window functions:
- `row_number`
- `rank`
- `dense_rank`
- Running totals (cumulative sum)

Used for:
- Ranking
- Deduplication
- Trend analysis

---

## 15. User Defined Functions (UDFs)

UDFs allow custom logic using Python functions.

However:
- They are slower
- Built-in Spark functions are preferred

UDFs should be used only when no native function exists.

---

## 16. Data Writing

Spark supports multiple write modes:
- `append`
- `overwrite`
- `ignore`
- `error`

Spark **always writes data to directories**, not single files.

---

## 17. File Formats

### Parquet
- Columnar format
- Optimized for analytics
- Efficient compression and reads

Recommended for big data workloads.

---

## 18. Tables in Spark

Spark supports table creation using:
- `saveAsTable`

### Managed Tables
- Storage managed by Spark
- Dropping table deletes data

### External Tables
- Data stored in user-defined locations
- Metadata-only tables

---

## 19. Spark SQL Integration

- DataFrames can be converted to SQL views
- SQL queries can be executed using `spark.sql`
- Results can be converted back to DataFrames

Spark SQL and DataFrames are fully interoperable.

---

## Summary

This document captures the **core building blocks of PySpark and Databricks**, including:
- Architecture
- Transformations
- Aggregations
- Joins
- Window functions
- Data writing

These concepts form the foundation for building scalable data pipelines and analytics workflows using Spark.

---
