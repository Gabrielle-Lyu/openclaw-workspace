---
title: "Add a Function Tool to an Agent using the ADK"
source: "https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/add-tool-adk.htm"
fetched: "20260219T215847Z"
---

This tutorial covers the steps to add a function tool to an existing agent in Generative AI Agents.

Function tools allow the agent to use custom-written, locally-defined functions as tools. They're very flexible and particularly useful for enterprise cases due to its local processing, easy authentication, and seamless integration with existing functionality.

In this example, we have a weather agent equipped with a custom function tool. This is also known as a function calling agent.

**Note**

Function tools are executed locally on your side.

What is sent to a remote agent on OCI servers is the function definition (function name, function parameters, and their descriptions). OCI servers do not access the function implementation.

## Overview

When a weather query is made, the remote agent effectively does the intent classification to use the `get_weather` tool. For example, based on the natural language query `Is it cold in Seattle?`, the remote agent fills the argument slot and makes the request.

The agent sends a request that contains the required actions for the client app. In this case, the required action for the client is to invoke the `get_weather` function tool with an argument `location`=`Seattle`.

The Agent Development Kit (ADK) does the following:

  - parses the required action
  - finds the local function registered
  - runs this function with the specific arguments
  - captures the function call output
  - submits the output back to the remote agent, so that the agent can use that output to generate an answer to the user prompt