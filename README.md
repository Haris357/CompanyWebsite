# Dynamic Company Website

A fully customizable company showcase website where **EVERYTHING** is managed through an admin panel. Built with modern technologies for maximum flexibility and ease of use.

## Features

### For End Users (Public Website)
- 🎨 Beautiful, responsive design that works on all devices
- ⚡ Lightning-fast performance with Next.js 15
- 🌓 Automatic dark mode support
- 📱 Mobile-first approach
- ♿ Accessible and SEO-optimized

### For Administrators (Admin Panel)
- 🔐 Secure authentication with Firebase
- 📊 Intuitive dashboard for content management
- 🎨 Complete theme customization (colors, fonts, styling)
- 📝 Dynamic content editing for all sections:
  - Company Information
  - Hero Section
  - Services
  - Projects/Portfolio
  - Testimonials
  - Team Members
  - FAQ
  - Contact Information
- 🖼️ Easy media management with Cloudinary
- 👁️ Real-time preview of changes
- 📱 Mobile-friendly admin interface

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication + Firestore Database)
- **Media Storage**: Cloudinary
- **Build Tool**: Turbopack

## Quick Start

### Prerequisites

- Node.js 18 or higher
- Firebase account (free tier)
- Cloudinary account (free tier)

### Installation

1. **Clone the repository** (or download the code)

2. **Install dependencies**:
```bash
npm install
```

3. **Set up Firebase**:
   - Create a Firebase project
   - Enable Email/Password authentication
   - Create Firestore database
   - Add an admin user (see [SETUP.md](./SETUP.md) for details)

4. **Set up Cloudinary**:
   - Create a Cloudinary account
   - Create an unsigned upload preset
   - Get your credentials

5. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase and Cloudinary credentials

6. **Run the development server**:
```bash
npm run dev
```

7. **Access the application**:
   - Public website: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login
   - Admin dashboard: http://localhost:3000/admin/dashboard

## Detailed Setup

For a complete step-by-step setup guide, see [SETUP.md](./SETUP.md).

For technical architecture and development guidelines, see [CLAUDE.md](./CLAUDE.md).

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public website routes
│   │   ├── page.tsx         # Homepage
│   │   └── components/      # Public components
│   └── admin/               # Admin panel routes
│       ├── login/           # Login page
│       └── dashboard/       # Admin dashboard
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── admin/               # Admin-specific components
│   └── public/              # Public-facing components
├── lib/                     # Core utilities
│   ├── firebase.ts          # Firebase configuration
│   ├── firestore.ts         # Database operations
│   ├── auth.ts              # Authentication
│   ├── cloudinary.ts        # Media management
│   └── utils.ts             # Helper functions
├── types/                   # TypeScript type definitions
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication hook
│   └── useFirestore.ts      # Database operations hook
└── config/                  # Configuration files
    └── site.ts              # Site-wide settings
```

## Usage

### Admin Panel

1. **Login**: Navigate to `/admin/login` and sign in with your admin credentials
2. **Dashboard**: View overview and quick actions
3. **Manage Content**: Edit all sections of your website through intuitive forms
4. **Upload Media**: Drag and drop images/videos directly to Cloudinary
5. **Customize Theme**: Change colors, fonts, and styling in real-time
6. **Preview**: Visit the public site to see your changes live

### Public Website

The public website automatically displays all content from your Firestore database. Changes made in the admin panel appear in real-time without requiring a rebuild or redeployment.

## Firestore Collections

The application uses the following Firestore collections:

- `companyInfo` - Company name, logo, contact details, social media
- `themeSettings` - Colors, fonts, styling preferences
- `navigation` - Menu items, CTA buttons
- `hero` - Hero section content and background
- `services` - Services offered by the company
- `projects` - Portfolio items/case studies
- `projectSection` - Projects section configuration
- `testimonials` - Client testimonials
- `footer` - Footer content and links
- `contact` - Contact information and form settings
- `about` - About section content
- `team` - Team member profiles
- `faq` - Frequently asked questions
- `seo` - SEO settings and metadata
- `sectionVisibility` - Control which sections appear on the site
- `users` - Admin user accounts

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Run production server

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted Node.js server

Make sure to set all environment variables on your hosting platform.

## Environment Variables

Required environment variables (see `.env.example`):

### Firebase
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Cloudinary
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- `CLOUDINARY_API_KEY` (server-side only)
- `CLOUDINARY_API_SECRET` (server-side only)

### Site Configuration
- `NEXT_PUBLIC_SITE_URL`

## Security

- **Authentication**: Firebase Auth with email/password
- **Authorization**: Role-based access control (admin role required)
- **Database**: Firestore security rules prevent unauthorized access
- **Environment Variables**: Sensitive credentials stored in `.env.local` (not committed)
- **Client-side**: Only public data is accessible to non-authenticated users

## Performance

- **Server Components**: Default rendering strategy for optimal performance
- **Image Optimization**: Cloudinary automatic format and quality optimization
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: Firebase offline persistence for better UX
- **Build Tool**: Turbopack for faster builds and HMR

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a private project, but if you have suggestions or find bugs:
1. Document the issue
2. Provide steps to reproduce
3. Include screenshots if applicable

## License

Private project - All rights reserved

## Support

For setup help, see [SETUP.md](./SETUP.md).

For technical documentation, see [CLAUDE.md](./CLAUDE.md).

## Roadmap

Future enhancements:
- [ ] Blog functionality with markdown support
- [ ] Advanced analytics dashboard
- [ ] Email newsletter integration
- [ ] Multi-language support
- [ ] Advanced SEO tools
- [ ] Social media auto-posting
- [ ] Content scheduling
- [ ] Version history and rollback
- [ ] Custom domain management
- [ ] Performance monitoring

---

Built with ❤️ using Next.js, Firebase, and Cloudinary
