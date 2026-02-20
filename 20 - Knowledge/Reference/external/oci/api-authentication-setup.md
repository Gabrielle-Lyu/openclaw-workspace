---
title: "Set Up API Authentication for OCI"
source: "https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/setup-oci-api-auth.htm"
fetched: "20260219T213428Z"
---

In this tutorial, you generate the private/public key pair for the sandbox user in the Console. When you use the Console to add the key pair, the Console also generates a configuration file preview snippet for you.

1.  Sign in to the Console. For **Cloud Account Name**, enter the `<tenancy-name>` and select **Next**.

2.  For identity domain, enter the `<domain-name>`. For example, **Default** and then select, **Next**.

3.  Enter the `<sandbox-username>` and `<sandbox-user-password>` and select **Sign In**.

4.  Open the Oracle Mobile Authenticator app, and for the `<tenancy-name>` `<sandbox-username>` account, get the generated passcode.

5.  In the Console, in the **Multi-Factor Authentication** window, enter the passcode and select **Sign In**.
    
    You're directed to the Console Home page.

6.  In the top navigation bar, select the Profile icon, and then select **User settings**.

7.  Select **Tokens and keys**.

8.  Under **API keys**, select **Add API key**.

9.  Generate or provide keys as instructed in the dialog.
    
    
    
    
    
    **Important**  
      
    If you generate keys, download both keys and save the keys in a secure location. If you lose the keys, they can't be re-created, and you must create new keys again.
    
    
    
    

10. Select **Add**.

11. A dialog displays the configuration settings. Copy the configuration information into a file on your local environment, called `config` and save the file into a secure text file.

If you need help, see Required Keys and OCIDs for API signing.