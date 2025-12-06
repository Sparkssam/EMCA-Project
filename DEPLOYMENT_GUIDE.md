# Deployment Guide for cPanel (BESTCOM)

This guide explains how to deploy your Next.js application to your cPanel hosting using the "Setup Node.js App" feature.

## Prerequisites

1.  **Node.js Version**: Ensure your cPanel supports Node.js 18 or 20.
2.  **Supabase Credentials**: Have your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` ready.

## Step 0: Backup and Clean Existing Site (Important!)

Since you have an existing website on this domain, we need to back it up and remove it so it doesn't conflict with your new app.

1.  **Open File Manager** in cPanel.
2.  Navigate to **public_html** (this is where your current website lives).
3.  **Backup**:
    *   Select all files and folders inside `public_html`.
    *   Right-click -> **Compress**.
    *   Choose **Zip Archive**.
    *   Name it `old_site_backup.zip` and click **Compress Files**.
    *   **Close** the "Compression Results" window that appears.
    *   If you don't see the new zip file, click **Reload** in the top toolbar.
    *   **Select** `old_site_backup.zip`.
    *   Click the **Download** button in the top toolbar (or right-click the file and choose **Download**).
    *   Save this file to your computer.
4.  **Clean (Delete Old Files)**:
    *   **Yes, delete everything inside `public_html`**, BUT...
    *   **STOP! Do NOT delete these 3 items:**
        1.  The folder `api.emca.or.tz` (Keep this!)
        2.  The file `old_site_backup.zip` (Keep this!)
        3.  The folder `cgi-bin` (Keep this!)
    *   **Everything else** (`index.html`, `images`, `.htaccess`, etc.) -> **DELETE IT**.
    *   Your `public_html` folder should end up with only those 3 safe items in it.

## Step 1: Prepare the Application Locally

We have configured your app to use `output: 'standalone'`. This creates a lightweight build perfect for shared hosting.

1.  Open your terminal in VS Code.
2.  Run the build command:
    ```powershell
    npm run build
    ```
3.  **Run the automated preparation script**:
    I have created a script to handle the complex file copying and zipping for you. Just run:
    ```powershell
    .\prepare-deploy.ps1
    ```
    *This script will automatically:*
    *   Copy the `public` folder to the correct place.
    *   Copy the `.next/static` folder to the correct place.
    *   Create a `deploy.zip` file in your project root.

4.  **Locate the file**:
    You will now see a `deploy.zip` file in your project folder (`c:\Users\Derick Mhidze\EMCA-Project\deploy.zip`). This is the **only** file you need to upload.

## Step 2: Configure cPanel

1.  Log in to your cPanel (using the credentials provided).
2.  Scroll down to the **Software** section and click **Setup Node.js App**.
3.  Click **Create Application**.
4.  **Node.js Version**: Select **v20.x** (or v18.x if 20 is not available).
5.  **Application Mode**: Select **Production**.
6.  **Application Root**: Enter `emca-app` (or any name you prefer).
7.  **Application URL**: Select your domain (`emca.or.tz`).
8.  **Application Startup File**: Enter `server.js`.
9.  Click **Create**.

## Step 3: Upload Files

1.  In the Node.js App details page, click **Stop App** (if it's running).
2.  Open **File Manager** in cPanel.
3.  Navigate to the folder you created (e.g., `emca-app`).
4.  **Clean the folder**:
    *   You might see files like `server.js`, `public`, or `tmp`.
    *   **Delete** `server.js` and `public` (and `node_modules` if it exists).
    *   (You can leave `tmp` if you want, or delete it).
    *   We want the folder to be empty so we can put your *actual* app there.
5.  **Upload**:
    *   Click **Upload** in the top toolbar.
    *   Select the `deploy.zip` file from your computer.
        *   *Location on your computer:* `C:\Users\Derick Mhidze\EMCA-Project\deploy.zip`
6.  **Extract**:
    *   Once uploaded, right-click `deploy.zip` and select **Extract**.
    *   Click **Extract Files**.
    *   **Reload** the page.
    *   You should now see `server.js`, `public`, `.next`, etc.
7.  **Delete** the `deploy.zip` file (cleanup).

## Step 4: Environment Variables

1.  Go back to the **Setup Node.js App** page in cPanel.
2.  Click **Edit** on your application.
3.  Scroll to the **Environment Variables** section.
4.  Add the following variables (copy values from your local `.env` file):
    *   `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase URL)
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
    *   `PORT`: `3000` (Optional, cPanel usually sets this automatically, but good to have).

## Step 5: Start the Application

1.  In the **Setup Node.js App** page, click **Start App**.
2.  Wait a few seconds.
3.  Visit your website `https://emca.or.tz`.

## Troubleshooting: "500 Error" or "Version Change Error"

**Don't Panic!** If you see a "500 Internal Server Error" or a message saying "check availability of application has failed" after changing the Node.js version, **this is normal**.

It just means the application is currently broken because we haven't finished setting it up yet.

**What to do:**
1.  **Ignore the error message.**
2.  Proceed immediately to **Step 3 (Upload Files)** and **Step 5 (Start the Application)**.
3.  Once you upload the new code and run `npm install` successfully, the 500 error will go away.

## Troubleshooting: "NPM Error ERESOLVE"

If you see an error like `npm error ERESOLVE unable to resolve dependency tree`, it means the server is confused by the new React version.

**The Best Fix (Re-upload):**

I have updated the automation script to include a special configuration file (`.npmrc`) that forces the server to accept the dependencies.

1.  **Run the script again** in VS Code:
    ```powershell
    .\prepare-deploy.ps1
    ```
2.  **Upload** the new `deploy.zip` to cPanel (replace the old one).
3.  **Extract** it (overwrite existing files).
4.  **Delete** the `node_modules` folder in cPanel again.
5.  **Run NPM Install** again.
    *   It should work perfectly now because the `.npmrc` file is included.
6.  **Restart Application**.
    *   Go to **File Manager** -> `emca-app`.
    *   **Delete** the `node_modules` folder entirely.
    *   Go back to the **Setup Node.js App** page in cPanel.
    *   Click the **Run NPM Install** button.
    *   (This might take a few minutes. Wait for it to say "Success").
    *   **Restart** the application.

3.  **Verify Environment Variables**:
    *   Ensure you added `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Environment Variables section.

4.  **Check Startup File**:
    *   Ensure "Application Startup File" is set to `server.js`.
