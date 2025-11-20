# Contact Form Setup Guide

This guide will help you set up the contact form on your GitHub Pages site to work with the backend server.

## Quick Start

### 1. Set Up the Backend Server

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Gmail:**
   - Copy `.env.example` to `.env`
   - Follow the instructions in `backend/README.md` to get your Gmail App Password
   - Update `.env` with your Gmail credentials

4. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### 2. Update the Form (Already Done!)

The form in `index.html` has been updated to:
- Submit data to the backend API
- Show success/error messages
- Handle form validation
- Display loading states

### 3. Configure the API URL

**For Local Development:**
- The form is already configured to use `http://localhost:3000/api/contact`
- Make sure the backend server is running on port 3000

**For Production (GitHub Pages):**
Since GitHub Pages only serves static files, you'll need to:

1. **Deploy the backend server** to a hosting service like:
   - [Render](https://render.com)
   - [Heroku](https://heroku.com)
   - [Railway](https://railway.app)
   - [Vercel](https://vercel.com) (with serverless functions)
   - [Fly.io](https://fly.io)

2. **Update the API_URL in `index.html`:**
   ```javascript
   // Change this line (around line 165):
   const API_URL = 'http://localhost:3000/api/contact';
   
   // To your deployed backend URL:
   const API_URL = 'https://your-backend-domain.com/api/contact';
   ```

## Testing Locally

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Open `index.html` in your browser (or use a local server):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```

3. Fill out the form and submit
4. Check your Gmail inbox for the message

## Important Notes

### CORS (Cross-Origin Resource Sharing)

The backend server has CORS enabled, which allows your GitHub Pages site to make requests to it. If you encounter CORS errors:

1. Make sure the backend server is running
2. Verify the API_URL in `index.html` matches your backend URL
3. Check that CORS is enabled in `backend/server.js` (it should be by default)

### Security Considerations

- **Never commit `.env` file** to version control
- Use **App Passwords**, not your regular Gmail password
- For production, consider adding:
  - Rate limiting
  - Input sanitization
  - HTTPS only
  - Request validation

## Troubleshooting

### "Network error" message
- Check if the backend server is running
- Verify the API_URL in `index.html` is correct
- Check browser console for detailed error messages

### "Failed to send message"
- Check backend server logs
- Verify Gmail credentials in `.env`
- Make sure you're using an App Password, not regular password

### CORS errors
- Ensure CORS is enabled in `backend/server.js`
- Check that the API_URL matches the backend server URL exactly

## Next Steps

1. Test the form locally
2. Deploy the backend to a hosting service
3. Update the API_URL in `index.html` with your production backend URL
4. Commit and push your changes to GitHub
5. Your contact form should now work on your live site!

