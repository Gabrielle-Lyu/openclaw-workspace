# 00 - Inbox

Entry point for new information and requests.

## Structure

### `Requests/`
Items for daily review and action:

- **`human-request/`** - Your asks, tasks, and requests for Claw
  - Active requests in root folder
  - Completed requests → `processed-request/` (with summary)
  
- **`agent-request/`** - Claw's suggestions, questions, and proposals for you
  - Pending requests in root folder
  - Resolved requests → `processed-request/` (with resolution)

**Review frequency:** Every morning during daily routine

**Completion workflow:**
1. Complete the request
2. Add completion summary to the request file
3. Move file to `processed-request/` subfolder

---

### `Docs/`
File processing pipeline for documents and content:

- **`dropzone/`** - Files you drop here for processing
- **`processing/`** - Currently being organized by Claw
- **`_done/`** - Processed and filed into Knowledge base

**Flow:** dropzone → processing → Knowledge (then moved to _done)

---

_Inbox is temporary storage. Everything flows out to Journal or Knowledge._
