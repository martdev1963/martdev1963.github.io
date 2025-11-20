# Contact Form Backend

A Node.js/Express backend server that handles contact form submissions and sends emails via Gmail.

## Features

- ✅ Express.js REST API
- ✅ Gmail integration using Nodemailer
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation
- ✅ Error handling
- ✅ Environment variable configuration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Gmail

To use Gmail to send emails, you need to:

1. **Enable 2-Step Verification** on your Google Account
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate an App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter a name like "Contact Form Backend"
   - Click "Generate"
   - Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   Or on Windows:
   ```bash
   copy .env.example .env
   ```

4. **Edit `.env` file** with your credentials:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   PORT=3000
   ```

   **Important:** 
   - Use your full Gmail address for `GMAIL_USER`
   - Use the 16-character App Password (remove spaces) for `GMAIL_APP_PASSWORD`
   - Do NOT use your regular Gmail password

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

### POST `/api/contact`

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Using the Form

1. Open `index.html` in your browser
2. Make sure the backend server is running
3. Fill out the form and submit
4. The email will be sent to the Gmail address specified in `.env`

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled
- Check that the App Password was copied correctly (no spaces)

### "Connection timeout" error
- Check if the server is running
- Verify the `API_URL` in `index.html` matches your server URL
- Check firewall settings

### CORS errors
- The server has CORS enabled by default
- If you're hosting the form on a different domain, you may need to configure CORS in `server.js`

## Security Notes

- Never commit `.env` file to version control
- Use App Passwords instead of regular passwords
- Consider adding rate limiting for production use
- Add input sanitization for production
- Use HTTPS in production

## Production Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Use a process manager like PM2: `npm install -g pm2 && pm2 start server.js`
3. Set up a reverse proxy (nginx) if needed
4. Enable HTTPS
5. Consider adding rate limiting and additional security measures

