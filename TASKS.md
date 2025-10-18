Backend - Setup & Authentication:
- [x] Initialize Rails app with Postgres
- [x] Set up Users table with email, password_digest, username
- [x] Set up Sessions table with user_id, token, expires_at, revoked_at
- [x] Create User model with has_secure_password and validations
- [x] Create Session model with token generation and expiry
- [x] Build POST /api/v1/signup endpoint
- [x] Build POST /api/v1/login endpoint
- [x] Build DELETE /api/v1/logout endpoint
- [x] Implement authentication middleware (authenticate_user! + current_user)
- [x] Set up CORS for frontend requests

Frontend - Setup & Authentication:

- [x] Initialize React + TypeScript + Vite app
- [x] Set up React Router
- [x] Create Zustand auth store with persistence
- [x] Create axios instance with auth interceptor
- [x] Build LoginForm component
- [x] Build SignupForm component
- [x] Build Logout component
- [x] Implement protected routes based on currentUser

Backend - Database Schema
- [ ] Create wallets migration
Backend - Models & Associations
= [ ] Create wallets model
Backend - Seed Data
Backend - API Endpoints
Backend - Background Jobs
Frontend - Core Pages
Frontend - Services
Frontend - Types
Frontend - Styling
Testing
Docker
CI/CD
Deployment