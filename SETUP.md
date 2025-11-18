# Setup Guide

This guide will help you set up and configure your dynamic company website.

## Prerequisites

- Node.js 18+ installed
- Firebase account (free tier works)
- Cloudinary account (free tier works)

## Step 1: Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

## Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project (e.g., "company-website")
4. Follow the setup wizard

### 2.2 Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method

### 2.3 Create Admin User

1. In Authentication > Users, click "Add user"
2. Enter your email and password
3. **Important**: After creating the user, you need to add admin role in Firestore

### 2.4 Set Up Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Start in **production mode** (you'll set up rules next)
4. Choose a location closest to your users

### 2.5 Configure Firestore Rules

Go to Firestore > Rules and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all public content
    match /{collection}/{document=**} {
      allow read: if collection in [
        'companyInfo',
        'themeSettings',
        'navigation',
        'hero',
        'services',
        'projects',
        'projectSection',
        'testimonials',
        'footer',
        'contact',
        'about',
        'team',
        'faq',
        'seo',
        'sectionVisibility'
      ];
    }

    // Users collection - only authenticated users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Admin write access - only for users with admin role
    match /{collection}/{document=**} {
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 2.6 Create Admin User Document

1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `users`
4. Document ID: Use your Firebase Auth UID (copy from Authentication > Users)
5. Add fields:
   ```
   uid: [your-auth-uid]
   email: [your-email]
   displayName: [your-name]
   role: admin
   emailVerified: true
   createdAt: [timestamp]
   lastLogin: [timestamp]
   ```

### 2.7 Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app
5. Copy the config values

## Step 3: Cloudinary Setup

### 3.1 Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account

### 3.2 Create Upload Preset

1. Go to Settings > Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Name it (e.g., "company-website-unsigned")
5. Set Signing Mode to "Unsigned"
6. Set Folder to "company-website" (optional)
7. Click "Save"

### 3.3 Get Cloudinary Config

1. Go to Dashboard
2. Copy your Cloud Name
3. Copy API Key and API Secret from Account Details

## Step 4: Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your credentials in `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=company-website-unsigned
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Run Development Server

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Admin dashboard: http://localhost:3000/admin/dashboard

## Step 6: First Login

1. Go to http://localhost:3000/admin/login
2. Sign in with the email/password you created in Firebase
3. You should be redirected to the admin dashboard

## Troubleshooting

### "Failed to sign in" Error

- Check that your email/password are correct in Firebase Authentication
- Verify Firebase config in `.env.local`
- Check browser console for detailed error messages

### "Not authorized" or Redirected to Home

- Make sure you created the user document in Firestore `users` collection
- Verify the `role` field is set to `admin`
- Check that the document ID matches your Firebase Auth UID

### Firestore Permission Denied

- Verify Firestore rules are properly configured
- Check that admin user document exists with correct role
- Make sure you're signed in

### Images Not Uploading

- Verify Cloudinary credentials in `.env.local`
- Check that upload preset is set to "Unsigned"
- Ensure file size is under 10MB for images, 100MB for videos

## Next Steps

Once you're logged into the admin dashboard, you can:

1. **Set up Company Information**
   - Add company name, logo, contact details
   - Configure social media links

2. **Customize Theme**
   - Set brand colors
   - Choose fonts
   - Configure styling preferences

3. **Create Content**
   - Add hero section content
   - Create services
   - Upload projects/portfolio items
   - Add testimonials
   - Create team member profiles
   - Set up FAQ section

4. **Configure Navigation**
   - Add/edit menu items
   - Set up CTA buttons
   - Organize page structure

5. **Preview Your Site**
   - Visit http://localhost:3000 to see your public website
   - All changes in admin panel update in real-time!

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Update Firebase Configuration

After deployment, update:
1. Firebase Authentication: Add your production domain to authorized domains
2. Update `NEXT_PUBLIC_SITE_URL` in environment variables

## Support

For issues or questions:
- Check CLAUDE.md for architecture details
- Review Firebase/Cloudinary documentation
- Check browser console for error messages
