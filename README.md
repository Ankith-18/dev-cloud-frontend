🚀 DevCloud - Developer Cloud Platform
📋 Overview
DevCloud is a comprehensive, enterprise-grade developer platform that enables teams to deploy services, manage cloud infrastructure, run CI/CD pipelines, and control feature flags through an intuitive dashboard interface.

https://via.placeholder.com/1200x600/1a1a2e/ffffff?text=DevCloud+Platform

✨ Key Features
🎯 Core Functionality
Project Management - Create and manage multiple projects with isolated environments
CI/CD Pipelines - Automated build, test, and deployment pipelines with step-by-step execution
Deployment Tracking - Monitor deployments across dev, staging, and production environments
Real-time Logs - Centralized logging with advanced filtering and search
Secrets Management - Securely store and manage environment variables and API keys
Feature Flags - Gradually roll out features with environment-based toggles

🎨 User Experience
3D Animated Landing Page - Stunning visuals with parallax effects and floating particles
AI Chat Assistant - Intelligent chatbot for instant user support
Dark Mode - Full dark theme support throughout the application
Responsive Design - Optimized for desktop, tablet, and mobile devices
Professional UI - Clean, modern interface with glass morphism and smooth animations

🔐 Authentication & Security
Multi-provider authentication (Email, GitHub, Google)
Complete password reset flow with OTP verification
JWT-based session management
Role-based access control ready

🛠️ Technology Stack
Frontend Framework
Next.js 15+ - React framework with App Router
TypeScript - Type-safe development
Tailwind CSS - Utility-first styling
Framer Motion - Smooth animations and transitions

-UI Components
Heroicons - Beautiful SVG icons
React Icons - Social media and brand icons
Custom Components - 25+ reusable UI components

-State & Data
React Hooks - Local state management
Axios - HTTP client for API integration
Service Layer - Modular API service architecture

-Development Tools
ESLint - Code linting
Prettier - Code formatting
Git - Version control

<img width="865" height="506" alt="image" src="https://github.com/user-attachments/assets/dbbf55ab-1349-4347-a631-0934547aa297" />
<img width="859" height="491" alt="image" src="https://github.com/user-attachments/assets/a58642fa-e20a-48ca-af78-5379b26d8f64" />

git clone https://github.com/yourusername/devcloud.git
cd devcloud
npm install
cp .env.example .env.local
# Backend API URL (update when backend is ready)
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# OAuth credentials (optional for now)
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

npm run dev
http://localhost:3000

**🎯 Key Pages & Features
Landing Page (/)
3D animated hero section with parallax effects
Floating stars background
AI chat assistant for instant help
Feature showcase with hover effects**

-Authentication Flow
Login (/login) - Email/password and social login
Signup (/signup) - Account creation
Forgot Password - Email verification with OTP
Reset Password - Secure password reset

-Dashboard (/dashboard)
Overview stats (projects, deployments, pipelines)
Recent activity feed
System notifications

-Projects (/projects)
Grid/table view toggle
Project cards with metadata
Environment management

-Quick actions (view, delete)
Pipelines (/pipelines)
Status filters (running, success, failed, pending)
Step-by-step execution view
Real-time logs per step
Pipeline retry functionality

-Deployments (/deployments)
Environment-based filtering
Deployment status tracking
Version information
Quick rollback ready

-Logs (/logs)
Real-time log streaming
Filter by service/environment/level
Search functionality
Auto-refresh toggle

-Secrets (/secrets)
Encrypted secret storage
Environment-specific secrets
Show/hide functionality
Copy to clipboard

-Feature Flags (/flags)
Toggle flags on/off
Environment-based targeting
Create new flags
Audit logging ready

-Settings (/settings)
Profile management
API keys
Session management
Notification preferences


