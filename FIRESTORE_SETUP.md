# Firestore Database Setup Guide

This guide will help you set up your Firestore database with the correct structure and initial data.

## Step 1: Apply Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `companywebsite-bc68b`
3. Click "Firestore Database" in the left sidebar
4. Go to the "Rules" tab
5. Copy the contents from `firestore.rules` file in this project
6. Paste it into the rules editor
7. Click "Publish"

## Step 2: Create Admin User Document

**Important**: You must create this document for the admin user to access the admin panel.

1. In Firestore Database, go to the "Data" tab
2. Click "Start collection"
3. Collection ID: `users`
4. Click "Next"
5. For the first document:
   - Document ID: **Use your Firebase Auth UID** (find it in Authentication > Users)
   - Add the following fields:

   ```
   Field name        | Type      | Value
   ------------------|-----------|------------------
   uid               | string    | [your-auth-uid]
   email             | string    | [your-email@example.com]
   displayName       | string    | [Your Name]
   role              | string    | admin
   emailVerified     | boolean   | true
   createdAt         | timestamp | [current timestamp]
   lastLogin         | timestamp | [current timestamp]
   ```

6. Click "Save"

## Step 3: Initialize Collections (Optional)

You can either:
- **Option A**: Let the admin panel create collections as you add content (recommended for beginners)
- **Option B**: Pre-create collections with sample data (recommended for testing)

### Option B: Pre-create Collections

#### 1. Company Info Collection

Collection ID: `companyInfo`
Document ID: `main`

```json
{
  "name": "Your Company Name",
  "logo": "",
  "tagline": "Your Company Tagline",
  "description": "Brief description of your company",
  "email": "contact@yourcompany.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, City, State 12345",
  "socialMedia": {
    "facebook": "https://facebook.com/yourcompany",
    "twitter": "https://twitter.com/yourcompany",
    "instagram": "https://instagram.com/yourcompany",
    "linkedin": "https://linkedin.com/company/yourcompany"
  },
  "updatedAt": [timestamp]
}
```

#### 2. Theme Settings Collection

Collection ID: `themeSettings`
Document ID: `main`

```json
{
  "primaryColor": "#3b82f6",
  "secondaryColor": "#8b5cf6",
  "accentColor": "#f59e0b",
  "backgroundColor": "#ffffff",
  "textColor": "#1f2937",
  "headingFont": "Geist",
  "bodyFont": "Geist",
  "borderRadius": "md",
  "updatedAt": [timestamp]
}
```

#### 3. Hero Section Collection

Collection ID: `hero`
Document ID: `main`

```json
{
  "title": "Welcome to Our Company",
  "subtitle": "We provide amazing solutions for your business",
  "backgroundType": "gradient",
  "gradientFrom": "#3b82f6",
  "gradientTo": "#8b5cf6",
  "ctaButtons": {
    "primary": {
      "label": "Get Started",
      "href": "/contact"
    },
    "secondary": {
      "label": "Learn More",
      "href": "/about"
    }
  },
  "updatedAt": [timestamp]
}
```

#### 4. Navigation Collection

Collection ID: `navigation`
Document ID: `main`

```json
{
  "logo": "",
  "links": [
    {
      "id": "home",
      "label": "Home",
      "href": "/",
      "order": 0,
      "isExternal": false,
      "openInNewTab": false
    },
    {
      "id": "about",
      "label": "About",
      "href": "/about",
      "order": 1,
      "isExternal": false,
      "openInNewTab": false
    },
    {
      "id": "services",
      "label": "Services",
      "href": "/services",
      "order": 2,
      "isExternal": false,
      "openInNewTab": false
    },
    {
      "id": "projects",
      "label": "Projects",
      "href": "/projects",
      "order": 3,
      "isExternal": false,
      "openInNewTab": false
    },
    {
      "id": "contact",
      "label": "Contact",
      "href": "/contact",
      "order": 4,
      "isExternal": false,
      "openInNewTab": false
    }
  ],
  "ctaButton": {
    "label": "Get Started",
    "href": "/contact",
    "style": "primary"
  },
  "updatedAt": [timestamp]
}
```

#### 5. Services Section Collection

Collection ID: `services`
Document ID: `main`

```json
{
  "title": "Our Services",
  "subtitle": "What we offer to help you succeed",
  "services": [
    {
      "id": "service1",
      "title": "Service 1",
      "description": "Description of service 1",
      "icon": "icon-name",
      "order": 0,
      "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ]
    },
    {
      "id": "service2",
      "title": "Service 2",
      "description": "Description of service 2",
      "icon": "icon-name",
      "order": 1,
      "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ]
    }
  ],
  "updatedAt": [timestamp]
}
```

#### 6. Section Visibility Collection

Collection ID: `sectionVisibility`
Document ID: `main`

```json
{
  "hero": true,
  "about": true,
  "services": true,
  "projects": true,
  "testimonials": true,
  "team": false,
  "faq": false,
  "contact": true
}
```

#### 7. Footer Collection

Collection ID: `footer`
Document ID: `main`

```json
{
  "companyDescription": "Brief description of your company that appears in the footer.",
  "columns": [
    {
      "id": "company",
      "title": "Company",
      "links": [
        {"label": "About Us", "href": "/about"},
        {"label": "Services", "href": "/services"},
        {"label": "Projects", "href": "/projects"}
      ]
    },
    {
      "id": "support",
      "title": "Support",
      "links": [
        {"label": "Contact", "href": "/contact"},
        {"label": "FAQ", "href": "/faq"},
        {"label": "Privacy Policy", "href": "/privacy"}
      ]
    }
  ],
  "copyrightText": "© 2025 Your Company. All rights reserved.",
  "updatedAt": [timestamp]
}
```

#### 8. Contact Section Collection

Collection ID: `contact`
Document ID: `main`

```json
{
  "title": "Get in Touch",
  "subtitle": "We'd love to hear from you",
  "email": "contact@yourcompany.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, City, State 12345",
  "showContactForm": true,
  "updatedAt": [timestamp]
}
```

#### 9. SEO Settings Collection

Collection ID: `seo`
Document ID: `main`

```json
{
  "metaTitle": "Your Company Name - Your Tagline",
  "metaDescription": "Description of your company for search engines",
  "metaKeywords": ["keyword1", "keyword2", "keyword3"],
  "ogImage": "",
  "favicon": "",
  "updatedAt": [timestamp]
}
```

## Step 4: Create Individual Documents for Projects/Testimonials

### Example Project Document

Collection ID: `projects`
Document ID: [auto-generated]

```json
{
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description of the project",
  "images": ["cloudinary-url-1", "cloudinary-url-2"],
  "category": "Web Development",
  "tags": ["React", "Next.js", "TypeScript"],
  "liveUrl": "https://project-url.com",
  "githubUrl": "https://github.com/user/repo",
  "order": 0,
  "featured": true,
  "createdAt": [timestamp]
}
```

### Example Testimonial Document

Collection ID: `testimonials`
Document ID: [auto-generated]

```json
{
  "name": "Client Name",
  "company": "Client Company",
  "position": "CEO",
  "quote": "This is an amazing service! Highly recommended.",
  "avatar": "cloudinary-url",
  "rating": 5,
  "order": 0
}
```

## Step 5: Verify Setup

1. Log in to the admin panel: http://localhost:3000/admin/login
2. You should see the dashboard with no errors
3. Try navigating to different sections in the sidebar
4. Visit the public site: http://localhost:3000

## Troubleshooting

### "Permission denied" errors
- Verify security rules are published
- Check that your user document exists with `role: 'admin'`
- Make sure the document ID matches your Firebase Auth UID

### Can't log in
- Verify Firebase credentials in `.env.local`
- Check that email/password are correct
- Check browser console for detailed errors

### Collections not appearing
- Make sure you're using the exact collection names from the COLLECTIONS constant
- Check that documents have the correct structure
- Verify timestamp fields are using Firestore timestamps, not strings

## Next Steps

1. Start adding content through the admin panel
2. Upload images via Cloudinary integration
3. Customize the theme to match your brand
4. Add your projects and testimonials
5. Configure SEO settings

## Notes

- All collections are optional except `users`
- The admin panel will create missing collections automatically when you save data
- You can always edit/delete data directly in the Firebase Console if needed
- Remember to backup your data regularly
