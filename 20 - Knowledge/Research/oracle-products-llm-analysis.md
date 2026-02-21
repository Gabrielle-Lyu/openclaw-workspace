# Oracle Products LLM Analysis

Analysis completed: February 20, 2026

## Summary Table

| # | Product Name (as in PDF) | Has LLM? | LLM Enabled by Default? | LLM Models in Use | Source/Evidence |
|---|-------------|----------|------------------------|-------------------|-----------------|
| 1 | Oracle Database@Azure | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | Mentions "AI Vector Search" capability but no built-in LLM. Source: https://www.oracle.com/cloud/azure/oracle-database-at-azure/ |
| 2 | Oracle Database@Google Cloud | No | N/A | None mentioned | No LLM features mentioned in the product page. Source: https://www.oracle.com/cloud/google/oracle-database-at-google-cloud/ |
| 3 | Oracle Distributed Autonomous Database | No | N/A | None mentioned | No LLM features mentioned in the product page. Source: https://www.oracle.com/autonomous-database/distributed-autonomous-database/ |
| 4 | MySQL HeatWave | **Yes** | No (opt-in feature) | Cohere, Azure OpenAI, OpenAI, OCI Generative AI, Google, Anthropic, Hugging Face, AWS (user's choice) | "Use in-database large language models (LLMs) to instantly benefit from generative AI... Choose external LLMs, if needed, for your use case." Source: https://www.oracle.com/mysql/ |
| 5 | Oracle NoSQL Database | No | N/A | None mentioned | No LLM features mentioned in the product page. Source: https://www.oracle.com/database/nosql/ |
| 6 | Oracle Search | No | N/A | None mentioned | No LLM features mentioned in the product page. Source: https://www.oracle.com/cloud/search/ |
| 7 | Oracle Cache | No | N/A | None mentioned | No LLM features mentioned in the product page. Source: https://www.oracle.com/cloud/cache/ |
| 8 | PostgreSQL | No | N/A | None mentioned | No LLM features mentioned; focuses on database performance and managed service capabilities. Source: https://www.oracle.com/cloud/postgresql/ |
| 9 | Autonomous AI Lakehouse | **Yes** (via Select AI) | No (opt-in feature) | Cohere, Azure OpenAI, OpenAI, OCI Generative AI, Google, Anthropic, Hugging Face, AWS (user's choice) | "Bring AI to the data with your choice of leading large language models (LLMs) and embedding models... under enterprise security, policies, and access controls." Source: https://www.oracle.com/autonomous-database/autonomous-ai-lakehouse/ |
| 10 | Autonomous Transaction Processing | **Yes** (via Select AI) | No (opt-in feature) | User's choice of LLMs | "Select AI feature enables a capability that lets users ask questions in natural language". Part of Autonomous Database family. Source: https://www.oracle.com/autonomous-database/autonomous-transaction-processing/ |
| 11 | Exadata Cloud@Customer | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | "Developers can use AI Vector Search functionality to add semantic search and RAG capabilities" but no built-in LLM. Source: https://www.oracle.com/engineered-systems/exadata/cloud-at-customer/ |
| 12 | MySQL HeatWave | **Yes** | No (opt-in feature) | Same as #4 | Duplicate entry - same product as #4. Source: https://www.oracle.com/heatwave/ |
| 13 | Oracle Autonomous Database | **Yes** (via Select AI) | No (opt-in feature) | Cohere, Azure OpenAI, OpenAI, OCI Generative AI, Google, Anthropic, Hugging Face, AWS (user's choice) | "Use your choice of LLM, open source or proprietary. With Select AI, Autonomous AI Database automatically translates natural language into database queries" Source: https://www.oracle.com/autonomous-database/ |
| 14 | Oracle Database Enterprise Edition | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | Includes "AI Vector Search" at no additional cost but no built-in LLM. Source: https://www.oracle.com/database/base-database-service/ |
| 15 | Exadata Database Service | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | "Run AI Vector Search with Oracle AI Database 26ai... offload vector operations to storage servers". No built-in LLM. Source: https://www.oracle.com/engineered-systems/exadata/database-service/ |
| 16 | HeatWave Lakehouse | **Yes** | No (opt-in feature) | Same as MySQL HeatWave | Part of MySQL HeatWave ecosystem with same GenAI capabilities. Source: https://www.oracle.com/heatwave/lakehouse/ |
| 17 | Oracle Autonomous JSON Database | **Yes** (via Select AI) | No (opt-in feature) | User's choice of LLMs | Inherits Autonomous Database capabilities including Select AI. Source: https://www.oracle.com/autonomous-database/autonomous-json-database/ |
| 18 | Oracle Database@AWS | Indirectly (via AI Vector Search) | No | None mentioned (supports vector embeddings from external LLMs) | Mentions "AI Vector Search in Oracle AI Database and Amazon Bedrock" but no built-in LLM. Source: https://www.oracle.com/cloud/aws/ |

## Key Findings

### Products with Built-in LLM Support:
1. **MySQL HeatWave** (#4, #12 - duplicate) - In-database LLMs with multiple provider options
2. **HeatWave Lakehouse** (#16) - Part of MySQL HeatWave ecosystem
3. **Oracle Autonomous Database** (#13) and its variants - Select AI feature with choice of external LLMs:
   - Autonomous AI Lakehouse (#9)
   - Autonomous Transaction Processing (#10)
   - Autonomous JSON Database (#17)

### Products with AI Vector Search (but no built-in LLM):
1. Oracle Database@Azure (#1)
2. Exadata Cloud@Customer (#11)
3. Oracle Database Enterprise Edition (#14)
4. Exadata Database Service (#15)
5. Oracle Database@AWS (#18)

These products support AI Vector Search for RAG applications but require external LLM integration.

### Products with No LLM/AI Features:
1. Oracle Database@Google Cloud (#2)
2. Oracle Distributed Autonomous Database (#3)
3. Oracle NoSQL Database (#5)
4. Oracle Search (#6)
5. Oracle Cache (#7)
6. PostgreSQL (#8)

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

4. **Duplicate Entry**: MySQL HeatWave appears twice in the PDF (#4 and #12) with different URLs but is the same product.

---

*Analysis Date: February 20, 2026*  
*Source: Oracle product documentation pages*  
*Products listed in exact order as they appear in AI.pdf (page 1, then page 2, top to bottom)*
