
# OpenClaw Memory & Retrieval Architecture — Session Summary

## Overview
This document summarizes key concepts, decisions, and comparisons discussed regarding OpenClaw memory systems, retrieval backends, indexing strategies, and architecture trade‑offs.

---

# Memory Architecture Layers

## 1. Short‑Term Memory
Location: model context window  
Purpose: current conversation only  
Persistence: none  

## 2. Workspace Memory (Source of Truth)
Location:
~/.openclaw/workspace/

Files:
- MEMORY.md → long‑term curated facts
- memory/YYYY-MM-DD.md → daily logs

This is the canonical writable memory area for agents.

---

## 3. Vector Index Layer
Purpose: make Markdown searchable semantically.

Process:
Markdown → chunk → embedding → vector index → retrieval

Built‑in backend:
- SQLite database
- optional sqlite‑vec acceleration

---

## 4. QMD Backend
Optional external retrieval engine.

Capabilities:
- BM25 keyword search
- semantic vector search
- reranking
- query expansion
- collections
- external corpus indexing

Acts like a local search engine for Markdown.

---

# memory_search vs memory_get

memory_search
- semantic + keyword retrieval
- returns snippets
- finds relevant docs

memory_get
- opens specific file content
- requires valid path

Flow:
search → choose doc → open doc

---

# Retrieval Flow (Agent Decision Pipeline)

User Query
↓
Check context memory
↓
If insufficient → memory_search
↓
Retrieve snippets
↓
Optional memory_get
↓
Answer

Search happens on indexes, not raw files.

---

# Built‑in Backend vs QMD Backend

## Built‑in
Pros
- simple
- stable
- fast
- minimal setup

Cons
- weaker ranking
- limited external file reading
- simpler hybrid scoring

Best for
- small knowledge bases (<100 files)

---

## QMD
Pros
- stronger retrieval quality
- handles large corpora well
- supports external repositories
- better ranking

Cons
- more setup
- slower first run
- more dependencies

Best for
- large doc sets
- structured knowledge bases

---

# Hybrid Search Explanation

Semantic search:
- compares meaning
- embedding similarity

BM25 search:
- exact keyword match
- strong for identifiers

Hybrid:
combines both scores

Built‑in hybrid = simple merge  
QMD hybrid = full ranking pipeline

---

# Cost Considerations

Embedding cost depends on:
- corpus size
- reindex frequency
- duplicate indexing

Avoid:
indexing same docs in both systems

---

# Recommended Architecture (Chosen)

Primary backend: QMD  
Fallback backend: Built‑in  

Storage separation:

Agent‑written memory:
~/.openclaw/workspace/

Human‑maintained knowledge:
~/openclaw-knowledge/

Reason:
clean separation of responsibilities

---

# Best Practices

Do
- keep curated docs in knowledge repo
- keep agent memory small
- organize docs by topic

Don’t
- mix logs with reference docs
- duplicate corpora across backends
- dump raw logs into memory

---

# Scaling Guidance

Use built‑in only if:
- <100 files
- simple setup desired

Switch to QMD if:
- corpus grows
- retrieval misses relevant info
- results become noisy

---

# Mental Model

Files = truth  
Indexes = search acceleration  
Model = reasoning engine  

The model does not remember.  
It retrieves.

---

# Final Recommendation

Current setup is optimal:

QMD primary + builtin fallback  
Workspace memory for agent writes  
External repo for knowledge base

This provides:
- lowest cost duplication risk
- highest retrieval quality
- clean architecture
- predictable behavior
