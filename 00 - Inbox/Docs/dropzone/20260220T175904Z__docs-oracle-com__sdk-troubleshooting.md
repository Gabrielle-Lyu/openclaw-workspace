---
title: "SDK Troubleshooting"
source: "https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdk_troubleshooting.htm"
fetched: "20260220T175904Z"
---

If you receive an SSL certificate error (often raised as a `CERTIFICATE_VERIFY_FAILED` error), you might be missing additional certificates that the operation requires.

**Troubleshooting Suggestions**

The OCI CLI and each OCI SDK have unique methods to specify certifications in code.

**CLI**

    export REQUESTS_CA_BUNDLE=path_to_cert_bundle_file

**Java**

Import CA certificates to the Java Keystore:

1.  Import a certificate into the Apple Mac OS keychain:
    
        sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" ~/workspaces/trustroots/root-ca.crt

2.  Import a Certificate into the Java Runtime Environment (JRE) Truststore:
    
        export JAVA_HOME="$(/usr/libexec/java_home)"
                            sudo keytool -importcert -alias missioncontrol-root-ca -file ~/workspaces/trustroots/root-ca.crt -keystore $JAVA_HOME/jre/lib/security/cacerts -storepass changeit

**Go**

    pool := x509.NewCertPool()
                //readCertPem reads the pem files to a []byte
                pool.AppendCertsFromPEM(readCertPem())
                //install the certificates to the client
                if h, ok := client.HTTPClient.(*http.Client); ok {
                tr := &http.Transport{TLSClientConfig: &tls.Config{RootCAs:pool}}
                h.Transport = tr
                } else {
                panic("the client dispatcher is not of http.Client type. can not patch the tls config")
                }

**Python**

    # There are two ways of trusting certs
                
                # 1. Pass the certs directly to a client
                object_storage = oci.object_storage.ObjectStorageClient(config)
                object_storage.base_client.session.verify = 'path_to_cert_bundle_file'
                
                # 2. Set the environment variable "REQUESTS_CA_BUNDLE"
                export REQUESTS_CA_BUNDLE=path_to_cert_bundle_file

**Ruby**

    # Take identity client as an example
                # Refer to this link: https://ruby-doc.org/stdlib-2.4.1/libdoc/net/http/rdoc/Net/HTTP.html for a complete list of variables to configure
                identity = OCI::Identity::IdentityClient.new
                identity.api_client.request_option_overrides = {
                # Sets path of a CA certification file in PEM format.
                # The file can contain several CA certificates.
                :ca_file => 'PATH_TO_CA_FILE',
                # Sets path of a CA certification directory containing certifications in PEM format.
                :ca_path => 'PATH_TO_CA_DIR',
                }

**TypeScript**

    export NODE_EXTRA_CA_CERTS=<path_to_cert>

**.NET**

For the OCI .NET SDK, you need to trust the certificate file at the OS level:

**Mac OS**

1.  In the Keychain Access app on your Mac, select either the Login or System keychain.

2.  Drag the certificate file onto the Keychain Access app.

3.  If you're asked to provide a name and password, type the name and password for an administrator user on this computer.

**Centos/RHEL/Oracle Linux**

1.  Copy the .crt file to `/etc/pki/ca-trust/source/anchors` on your machine

2.  Run `update-ca-trust extract`

**Debian/Ubuntu**

1.  Copy the .crt file to `/usr/local/share/ca-certificates/` on your machine

2.  Run `update-ca-certificates`

**Windows**

1.  Click the search box on the taskbar or in the Start Menu, and type "mmc" to launch the Microsoft Management Console.
2.  Click the **File** menu and then click **Add/Remove Snap-In**.
3.  Click **Certificates** under **Available Snap-ins** then click **Add**.
4.  Click **OK**
5.  Click **Computer Account**, then click the **Next** button.
6.  Click **Local Computer**
7.  Click **Finish**.
8.  Double-click **Certificates (Local Computer)** in the tree menu, then right-click **Trusted Root Certification Authorities Store**.
9.  Click **All Tasks** in the pop-up menu, then select **Import**.
10. Follow the instructions to find and import your certificate.