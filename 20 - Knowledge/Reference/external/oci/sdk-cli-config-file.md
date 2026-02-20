---
title: "SDK and CLI Configuration File"
source: "https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm"
fetched: "20260219T023534Z"
---

<div>

`user`

</div>

OCID of the user calling the API. To get the value, see [Required Keys
and OCIDs](apisigningkey.htm).

Example: `  ocid1.user.oc1..<unique_ID> `(shortened for brevity)

Yes

`fingerprint`

Fingerprint for the public key that was added to this user. To get the
value, see [Required Keys and OCIDs](apisigningkey.htm).

Yes

`key_file`

Full path and filename of the private key.

**Important:** The key pair must be in PEM format. For instructions on
generating a key pair in PEM format, see [Required Keys and
OCIDs](apisigningkey.htm).

Example (Linux/Mac OS): `  ~/.oci/oci_api_key.pem `

Example (Windows): `~/.oci/oci_api_key.pem`

This corresponds to the file
`%HOMEDRIVE%%HOMEPATH%\.oci\oci_api_key.pem`.

Yes

`pass_phrase`

Passphrase used for the key, if it is encrypted.

**Caution:** This entry is deprecated, and is included for backward
compatibility only. Avoid saving confidential information in the
configuration file. For additional security, pass the passphrase to the
SDK/CLI at run time.

Yes, if key is encrypted and passphrase has not been configured to be
passed to at runtime

`tenancy`

OCID of your tenancy. To get the value, see [Required Keys and
OCIDs](apisigningkey.htm).

Example: `  ocid1.tenancy.oc1..<unique_ID> `

Yes

`region`

An Oracle Cloud Infrastructure region. See [Regions and Availability
Domains](/iaas/Content/General/Concepts/regions.htm).

Example: `us-ashburn-1`

Yes

`security_token_file`

If [session token
authentication](/iaas/Content/API/Concepts/sdk_authentication_methods.htm#sdk_authentication_methods_session_token)
is being used, then this parameter is required.

Using this authentication method makes **fingerprint**, **user**, and
**pass\_phrase** not required. Starting a session with the OCI CLI will
populate all of the required parameters for this authentication method.
See [Starting a Token-based CLI
Session](/iaas/Content/API/SDKDocs/clitoken.htm#Starting).

Conditional
