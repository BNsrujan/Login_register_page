# Login & Register Page - React Frontend

A authentication system built with React, TypeScript, and Vite. Features secure user registration, login functionality, and protected routes with JWT token management.

## Features

- **User Authentication**: Complete login and registration system
- **Protected Routes**: Middleware-based route protection
- **JWT Token Management**: Automatic token refresh and secure storage
- **Form Validation**: Client-side validation with real-time error feedback
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, animated interface with Framer Motion
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router v7
- **Styling**: Tailwind CSS with custom animations
- **HTTP Client**: Axios for API communication
- **Authentication**: JWT tokens with refresh mechanism
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Code Quality**: ESLint + Prettier

## Project Structure

```
Frontend-vite/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login.tsx          # Login component
│   │   │   └── register.tsx       # Registration component
│   │   ├── Dashboard.tsx          # Protected dashboard page
│   │   ├── LandingPage.tsx        # Public landing page
│   │   ├── MiddleWare.tsx         # Route protection middleware
│   │   └── NotFound.tsx           # 404 error page
│   ├── components/
│   │   └── ui/                    # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts               # Authentication utilities
│   │   └── utils.ts              # General utilities
│   ├── styles/
│   │   └── index.css             # Global styles
│   ├── App.tsx                   # Main app component with routing
│   └── main.tsx                  # Application entry point
├── public/                       # Static assets
└── package.json                  # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend-vite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

### Registration Process
1. User fills out registration form (first name, last name, email, password)
2. Client-side validation ensures:
   - Valid email format
   - Password minimum 8 characters
   - Password contains numbers and special characters
   - Password confirmation matches
3. API call to `/api/register` endpoint
4. Successful registration redirects to dashboard

### Login Process
1. User enters email and password
2. Client-side email validation
3. API call to `/api/login` endpoint
4. JWT tokens stored in localStorage
5. Redirect to dashboard on success

### Protected Routes
- Routes under `MiddleWare` component require authentication
- Automatic token validation on route access
- Redirect to login if tokens are missing/invalid
- Token refresh mechanism for expired access tokens

## UI/UX Features

- **Animated Form Labels**: Floating labels with smooth transitions
- **Real-time Validation**: Instant feedback on form errors
- **Loading States**: User feedback during API calls
- **Responsive Design**: Works  on all device sizes
- **Error Handling**: error messages for different scenarios

## API Integration

The frontend expects a backend API with the following endpoints:

- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `POST /api/refresh` - Token refresh
- `GET /api/protected-route` - Protected data access

### Expected API Response Format

**Login/Register Success:**
```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

**Token Refresh:**
```json
{
  "accessToken": "new_jwt_access_token"
}
```

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.


