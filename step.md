# Steps to Set Up Contact Form Email (Send to hasharcstudio@gmail.com)

## Overview
When a user fills out the contact form and clicks **"Send Message"**, the message will be sent to **hasharcstudio@gmail.com** using **Nodemailer** with Gmail SMTP via a Next.js API route.

---

## Step 1: Install Nodemailer
Run this command in your project root:
```bash
npm install nodemailer
```
Nodemailer is a Node.js library that allows sending emails using SMTP.

---

## Step 2: Generate a Gmail App Password
Since Gmail blocks less-secure apps, you need an **App Password**:

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar.
3. Under "How you sign in to Google", make sure **2-Step Verification** is turned **ON**.
4. After enabling 2-Step Verification, go to: https://myaccount.google.com/apppasswords
5. Select app name (e.g., "Hasharc Studio Website") and click **Create**.
6. Google will give you a **16-character app password** (e.g., `abcd efgh ijkl mnop`).
7. **Copy this password** — you'll use it in the next step.

---

## Step 3: Create `.env.local` File
Create a file named `.env.local` in the project root (`landing-page/`) with:
```env
EMAIL_USER=hasharcstudio@gmail.com
EMAIL_PASS=your-16-char-app-password-here
```
Replace `your-16-char-app-password-here` with the App Password from Step 2.

> **IMPORTANT:** `.env.local` is already in `.gitignore` by default in Next.js — your credentials will NOT be pushed to GitHub.

---

## Step 4: Create the API Route
A new file is created at: `app/api/contact/route.js`

This API route:
- Receives the form data (fname, lname, email, phone, message) via POST request.
- Validates all required fields are present.
- Uses Nodemailer to send an email to hasharcstudio@gmail.com.
- Returns success/error JSON response.

---

## Step 5: Update the Contact Form Component
The file `components/sections/Contact.js` is updated to:
- Add loading state (`sending`) and status feedback (`status`).
- On form submit, send a POST request to `/api/contact` with the form data.
- Show success/error messages to the user.
- Disable the button while sending.
- Reset the form on success.

---

## File Structure After Changes
```
landing-page/
├── .env.local                    ← NEW (your email credentials)
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js          ← NEW (API route to send email)
│   ├── layout.js
│   └── page.js
├── components/
│   └── sections/
│       └── Contact.js            ← UPDATED (form submit logic)
├── package.json                  ← UPDATED (nodemailer added)
└── step.md                       ← THIS FILE
```

---

## Testing
1. Make sure `.env.local` has the correct App Password.
2. Run `npm run dev` to start the dev server.
3. Fill out the contact form and click **Send Message**.
4. Check hasharcstudio@gmail.com inbox — you should receive the message.
5. If it doesn't work, check the terminal for error logs.

---

## Troubleshooting
| Problem | Solution |
|---|---|
| "Invalid login" error | Double-check your App Password in `.env.local`. Make sure 2-Step Verification is ON. |
| Email goes to spam | Mark it as "Not Spam" once. Gmail learns over time. |
| 500 error on submit | Check terminal logs. Ensure `.env.local` variables are set and server was restarted. |
| Form doesn't submit | Open browser DevTools → Console tab to see any JavaScript errors. |
