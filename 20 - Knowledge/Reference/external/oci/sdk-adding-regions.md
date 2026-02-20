---
title: "Adding Regions"
source: "https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdk_adding_new_region_endpoints.htm"
fetched: "20260219T025405Z"
---

<div>

<div class="body">

You can add new regions to an Oracle Cloud Infrastructure SDK.

At a high level, there are three methods for adding a region to an SDK:

  - Create a regions config file on the machine running the SDK
    containing the region's information

<!-- end list -->

  - Set the `OCI_REGION_METADATA` region metadata environment variable

<!-- end list -->

  - If the SDK is running on an OCI instance within the region in
    question, programmatically opt-in to resolving the region's info
    from the instance metadata service

</div>

</div>
