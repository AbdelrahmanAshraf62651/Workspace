# Workspace Manager

A comprehensive workspace booking and management system built with React, TypeScript, and Bootstrap. This application provides a modern solution for managing co-working spaces, meeting rooms, and cafe services.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Pages Overview](#pages-overview)
- [API Integration](#api-integration)

## Features

### Customer Features

- **Account System** - Secure signup/login with role-based routing
- **Room Booking** - Live availability, time selection, pricing, and instant confirmation
- **Booking History** - View and track upcoming/past reservations
- **Workspace Gallery** - Browse rooms with images and descriptions
- **Cafe Menu** - Explore food/drinks and check stock status
- **Profile Management** - Update personal info and view history
- **Contact Form** - Send messages directly to administrators

---

### Admin Features

- **Dashboard** - Stats overview, charts, recent activity, and daily booking trends
- **Room Management** - Add, edit, delete, and toggle room visibility/availability
- **Booking Management** - Approve or cancel reservations
- **Gallery Manager** - Decide which rooms appear in the public gallery
- **Cafe Management** - Manage menu items, pricing, and stock availability
- **Message Center** - Read and respond to customer inquiries
- **Business Settings** - Update location, contact info, opening hours, and social media links
- **Access Logs** - Monitor room entry/exit history
- **Analytics** - View booking trends, category breakdowns, and detailed statistics

## Tech Stack

### Frontend

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe development
- **React Router DOM**: Client-side routing
- **Bootstrap 5**: Responsive UI framework
- **React Bootstrap**: Bootstrap components for React
- **Font Awesome**: Icon library
- **Axios**: HTTP client for API requests

### Backend API

- **Xano**: Backend-as-a-Service platform
- Base URL: `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO`

### Charts & Visualization

- **Recharts**: For analytics and data visualization

### Installation

1. **Clone the repository**

```bash
git clone <https://github.com/AbdelrahmanAshraf62651/Workspace.git>
cd workspace
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

## User Roles

### Customer Role

- Browse available workspaces
- Book rooms based on availability
- Manage personal bookings
- Order from cafe menu
- Update profile information
- Contact administrators

### Admin Role

- Full access to all customer features
- Dashboard with analytics
- Manage rooms and bookings
- Control gallery visibility
- Update cafe menu
- Respond to customer messages
- Configure business settings
- View access history logs

## Pages Overview

### Public Pages

#### Home (`/`)

- Landing page with hero section
- Quick access cards to main features
- Dynamically adjusts content based on login status

#### Gallery (`/gallery`)

- Carousel display of available workspaces
- Thumbnail navigation
- Filtered to show only visible rooms

#### Cafe (`/cafe`)

- Menu organized by category (Drinks/Food)
- Shows item availability status
- Prices in local currency (EGP)

#### About (`/about`)

- Business information and location
- Interactive map integration
- Contact details
- Opening hours by day
- Social media links
- Contact form

### Authentication Pages

#### Login (`/login`)

- Email and password authentication
- Role-based redirect (admin → dashboard, customer → home)
- Error handling and validation
- Responsive split-screen design

#### Signup (`/signup`)

- User registration with validation
- Password strength requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one number
  - At least one special symbol
- Phone number collection
- Terms of service agreement

### Customer Pages

#### Booking (`/booking`)

- Date and time selection
- Duration picker (1-4 hours)
- Real-time availability checking
- Hourly rate calculation
- Room filtering based on schedule
- Immediate booking confirmation

#### Profile (`/profile`)

- Personal information display
- Booking history with status
- Profile editing capabilities

### Admin Pages

#### Admin Dashboard (`/dashboard`)

- Key statistics cards:
  - Total bookings
  - Available rooms
  - Cafe items
  - Total users
- Room status table
- Booking analytics pie chart
- Daily booking trends
- Recent activity feed
- Quick action buttons

#### Room Management (`/edit-room-schedule`)

- Add new rooms with:
  - Name and type
  - Description
  - Capacity
  - Hourly rate
  - Image upload
- Edit existing rooms
- Toggle availability status
- Delete rooms
- Real-time updates

#### Booking Management (`/booking-management`)

- View all bookings across the system
- Filter and sort capabilities
- Booking status management:
  - Confirm pending bookings
  - Cancel confirmed/pending bookings
- User information display
- Cost and timing details
- Statistics overview

#### Gallery Manager (`/admin-gallery`)

- Control gallery visibility per room
- Edit room information
- Manage room descriptions
- Image management
- Toggle public visibility

#### Cafe Management (`/cafe-management`)

- Add/edit menu items
- Category management (Food/Drinks)
- Stock availability toggle
- Price management
- Image upload for items
- Description editing

#### Contact Messages (`/contact-messages-management`)

- View all customer inquiries
- Mark as read/unread
- Delete messages
- Email customer details
- Message timestamp tracking
- Unread message counter

#### About Settings (`/admin-about`)

- Location settings:
  - Address
  - Map link integration
- Opening hours configuration
- Contact information management
- Social media links
- Live preview of changes

#### Access History (`/access-history`)

- Comprehensive access log
- Filter by:
  - User name
  - Room ID
  - Date range
- Event types (Entry/Exit)
- Status tracking (Success/Failed/Pending)
- Search functionality

## API Integration

### Base URL

```
https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO
```

### Endpoints

#### Authentication

```typescript
POST / auth / signup;
POST / auth / login;
```

#### Rooms

```typescript
GET    /room           // Get all rooms
GET    /room/:id       // Get specific room
POST   /room           // Create room
PATCH  /room/:id       // Update room
DELETE /room/:id       // Delete room
GET    /room_analytics // Get booking statistics
```

#### Bookings

```typescript
GET    /booking        // Get all bookings
POST   /booking        // Create booking
PATCH  /booking/:id    // Update booking
DELETE /booking/:id    // Delete booking
```

#### Cafe Items

```typescript
GET    /cafe_item      // Get all items
POST   /cafe_item      // Create item
PATCH  /cafe_item/:id  // Update item
DELETE /cafe_item/:id  // Delete item
```

#### Users

```typescript
GET    /user           // Get all users
GET    /user/:id       // Get specific user
```

#### Contact Messages

```typescript
GET    /contact_message      // Get all messages
POST   /contact_message      // Send message
PATCH  /contact_message/:id  // Update message
DELETE /contact_message/:id  // Delete message
```

#### Location/About

```typescript
GET / location / 1; // Get business info
PATCH / location / 1; // Update business info
```
