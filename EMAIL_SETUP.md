# Setting Up Email for Contact Form

The contact form on the website now sends emails to `hasharcstudio@gmail.com` when users submit the form.

## Configuration Steps

### 1. Create a Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if you haven't already
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** and **Windows PC** (or your device)
5. Google will generate a **16-character password** - copy it

### 2. Update `.env.local`

In the project root, update the `.env.local` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-password
```

**Example:**
```env
EMAIL_USER=hasharcstudio@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### 3. Test the Form

1. Start the development server: `npm run dev`
2. Go to http://localhost:3000/#contact
3. Fill out the form and click "Send Message"
4. You should see a success message
5. Check `hasharcstudio@gmail.com` for the email

## How It Works

- **Frontend**: The contact form validates inputs and sends data to the API
- **Backend API** (`/api/contact`): 
  - Validates all required fields
  - Checks email format
  - Prevents spam with rate limiting
  - Blocks bot submissions with honeypot field
  - Sanitizes inputs to prevent XSS attacks
  - Sends email via Gmail SMTP
  - Returns user-friendly error messages

## Security Features

✓ **Rate Limiting**: Max 5 requests per IP per minute  
✓ **Honeypot Field**: Hidden field to catch bots  
✓ **Input Validation**: Email format, field length checks  
✓ **XSS Prevention**: HTML special characters are escaped  
✓ **Field Length Limits**: Prevents abuse with large inputs  

## Troubleshooting

### "Email service is not configured" Error

- Check that `EMAIL_USER` and `EMAIL_PASS` are set in `.env.local`
- Verify the Gmail app password is correct (16 characters with spaces)
- Make sure 2-Step Verification is enabled on your Google Account

### Email Not Arriving

- Check spam/junk folder in Gmail
- Verify the sender email matches `EMAIL_USER`
- Check browser console for any error messages

### "Too many requests" Error

- Wait 1 minute and try again
- This is rate limiting to prevent spam

## Files Modified

- `components/sections/Contact.js` - Enhanced form with better error handling
- `app/api/contact/route.js` - Improved email verification and formatting
- `.env.local` - Email configuration (not committed to git)
- `.env.example` - Template for env variables
