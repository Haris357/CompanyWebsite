# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fully dynamic company showcase website where EVERYTHING is customizable through an admin panel. Built with Next.js 15.5.4, React 19, TypeScript, Tailwind CSS v4, Firebase (Auth + Firestore), and Cloudinary for media management. The project uses the Next.js App Router architecture with Turbopack for development and builds.

**Key Features:**
- Dynamic content management through Firebase Firestore
- Admin authentication with Firebase Auth
- Media uploads via Cloudinary
- Framer Motion for animations
- Fully customizable: company info, theme, hero section, services, projects, testimonials, team, FAQ, and more

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Next.js development server with Turbopack on http://localhost:3000. Changes auto-reload.

### Building for Production
```bash
npm run build
```
Creates an optimized production build using Turbopack.

### Running Production Build
```bash
npm start
```
Starts the Next.js production server (requires running `npm run build` first).

## Environment Setup

Copy `.env.example` to `.env.local` and fill in your Firebase and Cloudinary credentials:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project Architecture

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout with fonts and metadata
│   ├── globals.css                   # Global styles with Tailwind v4
│   ├── (public)/                     # Public website route group
│   │   ├── layout.tsx                # Public layout wrapper
│   │   ├── page.tsx                  # Homepage (dynamic content from Firebase)
│   │   └── components/               # Public-facing components
│   └── admin/                        # Admin panel (protected routes)
│       ├── layout.tsx                # Admin layout with auth protection
│       ├── login/                    # Login page
│       │   └── page.tsx
│       ├── dashboard/                # Admin dashboard
│       │   └── page.tsx
│       └── components/               # Admin-specific components
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── admin/                        # Reusable admin components
│   └── public/                       # Reusable public components
├── lib/
│   ├── firebase.ts                   # Firebase initialization
│   ├── firestore.ts                  # Firestore CRUD operations
│   ├── auth.ts                       # Authentication helpers
│   ├── cloudinary.ts                 # Cloudinary upload/optimization
│   └── utils.ts                      # Utility functions (cn, date formatting, etc.)
├── types/
│   ├── index.ts                      # All data type definitions
│   └── firebase.ts                   # Firebase-specific types
├── hooks/
│   ├── useAuth.ts                    # Authentication hook
│   └── useFirestore.ts               # Firestore operations hook
└── config/
    └── site.ts                       # Site-wide configuration
```

### Key Technologies

**Next.js App Router**: Uses the App Router with route groups:
- `(public)` - Public-facing website (no auth required)
- `admin` - Admin panel (Firebase Auth protected)
- Server Components are the default; use `"use client"` directive for client-side interactivity
- Path alias: `@/*` maps to `./src/*`

**Firebase Integration**:
- **Authentication**: Firebase Auth for admin login (email/password)
- **Database**: Firestore for all dynamic content storage
- **Collections**: `companyInfo`, `themeSettings`, `navigation`, `hero`, `services`, `projects`, `testimonials`, `footer`, `contact`, `about`, `team`, `faq`, `seo`, `users`
- **Real-time**: Firestore snapshots for live updates
- Located in: `src/lib/firebase.ts`, `src/lib/firestore.ts`, `src/lib/auth.ts`

**Cloudinary Integration**:
- Client-side unsigned uploads for images/videos
- Server-side operations for deletion (requires API secret)
- Image optimization and transformations
- Responsive image URLs with automatic format selection
- Located in: `src/lib/cloudinary.ts`

**Custom Hooks**:
- `useAuth()` - Manages authentication state, sign in/out, password reset
- `useDocument()` - Subscribe to single Firestore document with real-time updates
- `useCollection()` - Subscribe to Firestore collection with real-time updates
- `useFirestore()` - CRUD operations (create, update, delete, get, query)
- `useBatchFirestore()` - Batch operations for multiple documents

**TypeScript Types**:
- All data structures defined in `src/types/index.ts`
- Comprehensive types for: Company Info, Theme Settings, Navigation, Hero, Services, Projects, Testimonials, Team, FAQ, SEO, etc.
- Firebase-specific types in `src/types/firebase.ts`
- Use `COLLECTIONS` constant for collection names

**Tailwind CSS v4**:
- Import via `@import "tailwindcss"` in CSS (no config file needed)
- CSS variables defined with `@theme inline` directive in globals.css
- Custom theme values: `--font-sans`, `--font-mono`, `--color-background`, `--color-foreground`
- Dark mode via `prefers-color-scheme` media query

**Utility Functions** (`src/lib/utils.ts`):
- `cn()` - Merge Tailwind classes with clsx + tailwind-merge
- Date formatting, validation, slug generation, debounce, etc.
- File size formatting, clipboard operations, color contrast detection

### Data Flow

1. **Public Website**:
   - Fetches all content from Firestore collections
   - Displays dynamically based on section visibility settings
   - Real-time updates when admin makes changes

2. **Admin Panel**:
   - Protected by Firebase Auth (admin role required)
   - CRUD operations on all content collections
   - Media uploads to Cloudinary
   - Real-time preview of changes

### Authentication Flow

1. Admin visits `/admin/login`
2. Signs in with email/password
3. `useAuth` hook manages auth state
4. Admin layout checks for authentication and admin role
5. Redirects to dashboard if authenticated, login if not
6. All admin routes are protected by the layout

### Firestore Operations

Use the custom hooks for all Firestore operations:

```typescript
// Subscribe to a single document
const { data, loading, error } = useDocument<CompanyInfo>('companyInfo', 'main');

// Subscribe to a collection
const { data, loading, error } = useCollection<Project>('projects');

// CRUD operations
const { create, update, remove, get, getAll } = useFirestore<Project>('projects');
await create({ title: 'New Project', ... });
await update('projectId', { title: 'Updated' });
await remove('projectId');
```

### Cloudinary Operations

```typescript
// Upload image from client
const result = await uploadImageClient(file, 'folder-name');
// Returns: { url, publicId, width, height }

// Get optimized image URL
const optimizedUrl = getOptimizedImageUrl(publicId, {
  width: 800,
  height: 600,
  quality: 'auto',
  format: 'auto'
});

// Upload video
const videoResult = await uploadVideoClient(file);
```

### Important Notes

- **Turbopack**: Both dev and build commands use `--turbopack` flag. Do not remove this flag.
- **React 19**: Uses the latest React version with new features and behaviors.
- **Client Components**: All components using hooks, state, or browser APIs must have `"use client"` directive.
- **Admin Access**: Only users with `role: 'admin'` in Firestore `users` collection can access admin panel.
- **Real-time Updates**: Use Firestore snapshots (via custom hooks) for live updates across admin and public sites.
- **Image Optimization**: Always use Cloudinary transformations for responsive images.
- **Type Safety**: All Firestore operations are fully typed using TypeScript interfaces.

### Creating New Admin Pages

1. Create page in `src/app/admin/[section]/page.tsx`
2. Use `"use client"` directive if using hooks/state
3. Use `useAuth()` to check authentication (layout already protects route)
4. Use `useFirestore()` or `useDocument()`/`useCollection()` for data
5. Import types from `@/types`

### Creating New Public Components

1. Create component in `src/app/(public)/components/` or `src/components/public/`
2. Fetch data using `useDocument()` or `useCollection()` hooks
3. Use Framer Motion for animations
4. Ensure responsive design with Tailwind CSS
5. Handle loading and error states
