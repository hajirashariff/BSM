# 🚀 **BSM - Business Service Management Platform**

> **Enterprise-grade Business Service Management platform with AI-powered automation, built from scratch as a modern monorepo architecture.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![Django](https://img.shields.io/badge/Django-4.2-green)](https://djangoproject.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-FF6B6B)](https://openai.com/)
[![Turbo](https://img.shields.io/badge/Turbo-2.5.6-FF6B6B)](https://turbo.build/)

---

## 📋 **Table of Contents**

- [🎯 Project Overview](#-project-overview)
- [🏗️ Architecture](#️-architecture)
- [🚀 Features](#-features)
- [🤖 AI Integration](#-ai-integration)
- [📱 Applications](#-applications)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [📊 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [📈 Performance](#-performance)
- [🎨 UI/UX Features](#-uiux-features)
- [🔐 Security](#-security)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 **Project Overview**

**BSM (Business Service Management)** is a comprehensive enterprise platform that combines modern web technologies with AI-powered automation to deliver intelligent business service management capabilities. Built from scratch as a monorepo, it provides both customer-facing and administrative interfaces with advanced AI integration.

### **Key Highlights**
- 🏢 **Enterprise-Ready**: Built for scalability and enterprise use cases
- 🤖 **AI-Powered**: Comprehensive AI integration for automation and insights
- 🎨 **Modern UI/UX**: Beautiful, responsive design with dark mode support
- ⚡ **High Performance**: Optimized for speed and efficiency
- 🔧 **Developer-Friendly**: Well-structured codebase with TypeScript
- 📱 **Mobile-First**: Responsive design that works on all devices
- 🔔 **Real-time Notifications**: Advanced notification system with read more functionality
- 🎫 **Smart Ticket Management**: AI-powered ticket creation and management

---

## 🏗️ **Architecture**

### **Monorepo Structure**
```
BSM/
├── apps/
│   ├── customer-portal/     # Next.js customer-facing app (Port 3000)
│   ├── admin-dashboard/     # Next.js admin interface (Port 3001)
│   └── backend/            # Django REST API backend (Port 8000)
├── packages/               # Shared packages (planned)
├── docs/                  # Documentation
└── tools/                 # Build tools and scripts
```

### **Technology Stack**
- **Frontend**: Next.js 14.2.5, React 18, TypeScript, Tailwind CSS
- **Backend**: Django 4.2, Django REST Framework, SQLite
- **AI Services**: Custom AI models and OpenAI integration
- **Build Tools**: Turbo, ESLint, Prettier
- **Deployment**: Docker-ready, production-optimized

---

## 🚀 **Features**

### **🎫 Ticket Management System**
- **Smart Ticket Creation**: AI-powered ticket classification and auto-assignment
- **Advanced Filtering**: Multi-criteria filtering and search
- **Status Tracking**: Real-time status updates and notifications
- **Priority Management**: Intelligent priority detection and escalation
- **SLA Monitoring**: Automated SLA tracking and alerts
- **Attachment Support**: File uploads and document management
- **Read More Functionality**: Expandable notification messages

### **👥 Account Management**
- **Account Health Scoring**: AI-powered account health analysis
- **Churn Prediction**: Early warning system for at-risk accounts
- **Upsell Opportunities**: AI-identified revenue expansion opportunities
- **Stakeholder Mapping**: Key decision maker identification
- **Contract Management**: Renewal tracking and management
- **Risk Assessment**: Automated risk analysis and mitigation

### **🖥️ Asset Management**
- **Asset Registration**: Comprehensive asset tracking system
- **Lifecycle Management**: From procurement to disposal
- **Maintenance Scheduling**: Automated maintenance reminders
- **Depreciation Tracking**: Financial asset management
- **Location Tracking**: Asset location and movement history
- **Integration Support**: Third-party system integration

### **📚 Knowledge Base**
- **AI-Enhanced Search**: Intelligent content discovery
- **Content Management**: Article creation and editing
- **Version Control**: Content versioning and history
- **Categorization**: Smart content organization
- **Analytics**: Content performance tracking
- **Self-Service**: Customer self-help capabilities

### **📊 Analytics & Reporting**
- **Real-time Dashboards**: Live KPI monitoring
- **Custom Reports**: Flexible reporting system
- **Predictive Analytics**: AI-driven insights
- **Performance Metrics**: Service level tracking
- **Trend Analysis**: Historical data analysis
- **Export Capabilities**: Multiple export formats

### **🔔 Notification System**
- **Real-time Notifications**: Instant updates and alerts
- **Smart Filtering**: Intelligent notification categorization
- **Read More Functionality**: Expandable message content
- **Priority Levels**: High, medium, low priority notifications
- **Mark as Read**: Individual and bulk read management
- **Click Outside to Close**: Intuitive UI interactions

---

## 🤖 **AI Integration**

### **Backend AI Services** (`apps/backend/ai_services/`)

#### **1. AI Models & Data Storage**
```python
# Database Models
- AIModel: Store AI model configurations
- AIPrediction: Track AI predictions and results
- AIInsight: Store AI-generated insights
- AITrainingData: Manage training datasets
```

#### **2. Core AI Services**
```python
# Service Classes
- TicketClassificationService: Auto-classify and assign tickets
- AccountInsightService: Analyze account health and churn risk
- KnowledgeBaseAIService: Enhance search and content generation
- WorkflowOptimizationService: Optimize business processes
```

#### **3. API Endpoints**
```
POST /api/ai/classify-ticket/     # Ticket classification
POST /api/ai/analyze-account/     # Account analysis
POST /api/ai/enhance-search/      # Enhanced search
POST /api/ai/analyze-workflow/    # Workflow optimization
GET  /api/ai/insights/            # Get AI insights
GET  /api/ai/health/              # AI services health check
```

### **Frontend AI Components**

#### **1. AI Ticket Creator** (`AITicketCreator.tsx`)
**Features:**
- 🤖 **Intelligent Classification**: Auto-categorizes tickets based on content
- ⚡ **Smart Assignment**: Suggests best assignee based on expertise
- 🏷️ **Priority Detection**: Automatically determines urgency level
- 📊 **Confidence Scoring**: Shows AI confidence in suggestions
- ✨ **Real-time Analysis**: Instant AI processing as you type

#### **2. AI Account Insights** (`AIAccountInsights.tsx`)
**Features:**
- 📈 **Health Scoring**: AI-powered account health analysis
- ⚠️ **Churn Prediction**: Early warning system for at-risk accounts
- 💰 **Upsell Opportunities**: AI-identified revenue expansion opportunities
- 🎯 **Stakeholder Mapping**: Key decision maker identification

---

## 📱 **Applications**

### **1. Customer Portal** (`apps/customer-portal/`)
**URL**: http://localhost:3000

**Features:**
- 🏠 **Dashboard**: Personalized overview with KPIs and metrics
- 🎫 **Ticket Management**: Create, track, and manage support tickets
- 📚 **Knowledge Base**: Searchable help articles and documentation
- 🤖 **AI Ticket Creator**: Intelligent ticket creation with AI assistance
- 📊 **Analytics**: Personal usage analytics and insights
- ⚙️ **Settings**: Account preferences and notifications
- 🔔 **Notification Center**: Real-time notifications with read more functionality

**Key Components:**
- `AITicketCreator.tsx` - AI-powered ticket creation
- `NotificationCenter.tsx` - Real-time notifications
- `KnowledgeBase.tsx` - Searchable help system
- `AnalyticsDashboard.tsx` - Personal analytics
- `Dashboard.tsx` - Main dashboard interface

### **2. Admin Dashboard** (`apps/admin-dashboard/`)
**URL**: http://localhost:3001

**Features:**
- 📊 **Executive Dashboard**: High-level KPIs and metrics
- 👥 **Account Management**: Customer account oversight
- 🖥️ **Asset Management**: IT asset tracking and management
- 🎫 **Ticket Administration**: Advanced ticket management
- 👤 **User Management**: Team and user administration
- ⚙️ **System Settings**: Platform configuration and settings

**Key Components:**
- `AccountDetailsModal.tsx` - Account information management
- `AssetDetailsModal.tsx` - Asset tracking and details
- `TicketModal.tsx` - Advanced ticket management
- `RiskOpportunityModal.tsx` - Risk and opportunity analysis
- `StakeholderModal.tsx` - Stakeholder management

### **3. Backend API** (`apps/backend/`)
**URL**: http://localhost:8000

**Features:**
- 🔌 **RESTful API**: Comprehensive API endpoints
- 🤖 **AI Services**: Machine learning and AI integration
- 🗄️ **Database Management**: Data persistence and retrieval
- 🔐 **Authentication**: User authentication and authorization
- 📊 **Analytics Engine**: Data processing and analysis

---

## 🛠️ **Tech Stack**

### **Frontend Technologies**
- **Framework**: Next.js 14.2.5
- **Language**: TypeScript 5.9.2
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.453.0
- **Forms**: React Hook Form 7.55.0
- **State Management**: TanStack Query 5.60.5
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion 11.13.1

### **Backend Technologies**
- **Framework**: Django 4.2
- **API**: Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)
- **AI/ML**: OpenAI, scikit-learn, transformers, torch
- **Documentation**: drf-yasg (Swagger)

### **Development Tools**
- **Monorepo**: Turbo 2.5.6
- **Package Manager**: npm 10.8.2
- **Linting**: ESLint 9.35.0
- **Formatting**: Prettier 3.6.2
- **Git Hooks**: Husky 9.1.7

---

## ⚡ **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- Python 3.8+
- npm 10.8.2+

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd BSM
```

2. **Install dependencies**
```bash
npm install
```

3. **Start all applications**
```bash
npm run dev
```

This will start:
- Customer Portal: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- Backend API: http://localhost:8000

### **Individual Application Commands**

```bash
# Customer Portal only
npm run dev:customer

# Admin Dashboard only  
npm run dev:admin

# Backend API only
npm run dev:backend
```

---

## 📊 **Project Structure**

```
BSM/
├── apps/
│   ├── customer-portal/          # Customer-facing Next.js app
│   │   ├── src/
│   │   │   ├── components/       # React components
│   │   │   │   ├── AITicketCreator.tsx
│   │   │   │   ├── NotificationCenter.tsx
│   │   │   │   ├── KnowledgeBase.tsx
│   │   │   │   ├── AnalyticsDashboard.tsx
│   │   │   │   └── ui/          # Reusable UI components
│   │   │   ├── pages/           # Next.js pages
│   │   │   │   ├── index.tsx    # Dashboard
│   │   │   │   ├── tickets.tsx  # Ticket management
│   │   │   │   ├── help.tsx     # Knowledge base
│   │   │   │   └── analytics.tsx # Analytics
│   │   │   ├── lib/             # Utilities and services
│   │   │   └── styles/          # Global styles
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── admin-dashboard/          # Admin Next.js app
│   │   ├── src/
│   │   │   ├── components/       # Admin components
│   │   │   │   ├── AccountDetailsModal.tsx
│   │   │   │   ├── AssetDetailsModal.tsx
│   │   │   │   ├── TicketModal.tsx
│   │   │   │   └── RiskOpportunityModal.tsx
│   │   │   ├── pages/           # Admin pages
│   │   │   │   ├── index.tsx    # Executive dashboard
│   │   │   │   ├── accounts.tsx # Account management
│   │   │   │   ├── assets.tsx   # Asset management
│   │   │   │   └── tickets.tsx  # Ticket administration
│   │   │   └── styles/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   └── backend/                  # Django REST API
│       ├── ai_services/          # AI/ML services
│       │   ├── models.py         # AI database models
│       │   ├── services.py       # AI service classes
│       │   ├── views.py          # AI API endpoints
│       │   └── urls.py           # AI URL routing
│       ├── server/               # Django project settings
│       │   ├── settings.py       # Django configuration
│       │   ├── urls.py           # Main URL routing
│       │   └── wsgi.py           # WSGI configuration
│       ├── manage.py             # Django management script
│       ├── requirements.txt      # Python dependencies
│       └── db.sqlite3            # SQLite database
│
├── docs/                         # Documentation
│   ├── AI_INTEGRATION_GUIDE.md   # AI integration guide
│   └── context.md                # Project context
│
├── package.json                  # Root package.json
├── turbo.json                    # Turbo configuration
├── tsconfig.base.json            # TypeScript base config
└── README.md                     # This file
```

---

## 🔧 **Development**

### **Available Scripts**

```bash
# Development
npm run dev              # Start all applications
npm run dev:customer     # Start customer portal only
npm run dev:admin        # Start admin dashboard only
npm run dev:backend      # Start backend API only

# Building
npm run build            # Build all applications
npm run start            # Start production builds

# Code Quality
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm run test             # Run tests

# Backend specific
cd apps/backend
python manage.py runserver 8000
python manage.py migrate
python manage.py createsuperuser
```

### **Development Workflow**

1. **Feature Development**: Create feature branches from main
2. **Code Quality**: Run linting and formatting before commits
3. **Testing**: Write tests for new features
4. **Documentation**: Update documentation for new features
5. **Pull Requests**: Submit PRs for code review

---

## 📈 **Performance**

### **Frontend Optimizations**
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Lazy Loading**: Component lazy loading
- **Caching**: React Query for data caching

### **Backend Optimizations**
- **Database Indexing**: Optimized database queries
- **Caching**: Redis caching layer
- **API Pagination**: Efficient data pagination
- **Connection Pooling**: Database connection optimization

### **Performance Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

---

## 🎨 **UI/UX Features**

### **Design System**
- **Color Palette**: Consistent color scheme across applications
- **Typography**: Modern, readable font stack
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI component library
- **Icons**: Lucide React icon library

### **Responsive Design**
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Touch-Friendly**: Optimized for touch interactions
- **Accessibility**: WCAG 2.1 AA compliance

### **Dark Mode Support**
- **Theme Toggle**: Easy theme switching
- **System Preference**: Automatic theme detection
- **Consistent Styling**: Dark mode across all components

### **Interactive Features**
- **Real-time Updates**: Live data updates
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

---

## 🔐 **Security**

### **Frontend Security**
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: CSRF tokens for API calls
- **Content Security Policy**: CSP headers
- **Input Validation**: Client-side validation

### **Backend Security**
- **Authentication**: Django's built-in auth system
- **Authorization**: Role-based access control
- **API Security**: DRF security features
- **Data Validation**: Server-side validation
- **SQL Injection**: ORM protection

### **Data Protection**
- **Encryption**: Data encryption at rest
- **HTTPS**: SSL/TLS encryption in transit
- **Privacy**: GDPR compliance features
- **Audit Logging**: Security event logging

---

## 📚 **Documentation**

### **API Documentation**
- **Swagger UI**: Interactive API documentation
- **OpenAPI Spec**: Machine-readable API specification
- **Code Examples**: Usage examples for all endpoints

### **Component Documentation**
- **Storybook**: Component library documentation
- **Props Documentation**: Detailed prop descriptions
- **Usage Examples**: Code examples for each component

### **Development Guides**
- **AI Integration Guide**: Complete AI setup and usage
- **Contributing Guide**: How to contribute to the project
- **Deployment Guide**: Production deployment instructions

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **How to Contribute**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Code Standards**
- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 **Recent Updates**

### **Latest Features Added**
- ✅ **Notification System**: Real-time notifications with read more functionality
- ✅ **AI Ticket Creator**: Intelligent ticket creation with AI assistance
- ✅ **Read More Button**: Expandable notification messages
- ✅ **Live Chat Removal**: Cleaned up live chat functionality
- ✅ **Dark Mode Support**: Complete dark mode implementation
- ✅ **Responsive Design**: Mobile-first responsive design
- ✅ **Performance Optimization**: Improved loading times and performance

### **Current Status**
- 🟢 **Customer Portal**: Fully functional with all features
- 🟢 **Admin Dashboard**: Complete with all management features
- 🟢 **Backend API**: Fully operational with AI services
- 🟢 **Notification System**: Working with read more functionality
- 🟢 **AI Integration**: Complete AI-powered features

---

## 📞 **Support**

For support and questions:
- 📧 Email: support@bsm-platform.com
- 📚 Documentation: [docs.bsm-platform.com](https://docs.bsm-platform.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/bsm/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-org/bsm/discussions)

---

**Built with ❤️ by the BSM Team**