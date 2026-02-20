# Oracle Products LLM Analysis

Analysis completed: February 20, 2026

## Summary Table

| Product Name | Has LLM? | LLM Enabled by Default? | LLM Models in Use | Source/Evidence |
|-------------|----------|------------------------|-------------------|-----------------|
| Oracle Database@Google Cloud | No | N/A | None mentioned | No LLM features mentioned in the product page |
| Oracle Distributed Autonomous Database | No | N/A | None mentioned | No LLM features mentioned in the product page |
| MySQL HeatWave | **Yes** | No (opt-in feature) | Cohere, Azure OpenAI, OpenAI, OCI Generative AI, Google, Anthropic, Hugging Face, AWS (user's choice) | "Use in-database large language models (LLMs) to instantly benefit from generative AI... Choose external LLMs, if needed, for your use case." Source: https://www.oracle.com/mysql/ |
| Oracle NoSQL Database | No | N/A | None mentioned | No LLM features mentioned in the product page |
| Oracle Search | No | N/A | None mentioned | No LLM features mentioned in the product page |
| Oracle Cache | No | N/A | None mentioned | No LLM features mentioned in the product page |
| Oracle Database@Azure | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | Mentions "AI Vector Search" capability but no built-in LLM. Source: https://www.oracle.com/cloud/azure/oracle-database-at-azure/ |
| Oracle Interconnect for AWS | No | N/A | None mentioned | Infrastructure service, no LLM features mentioned |
| Oracle Autonomous JSON Database | **Yes** (via Select AI) | No (opt-in feature) | User's choice of LLMs | Inherits Autonomous Database capabilities including Select AI. Source: https://www.oracle.com/autonomous-database/autonomous-json-database/ |
| HeatWave Lakehouse | **Yes** | No (opt-in feature) | Same as MySQL HeatWave | Part of MySQL HeatWave ecosystem with same GenAI capabilities. Source: https://www.oracle.com/heatwave/lakehouse/ |
| Exadata Database Service | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | "Run AI Vector Search with Oracle AI Database 26ai... offload vector operations to storage servers". No built-in LLM. Source: https://www.oracle.com/engineered-systems/exadata/database-service/ |
| Oracle Database Enterprise Edition (Base Database Service) | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | Includes "AI Vector Search" at no additional cost but no built-in LLM. Source: https://www.oracle.com/database/base-database-service/ |
| Oracle Autonomous Database | **Yes** (via Select AI) | No (opt-in feature) | Cohere, Azure OpenAI, OpenAI, OCI Generative AI, Google, Anthropic, Hugging Face, AWS (user's choice) | "Use your choice of LLM, open source or proprietary. With Select AI, Autonomous AI Database automatically translates natural language into database queries" Source: https://www.oracle.com/autonomous-database/ |
| Exadata Cloud@Customer | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | "Developers can use AI Vector Search functionality to add semantic search and RAG capabilities" but no built-in LLM. Source: https://www.oracle.com/engineered-systems/exadata/cloud-at-customer/ |
| Autonomous Transaction Processing | **Yes** (via Select AI) | No (opt-in feature) | User's choice of LLMs | "Select AI feature enables a capability that lets users ask questions in natural language". Part of Autonomous Database family. Source: https://www.oracle.com/autonomous-database/autonomous-transaction-processing/ |
| Autonomous AI Lakehouse | **Yes** (via Select AI) | No (opt-in feature) | Cohere, Azure OpenAI, OpenAI, OCI Generative AI, Google, Anthropic, Hugging Face, AWS (user's choice) | "Bring AI to the data with your choice of leading large language models (LLMs) and embedding models... under enterprise security, policies, and access controls." Source: https://www.oracle.com/autonomous-database/autonomous-ai-lakehouse/ |
| PostgreSQL (OCI Database with PostgreSQL) | No | N/A | None mentioned | No LLM features mentioned; focuses on database performance and managed service capabilities. Source: https://www.oracle.com/cloud/postgresql/ |

## Key Findings

### Products with Built-in LLM Support:
1. **MySQL HeatWave** - In-database LLMs with multiple provider options
2. **Oracle Autonomous Database** (and its variants) - Select AI feature with choice of external LLMs:
   - Autonomous Transaction Processing
   - Autonomous AI Lakehouse
   - Autonomous JSON Database

### Products with AI Vector Search (but no built-in LLM):
1. Exadata Database Service
2. Oracle Database Enterprise Edition
3. Oracle Database@Azure
4. Exadata Cloud@Customer

These products support AI Vector Search for RAG applications but require external LLM integration.

### Products with No LLM/AI Features:
1. Oracle Database@Google Cloud
2. Oracle Distributed Autonomous Database
3. Oracle NoSQL Database
4. Oracle Search
5. Oracle Cache
6. Oracle Interconnect for AWS
7. PostgreSQL (OCI Database with PostgreSQL)

## Important Notes

1. **LLM Enablement**: None of the products have LLM enabled by default. All require explicit configuration and opt-in.

2. **Model Choice**: Products with LLM support (MySQL HeatWave and Autonomous Database family) allow users to choose from multiple LLM providers including:
   - Cohere
   - Azure OpenAI
   - OpenAI
   - OCI Generative AI
   - Google
   - Anthropic
   - Hugging Face
   - AWS

3. **AI Vector Search**: Several products include AI Vector Search capabilities for semantic search and RAG applications, but this is distinct from having built-in LLM support.

---

*Analysis Date: February 20, 2026*  
*Source: Oracle product documentation pages*
