# Admin Dashboard Documentation

## Overview
A comprehensive admin dashboard has been created to manage all pages, SEO content, images, and other settings for the entire website.

## Features

### 1. **Secure Login System**
- **Login URL**: `/admin/login`
- **Credentials**:
  - Email: `kashifal074848@gmail.com`
  - Password: `Kashifali#`
- Authentication is stored in localStorage
- Protected routes - redirects to login if not authenticated

### 2. **Dashboard Features**
- **Dashboard URL**: `/admin/dashboard`
- View all pages in a table format
- Search functionality to find specific pages
- Filter by category (Text Tools, SEO Tools, Calculator Tools, etc.)
- Statistics overview:
  - Total pages count
  - Number of categories
  - SEO optimized pages
  - Pages with images

### 3. **Page Management**
Each page can be edited with the following SEO settings:
- **Basic Information**:
  - Page Name
  - Category
  
- **SEO Settings**:
  - Meta Title
  - Meta Description
  - Keywords (comma separated)
  - OG Image URL
  - OG Title
  - OG Description

### 4. **Data Storage**
- All page data is stored in localStorage under the key `pagesData`
- Changes are saved immediately and persist across sessions
- Initial data includes all 70+ pages from the website

### 5. **Access Button**
- A floating admin button is added to the homepage (bottom-right corner)
- Click the Settings icon to navigate to admin login
- Tooltip appears on hover

## How to Use

### Accessing the Dashboard
1. Go to the homepage
2. Click the floating Settings button in the bottom-right corner
3. Enter the admin credentials
4. You'll be redirected to the dashboard

### Editing a Page
1. From the dashboard, find the page you want to edit
2. Use the search bar or category filter to locate it
3. Click the "Edit" button
4. Update the SEO content, images, or other settings
5. Click "Save Changes" to save
6. Click "Cancel" to discard changes

### Managing SEO Content
- **Meta Title**: The title that appears in search results
- **Meta Description**: The description shown in search results
- **Keywords**: Comma-separated keywords for SEO
- **OG Image**: URL to the Open Graph image for social media
- **OG Title**: Title for social media sharing
- **OG Description**: Description for social media sharing

### Logging Out
- Click the "Logout" button in the top-right corner
- You'll be redirected to the login page
- Authentication token will be removed

## Technical Details

### File Structure
```
src/
├── pages/
│   └── admin/
│       ├── Login.tsx          # Admin login page
│       └── Dashboard.tsx      # Admin dashboard
├── utils/
│   └── pagesData.ts          # Initial pages data and types
└── App.tsx                    # Routes configuration
```

### Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected)

### Data Structure
```typescript
interface PageData {
  id: string;
  name: string;
  path: string;
  category: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
  };
}
```

## Categories Managed
1. Text Tools (18 pages)
2. SEO Tools (16 pages)
3. Calculator Tools (15 pages)
4. Unit Converters (12 pages)
5. Color Tools (8 pages)
6. File Tools (4 pages)
7. Audio Tools (2 pages)
8. Video Tools (1 page)

**Total: 76 pages**

## Security Notes
- Credentials are hardcoded for simplicity
- For production, implement proper backend authentication
- Consider adding JWT tokens or session management
- Add password hashing and secure storage

## Future Enhancements
- Image upload functionality
- Bulk edit capabilities
- Export/Import SEO data
- Analytics integration
- Version history for changes
- User role management
- Backend API integration
