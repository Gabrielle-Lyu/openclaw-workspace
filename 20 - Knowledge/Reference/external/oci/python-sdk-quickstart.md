---
title: "SDK for Python Cloud Shell Quick Start"
source: "https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cloudshellquickstart_python.htm"
fetched: "20260219T030746Z"
---

<div>

<div class="body">

This section discusses how to quickly get started with the Oracle Cloud
Infrastructure SDKÂ for Python using Cloud Shell.

1.  Sign in to the Console.
2.  Click the Cloud Shell icon in the Console header. Note that Cloud
    Shell runs commands against the region selected in the Console's
    Region selection menu when Cloud Shell was started.
3.  Run Python:
    <div class="uk-position-relative">
    ``` pre codeblock scrollcopy
    user@cloudshell:oci (us-phoenix-1)$ python3
    Python 3.6.8 (default, Oct  1 2020, 20:32:44) 
    [GCC 4.8.5 20150623 (Red Hat 4.8.5-44.0.3)] on linux
    Type "help", "copyright", "credits" or "license" for more information.
    >>> 
    ```
    </div>
4.  Run the following code sample to see the current Object Storage
    namespace:
    <div class="uk-position-relative">
    ``` pre codeblock scrollcopy
    import oci
    object_storage_client = oci.object_storage.ObjectStorageClient(oci.config.from_file())
    result = object_storage_client.get_namespace()
    print("Current object storage namespace: {}".format(result.data))
    ```
    </div>
    <div class="p">
    This returns output similar to the following:
    ``` pre codeblock
    Current object storage namespace: mynamespace
    ```
    </div>

</div>

</div>
