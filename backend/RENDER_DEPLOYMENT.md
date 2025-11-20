# Deploying to Render.com

This guide will help you deploy your contact form backend to Render.com.

## Prerequisites

✅ Your code is already pushed to GitHub at: `https://github.com/martdev1963/martdev1963.github.io`

## Step-by-Step Deployment

### 1. Create a Render Account

1. Go to [Render.com](https://render.com)
2. Sign up or log in (you can use your GitHub account)

### 2. Create a New Web Service

1. Click **"New +"** button in the dashboard
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select the repository: `martdev1963/martdev1963.github.io`

### 3. Configure the Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `contact-form-backend` (or any name you prefer)
- **Region**: Choose the closest region to you
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT: Set this to `backend`**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
Click **"Add Environment Variable"** and add:

1. **GMAIL_USER**
   - Value: `martdev1963@gmail.com`

2. **GMAIL_APP_PASSWORD**
   - Value: `lgefbxlsoodtenxr` (your 16-character app password)

3. **PORT** (optional)
   - Value: `3000` (or leave blank, Render will assign one)

4. **NODE_ENV** (optional, but recommended)
   - Value: `production`

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying your service
3. Wait for the deployment to complete (usually 2-3 minutes)

### 5. Get Your Backend URL

Once deployed, Render will provide you with a URL like:
- `https://contact-form-backend.onrender.com` (or similar)

**Copy this URL** - you'll need it for the next step!

### 6. Update Your Frontend

1. Go to your GitHub repository
2. Edit `index.html`
3. Find line 165 where it says:
   ```javascript
   const API_URL = 'http://127.0.0.1:3000/api/contact';
   ```
4. Change it to:
   ```javascript
   const API_URL = 'https://your-service-name.onrender.com/api/contact';
   ```
   (Replace with your actual Render URL)

5. Commit and push the change:
   ```bash
   git add index.html
   git commit -m "Update API URL for production"
   git push origin main
   ```

### 7. Test

1. Visit your GitHub Pages site: `https://martdev1963.github.io`
2. Navigate to the contact form
3. Submit a test message
4. Check your Gmail inbox!

## Important Notes

### Render Free Tier Limitations

- **Spinning down**: Free tier services spin down after 15 minutes of inactivity
- **First request**: The first request after spin-down may take 30-60 seconds
- **Upgrade**: Consider upgrading to a paid plan for always-on service

### Security

- ✅ Your `.env` file is NOT in the repository (protected by `.gitignore`)
- ✅ Environment variables are set securely in Render's dashboard
- ✅ Never commit your `.env` file or app passwords to GitHub

### Monitoring

- Check the **Logs** tab in Render to see server activity
- Monitor for any errors or issues

## Troubleshooting

### Service won't start
- Check the **Logs** tab in Render
- Verify all environment variables are set correctly
- Make sure the **Root Directory** is set to `backend`

### Email not sending
- Verify Gmail App Password is correct in environment variables
- Check Render logs for error messages
- Make sure 2-Step Verification is enabled on your Google Account

### CORS errors
- The server already has CORS enabled
- If issues persist, check that your frontend URL matches what's allowed

## Next Steps

After deployment:
1. ✅ Test the form on your live site
2. ✅ Monitor the first few submissions
3. ✅ Consider setting up email notifications for form submissions
4. ✅ Optionally add rate limiting for production use

## Support

If you encounter issues:
- Check Render's documentation: https://render.com/docs
- Review server logs in the Render dashboard
- Verify environment variables are set correctly

