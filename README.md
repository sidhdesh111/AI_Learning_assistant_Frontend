# 🎓 AI Learning Assistant - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2-38b2ac?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**Your AI-powered learning companion at your fingertips!** 🚀📚

[Features](#-features) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Components](#-components) • [Contributing](#-contributing)

</div>

---

## 🎯 Overview

**AI Learning Assistant Frontend** is a modern, responsive web application built with **React 19** and **TypeScript** that brings intelligent learning to life. Upload documents, chat with AI, generate flashcards and quizzes, and track your learning journey—all with a beautiful, intuitive interface.

### 💡 Why Use This App?
- **Lightning-Fast** - Built with Vite for instant development experience
- **Beautiful UI** - Tailwind CSS with modern design patterns
- **Type-Safe** - Full TypeScript support for reliability
- **Responsive** - Works seamlessly on all devices
- **Smart Learning** - AI-powered study features that adapt to you

---

## ✨ Key Features

### 📚 Document Management
- **Smart Upload** - Drag-and-drop PDF uploads with progress tracking
- **Document Viewer** - Built-in PDF viewer with navigation controls
- **Document Organization** - Organize and manage all your study materials
- **Quick Access** - One-click access to all study resources

### 🤖 AI-Powered Learning Tools
- **💬 AI Chat** - Chat with Gemini AI about your documents in real-time
- **🎯 Flashcard Generator** - Auto-generate flashcards from any document
- **❓ Quiz Creator** - Intelligent quizzes with multiple difficulty levels
- **📝 Smart Summaries** - Concise summaries of lengthy materials
- **💡 Concept Explainer** - Deep explanations of complex topics

### 📊 Learning Analytics
- **Progress Dashboard** - Track your learning progress at a glance
- **Quiz Performance** - Detailed analytics on quiz attempts
- **Study Statistics** - Comprehensive learning metrics and insights
- **Achievement Tracking** - Monitor your milestones and improvements

### 🔐 User & Security
- **Secure Authentication** - JWT-based login and registration
- **User Profiles** - Customize your profile with avatar and preferences
- **Protected Routes** - Secure access to all features
- **Automatic Session Management** - Seamless token refresh

### 🎨 User Experience
- **Dark Mode Support** - Easy on the eyes study sessions
- **Toast Notifications** - Real-time feedback for all actions
- **Smooth Animations** - Polished transitions and interactions
- **Mobile Optimized** - Perfect on phones, tablets, and desktops

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- Backend server running (see Backend README)

### Installation

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env.local
```

### Environment Configuration

Create a `.env.local` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_API_TIMEOUT=30000

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=false

# Environment
VITE_NODE_ENV=development
```

### Running the Application

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

App will be available at `http://localhost:5173`

---

## 📁 Project Structure

### Directory Organization

```
Frontend/
├── src/
│   ├── Components/              # Reusable UI components
│   │   ├── AI_Action/          # AI features interface
│   │   ├── auth/               # Authentication components
│   │   ├── chat/               # Chat interface
│   │   ├── common/             # Shared components
│   │   │   ├── EmptyState.tsx
│   │   │   ├── MarkdownRender.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── Tabs.tsx
│   │   ├── documents/          # Document components
│   │   ├── flashcards/         # Flashcard UI
│   │   ├── quizzes/            # Quiz components
│   │   ├── Sidebar/            # Navigation sidebar
│   │   ├── Header/             # App header
│   │   ├── Footer/             # App footer
│   │   ├── Loader/             # Loading states
│   │   └── layout/             # Layout components
│   ├── Pages/                  # Page components
│   │   ├── Home/               # Landing page
│   │   ├── Dashboard/          # Main dashboard
│   │   ├── Documents/          # Documents page
│   │   ├── Flashcards/         # Flashcards page
│   │   ├── Quizzes/            # Quizzes page
│   │   ├── Profile/            # User profile
│   │   ├── Auth/               # Auth pages (login, signup)
│   │   ├── About/              # About page
│   │   ├── Contact/            # Contact page
│   │   ├── Services/           # Services page
│   │   └── Not_Found.tsx       # 404 page
│   ├── Context/
│   │   └── AuthContext.tsx     # Global auth state
│   ├── Services/               # API service layer
│   │   ├── aiServices.ts
│   │   ├── authServices.ts
│   │   ├── documentService.ts
│   │   ├── flashcardServices.ts
│   │   ├── quizServices.ts
│   │   └── progressService.ts
│   ├── Router/
│   │   └── Route.tsx           # Route definitions
│   ├── Types/                  # TypeScript interfaces
│   │   ├── AIServiesTypes.ts
│   │   ├── CommonTypes.ts
│   │   ├── DocumentType.ts
│   │   ├── FlashcardType.ts
│   │   ├── ProgressTypes.ts
│   │   └── QuizTypes.ts
│   ├── Utils/                  # Utility functions
│   │   ├── ApiPaths.ts
│   │   ├── axiosInstance.ts
│   │   ├── tokenManager.ts
│   │   └── tokenRefreshService.ts
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

---

## 🧩 Component Architecture

### Core Components

#### Layout Components
```
AppLayout
├── Header
├── Sidebar
├── MainContent
└── Footer

MainLayout
└── Common layout for all pages
```

#### Page Components
- **Dashboard** - Central hub with all learning features
- **Documents** - Upload and manage study materials
- **Flashcards** - Create and review flashcards
- **Quizzes** - Take quizzes and view results
- **Profile** - User profile and settings

#### Feature Components
- **ChatInterface** - AI conversation interface
- **AI_Action** - AI feature launcher
- **DocumentCard** - Document preview and actions
- **FlashcardTabs** - Flashcard viewing and management
- **Quiz_Tab** - Quiz interface and results

---

## 🎨 Technology Stack

| Category | Technology |
|----------|------------|
| **UI Framework** | React 19 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.2 |
| **Build Tool** | Vite 8.0 |
| **Routing** | React Router v7 |
| **HTTP Client** | Axios |
| **State Management** | React Context API |
| **Icons** | Lucide React |
| **PDF Viewing** | React-PDF & pdfjs-dist |
| **Markdown** | React-Markdown with GFM |
| **Code Highlighting** | react-syntax-highlighter |
| **Date Handling** | Moment.js |
| **Notifications** | React Hot Toast |

---

## 🔄 State Management

### Context API Structure

```typescript
// AuthContext
- user: User | null
- isAuthenticated: boolean
- login(): Promise<void>
- logout(): Promise<void>
- signup(): Promise<void>
- updateProfile(): Promise<void>
```

### Local State
- Component-level state for UI interactions
- Service layer for API communication

---

## 📡 API Integration

### Service Layer Architecture

```typescript
// services/aiServices.ts
export const generateFlashcards()
export const generateQuiz()
export const generateSummary()
export const chatWithAI()
export const explainConcept()
export const getChatHistory()

// services/documentService.ts
export const uploadDocument()
export const getDocuments()
export const deleteDocument()
export const getDocumentDetails()

// services/authServices.ts
export const login()
export const register()
export const logout()
export const refreshToken()

// services/progressService.ts
export const getProgress()
export const getStatistics()
```

### Token Management

```typescript
// Automatic token refresh
- Check token expiry on every request
- Refresh before expiry
- Update cookies automatically
- Seamless user experience
```

---

## 🎯 Key Features Implementation

### 1️⃣ Document Upload Flow
```
User selects file
    ↓
Drag & drop or file picker
    ↓
Upload progress shown
    ↓
Backend processing
    ↓
Document ready for AI features
```

### 2️⃣ Flashcard Creation Flow
```
Select document
    ↓
Customize card count
    ↓
AI generates flashcards
    ↓
Review and study
    ↓
Track progress
```

### 3️⃣ Quiz Generation Flow
```
Choose document
    ↓
Select difficulty level
    ↓
AI creates quiz
    ↓
Take quiz with timer
    ↓
View results & analytics
```

### 4️⃣ Chat Interaction Flow
```
Load document context
    ↓
Ask question
    ↓
AI processes with context
    ↓
Display response
    ↓
Save to chat history
```

---

## 🚀 Performance Optimization

### Code Splitting
- Lazy loading page components
- Dynamic imports for heavy features
- Route-based code splitting

### Caching Strategy
- Axios response caching
- LocalStorage for user preferences
- Service worker ready (PWA capable)

### Bundle Optimization
- Tree shaking with ES modules
- Minification in production
- Compression for assets

---

## 🔐 Security Features

### Authentication
- ✅ JWT token management
- ✅ Secure token storage
- ✅ Automatic token refresh
- ✅ Logout with token invalidation

### API Security
- ✅ HTTPS/CORS compliance
- ✅ Request validation
- ✅ Error handling without exposing sensitive data

### Data Protection
- ✅ No sensitive data in localStorage
- ✅ Secure cookie flags
- ✅ XSS prevention with React's built-in escaping

---

## 🎨 Styling & Theme

### Tailwind CSS
```
- Utility-first CSS framework
- Dark mode support
- Responsive breakpoints
- Custom theme configuration
```

### Component Styling Strategy
```
├── Global styles (index.css)
├── Tailwind utilities
├── Component-scoped styles
└── CSS modules (optional)
```

---

## ⚡ Development Workflow

### Local Development
```bash
# Start dev server with HMR
npm run dev

# Type checking
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### ESLint Configuration
- React best practices
- TypeScript rules
- React Hooks rules
- Code quality checks

---

## 🧪 Testing Strategy

### Recommended Testing Stack
```
- Vitest (Unit testing)
- React Testing Library
- Playwright (E2E)
```

```bash
# Run tests (when configured)
npm test

# Coverage report
npm test -- --coverage
```

---

## 📱 Responsive Design

### Breakpoints
```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
```

### Mobile-First Approach
- Base styles for mobile
- Media queries for larger screens
- Touch-friendly interactions
- Optimized performance

---

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Output in dist/ folder
# Ready for deployment to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Docker container
```

### Environment Setup
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_NODE_ENV=production
```

---

## 🛠️ Troubleshooting

### Common Issues

**CORS Error**
- Check backend CORS configuration
- Verify API_BASE_URL in .env.local
- Ensure credentials are enabled

**Token Expiry**
- Auto-refresh should handle this
- Check tokenRefreshService logs
- Verify refresh token in cookies

**Build Errors**
- Clear node_modules and reinstall
- Remove dist/ folder
- Check TypeScript errors: `npm run lint`

---

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |
| `npm run lint -- --fix` | Fix linting issues |

---

## 🤝 Contributing

We welcome contributions! Help us improve the frontend:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Write** clear commit messages
5. **Push** to your fork
6. **Open** a Pull Request

### Contribution Guidelines
- Follow TypeScript and React best practices
- Use meaningful component and variable names
- Write reusable, testable code
- Update TypeScript types when needed
- Test on multiple screen sizes

---

## 📄 License

Licensed under the **ISC License** - see LICENSE file for details.

---

## 🙋 Support & Feedback

- 📧 Email: sidhdeshshrivastav@gmail.com
- 💬 Discussions: [GitHub Discussions](https://github.com/sidhdesh111/ai-learning-assistant/discussions)

---

## 🎉 Acknowledgments

- **React Team** - Amazing UI framework
- **Tailwind Labs** - Beautiful utility CSS
- **Vite Team** - Lightning-fast build tool
- **All Contributors** - Making this possible

---

<div align="center">

### 🎓 Start Learning Smarter Today!

**Download • Fork • Contribute**

**Made with 🧠 and ❤️ by the AI Learning Assistant Team**

</div>
