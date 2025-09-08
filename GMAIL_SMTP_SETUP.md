# Gmail SMTP Setup for Al-Azhar Strapi

## ✅ Benefits of Gmail SMTP

- **100% FREE forever** - No trial expiration like SendGrid
- **Reliable** - Google's infrastructure
- **No limits** for personal/educational use
- **Easy setup** - Just need Gmail account

## 🔧 Setup Instructions

### 1. Enable 2-Factor Authentication

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the setup instructions if not already enabled

### 2. Generate App Password

1. Still in "Security" → "2-Step Verification"
2. At the bottom, click "App passwords"
3. Select:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - **Name**: Al-Azhar Strapi
4. Click "Generate"
5. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### 3. Update .env File

Replace `your_gmail_app_password_here` with your actual app password:

```properties
SMTP_PASSWORD=abcd efgh ijkl mnop
```

### 4. Test Configuration

```bash
# Run the test script
./test-gmail-smtp.sh

# Or start Strapi directly
yarn develop
```

### 5. Test Email Confirmation

```bash
# Test user registration with email confirmation
./debug-email-confirmation.sh
```

## 🔍 Current Configuration

**SMTP Settings:**

- Host: smtp.gmail.com
- Port: 587 (STARTTLS)
- Username: toubadarou399@gmail.com
- Password: [App Password from Gmail]

**Email Templates:**

- From: toubadarou399@gmail.com
- Reply-To: toubadarou399@gmail.com
- Footer: Al Azhar, Ndame, Touba, Senegal

## 🚨 Troubleshooting

If you get authentication errors:

1. Double-check the app password is correct
2. Make sure 2FA is enabled on Gmail
3. Try regenerating the app password
4. Check that SMTP_USERNAME matches your Gmail address

## 📧 Email Templates

The system includes beautiful HTML email templates for:

- ✅ Email confirmation (when users register)
- 🔐 Password reset
- 🎨 Al-Azhar Institut branding

## ⚡ Next Steps

1. **Get Gmail App Password** (most important!)
2. **Update .env file** with the password
3. **Restart Strapi** to apply changes
4. **Test registration** with email confirmation

Your email system will work forever with Gmail SMTP - no more trial expirations! 🎉
