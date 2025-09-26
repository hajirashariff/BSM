import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Workflow, 
  Settings, 
  BarChart3, 
  Zap,
  Shield,
  Globe,
  MessageSquare,
  Calendar,
  Star,
  ChevronRight,
  Play,
  TrendingUp,
  Target,
  Layers,
  Building2,
  Server,
  BookOpen,
  Plug,
  Ticket,
  Brain,
  Clock,
  Award,
  Rocket,
  Lock,
  Sparkles,
  Activity,
  Database,
  Cpu,
  Network,
  FileText,
  GitBranch,
  Monitor,
  Smartphone,
  Cloud,
  Mail,
  Phone,
  MapPin,
  Eye,
  TrendingDown,
  AlertTriangle,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Grid3X3,
  List
} from 'lucide-react';

const WelcomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate dashboard previews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate customer reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  // Real dashboard data from screenshots
  const dashboardPreviews = [
    {
      title: "Interactive Dashboard",
      subtitle: "Real-time insights and analytics",
      data: {
        todayTickets: 13,
        resolvedToday: 9,
        avgResponse: "3.0h",
        satisfaction: "3.6/5",
        activeTickets: 201,
        clientAccounts: 79,
        itAssets: 1128,
        responseTime: "2.0h"
      }
    },
    {
      title: "Account Health Overview",
      subtitle: "Monitor client account performance",
      accounts: [
        { name: "Contoso Ltd", health: 92, status: "Healthy", tickets: 4, renewal: "2024-12-15" },
        { name: "Fabrikam Inc", health: 78, status: "Warning", tickets: 8, renewal: "2025-03-20" },
        { name: "Adventure Works", health: 87, status: "Healthy", tickets: 3, renewal: "2024-11-30" },
        { name: "Northwind Corp", health: 97, status: "Excellent", tickets: 1, renewal: "2025-01-10" }
      ]
    },
    {
      title: "Workflow Engine",
      subtitle: "Enterprise-grade automation platform",
      stats: {
        totalWorkflows: 3,
        active: 2,
        draft: 1,
        totalRuns: 245,
        successRate: "64%",
        totalCost: "$68.70"
      }
    },
    {
      title: "Service Requests",
      subtitle: "AI-powered multichannel intake",
      channels: {
        email: 45,
        portal: 32,
        slack: 18,
        phone: 12
      },
      insights: {
        autoAssignment: "87% accuracy rate",
        ruleBasedApprovals: "4 tickets auto-approved",
        escalationPrediction: "3 tickets flagged for escalation",
        duplicateDetection: "5 duplicates prevented"
      }
    }
  ];

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Interactive Dashboard",
      description: "Real-time KPIs with 13 today's tickets, 9 resolved, 3.6/5 satisfaction score",
      color: "from-blue-500 to-blue-600",
      metrics: "201 Active Tickets • 79 Client Accounts • 1,128 IT Assets",
      image: "dashboard"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Account Management",
      description: "Monitor 4 key accounts with health scores: Contoso (92%), Northwind (97%)",
      color: "from-green-500 to-green-600",
      metrics: "92% Avg Health Score • Real-time Monitoring • Risk Prediction",
      image: "accounts"
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "Workflow Engine",
      description: "3 active workflows with 64% success rate, $68.70 total cost optimization",
      color: "from-purple-500 to-purple-600",
      metrics: "245 Total Runs • Drag & Drop Builder • AI-Powered Automation",
      image: "workflow"
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Service Requests",
      description: "Multichannel intake: 45 Email, 32 Portal, 18 Slack, 12 Phone requests",
      color: "from-orange-500 to-orange-600",
      metrics: "87% Auto-Assignment • 4 Auto-Approved • 5 Duplicates Prevented",
      image: "service"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Rules Engine",
      description: "3 active rules with 135 executions, 97.7% success rate, AI-powered decisions",
      color: "from-indigo-500 to-indigo-600",
      metrics: "AI Analysis • Automated Decisions • Smart Routing",
      image: "rules"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User Management",
      description: "5 total users: 2 Admins, 1 Agent, 4 Active, role-based access control",
      color: "from-pink-500 to-pink-600",
      metrics: "Role-Based Access • Activity Monitoring • Security Controls",
      image: "users"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Knowledge Base",
      description: "5 categories with published articles, 90% helpfulness rating, AI search",
      color: "from-teal-500 to-teal-600",
      metrics: "AI-Enhanced Search • Content Analytics • Version Control",
      image: "knowledge"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Execution Monitoring",
      description: "3 total executions today, 1 running, 1 completed, 83% success rate",
      color: "from-red-500 to-red-600",
      metrics: "Real-time Tracking • Cost Analysis • Performance Insights",
      image: "monitoring"
    }
  ];

  const integrations = [
    { name: 'Slack', icon: '💬', color: 'from-purple-500 to-purple-600' },
    { name: 'Microsoft Teams', icon: '🟦', color: 'from-blue-500 to-blue-600' },
    { name: 'Google Workspace', icon: '🌈', color: 'from-red-500 to-yellow-500' },
    { name: 'Jira', icon: '🔵', color: 'from-blue-600 to-indigo-600' },
    { name: 'GitHub', icon: '🐙', color: 'from-gray-700 to-gray-900' },
    { name: 'Trello', icon: '📋', color: 'from-blue-400 to-blue-600' },
    { name: 'Notion', icon: '📝', color: 'from-gray-800 to-black' },
    { name: 'Figma', icon: '🎨', color: 'from-purple-500 to-pink-500' },
    { name: 'Zoom', icon: '📹', color: 'from-blue-500 to-blue-600' },
    { name: 'Asana', icon: '🔺', color: 'from-pink-500 to-red-500' },
    { name: 'Linear', icon: '📐', color: 'from-purple-600 to-blue-600' },
    { name: 'Dropbox', icon: '📦', color: 'from-blue-600 to-blue-700' }
  ];

  const customerReviews = [
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      company: "TechCorp",
      avatar: "SJ",
      rating: 5,
      text: "Ackermann has completely transformed our operations. We've reduced manual work by 87% and improved our response time from 6 hours to 2 hours. The AI-powered insights are game-changing.",
      metric: "87% reduction in manual work"
    },
    {
      name: "Michael Chen",
      role: "IT Director",
      company: "GlobalTech Solutions",
      avatar: "MC",
      rating: 5,
      text: "The workflow automation capabilities are incredible. We've automated 95% of our onboarding process and reduced errors by 92%. Our team productivity has increased by 150%.",
      metric: "150% productivity increase"
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Customer Success",
      company: "InnovateCorp",
      avatar: "ER",
      rating: 5,
      text: "The customer portal and self-service features have revolutionized our support. Customer satisfaction increased from 3.2 to 4.8, and we've reduced support tickets by 60%.",
      metric: "4.8/5 customer satisfaction"
    },
    {
      name: "David Thompson",
      role: "Chief Technology Officer",
      company: "Enterprise Systems",
      avatar: "DT",
      rating: 5,
      text: "The integration capabilities are outstanding. We connected 15+ systems in just 2 weeks. The real-time analytics and reporting have given us insights we never had before.",
      metric: "15+ systems integrated"
    },
    {
      name: "Lisa Wang",
      role: "Operations Manager",
      company: "ScaleUp Inc",
      avatar: "LW",
      rating: 5,
      text: "The account management features help us maintain 99.2% client retention. The predictive analytics warned us about 3 potential churn risks, saving us $2M in revenue.",
      metric: "99.2% client retention"
    },
    {
      name: "James Wilson",
      role: "Service Delivery Manager",
      company: "CloudFirst Technologies",
      avatar: "JW",
      rating: 5,
      text: "The knowledge base and AI chatbot have reduced our first-call resolution rate to 85%. Our agents can now focus on complex issues while routine queries are handled automatically.",
      metric: "85% first-call resolution"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Floating Icons */}
        {[<Zap className="w-6 h-6 text-blue-400/40" />, <Star className="w-5 h-5 text-purple-400/40" />, <Sparkles className="w-4 h-4 text-yellow-400/40" />, <Rocket className="w-5 h-5 text-green-400/40" />].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  boxShadow: [
                    "0 4px 20px rgba(59, 130, 246, 0.3)",
                    "0 8px 30px rgba(147, 51, 234, 0.4)",
                    "0 4px 20px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  className="text-white font-bold text-lg"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  BSM
                </motion.span>
              </motion.div>
              <motion.div 
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex items-center space-x-3">
              <Logo size={48} className="drop-shadow-xl" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Ackermann</h1>
                <p className="text-xs text-gray-500 font-medium">Enterprise Workflow Platform</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/login">
              <motion.button
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.05 }}
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Get Started <Rocket className="w-4 h-4" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8 z-10 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 rounded-full text-blue-700 font-semibold text-sm border border-blue-200/50 shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.2)"
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </motion.div>
                  🚀 Trusted by 250+ Fortune 500 Companies
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.h1 
                  className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Enterprise
                  <motion.span 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Workflow Platform
                  </motion.span>
                  <motion.span 
                    className="text-4xl lg:text-5xl text-gray-700 font-medium"
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(0,0,0,0)",
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 0px rgba(0,0,0,0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    Powered by AI
                  </motion.span>
                </motion.h1>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Transform your business operations with our comprehensive BSM platform. 
                <span className="font-semibold text-gray-800">201 active tickets, 79 client accounts, 1,128 IT assets</span> - 
                all managed intelligently with AI automation.
              </p>
              
              <motion.div 
                className="flex flex-wrap items-center gap-6 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {[
                  { icon: <Shield className="w-4 h-4 text-green-600" />, text: "99.9% Uptime", color: "green" },
                  { icon: <Zap className="w-4 h-4 text-yellow-600" />, text: "Real-time Processing", color: "yellow" },
                  { icon: <Brain className="w-4 h-4 text-purple-600" />, text: "AI-Powered", color: "purple" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-gray-200/50"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
                    }}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(59, 130, 246, 0.3)",
                        "0 15px 40px rgba(147, 51, 234, 0.4)",
                        "0 10px 30px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Start Free Trial
                    </motion.span>
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </Link>
                
                <Link href="/login">
                  <motion.button
                    className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      borderColor: "rgb(59, 130, 246)",
                      color: "rgb(37, 99, 235)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      borderColor: [
                        "rgb(209, 213, 219)",
                        "rgb(59, 130, 246)",
                        "rgb(209, 213, 219)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="w-5 h-5" />
                    </motion.div>
                    Watch Demo
                  </motion.button>
                </Link>
              </div>
              
              <motion.div 
                className="flex items-center gap-6 text-sm text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "No credit card required" },
                  { icon: <Clock className="w-4 h-4 text-blue-600" />, text: "Setup in 5 minutes" },
                  { icon: <Star className="w-4 h-4 text-yellow-500" />, text: "4.9/5 rating" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, color: "rgb(37, 99, 235)" }}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2 + index * 0.3,
                      repeat: Infinity,
                      delay: index * 0.1
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    {item.text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Interactive Dashboard Preview */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl">
                {/* Dashboard Container */}
                <div className="bg-white rounded-2xl p-6 space-y-6 shadow-xl">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Ackermann Dashboard - Live
                    </div>
                  </div>
                  
                  {/* Live Dashboard Content */}
                  <div className="space-y-4">
                    {/* Top KPIs */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-600 text-xs font-medium">Today's Tickets</p>
                            <p className="text-2xl font-bold text-blue-900">13</p>
                            <p className="text-xs text-blue-700">9 Resolved</p>
                          </div>
                          <Ticket className="w-6 h-6 text-blue-600" />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-600 text-xs font-medium">Satisfaction</p>
                            <p className="text-2xl font-bold text-green-900">3.6/5</p>
                            <p className="text-xs text-green-700">+0.2 this week</p>
                          </div>
                          <Star className="w-6 h-6 text-green-600 fill-current" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Main Metrics */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Active Tickets", value: "201", change: "+8%", color: "blue" },
                        { label: "Client Accounts", value: "79", change: "+16%", color: "green" },
                        { label: "IT Assets", value: "1,128", change: "+6%", color: "purple" },
                        { label: "Response Time", value: "2.0h", change: "-8%", color: "orange" }
                      ].map((metric, i) => (
                        <motion.div
                          key={i}
                          className="bg-gray-50 rounded-lg p-3 border"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 + 0.5 }}
                        >
                          <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                            <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.change}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mini Chart */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Real-time Analytics</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex items-end gap-1 h-12">
                        {[40, 60, 45, 80, 65, 90, 75, 95, 70, 85, 92, 88].map((height, i) => (
                          <motion.div
                            key={i}
                            className={`bg-gradient-to-t ${i % 3 === 0 ? 'from-blue-500 to-purple-500' : i % 3 === 1 ? 'from-green-500 to-emerald-500' : 'from-purple-500 to-indigo-500'} rounded-t flex-1`}
                            style={{ height: `${height}%` }}
                            animate={{ height: [`${height * 0.3}%`, `${height}%`] }}
                            transition={{ duration: 1, delay: i * 0.05 + 0.8 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border"
                  animate={{ 
                    y: [-10, 10, -10], 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-full p-3 shadow-lg border"
                  animate={{ 
                    y: [10, -10, 10], 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  whileHover={{ scale: 1.2, y: -20 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="w-6 h-6 text-green-500" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 bg-white rounded-full p-2 shadow-lg border"
                  animate={{ 
                    x: [-5, 5, -5], 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  whileHover={{ scale: 1.3, x: -10 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain className="w-4 h-4 text-purple-500" />
                  </motion.div>
                </motion.div>

                {/* Additional floating elements */}
                <motion.div
                  className="absolute top-1/4 -right-12 bg-white rounded-full p-2 shadow-lg border"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="w-4 h-4 text-blue-500" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 -right-8 bg-white rounded-full p-2 shadow-lg border"
                  animate={{ 
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stats Banner */}
      <section className="py-8 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Active Workflows", value: "1M+", icon: <Workflow className="w-6 h-6" /> },
              { label: "Success Rate", value: "99.2%", icon: <TrendingUp className="w-6 h-6" /> },
              { label: "Countries", value: "50+", icon: <Globe className="w-6 h-6" /> },
              { label: "Enterprises", value: "250+", icon: <Building2 className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-2"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.3)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="text-2xl font-bold"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Showcase with Real Data */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Complete Business Service Management
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From workflow automation to service requests, account management to analytics - 
              everything your enterprise needs with real-time data and AI-powered insights
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white p-8 rounded-3xl border border-gray-200 text-center cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-blue-300 relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`relative w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${feature.color} p-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-full">
                  {feature.metrics}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Dashboard Previews */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See Your Data Come to Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive dashboards with real-time insights from your actual business operations
            </p>
          </motion.div>

          {/* Dashboard Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {dashboardPreviews.map((preview, index) => (
              <motion.button
                key={index}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {preview.title}
              </motion.button>
            ))}
          </div>

          {/* Dashboard Preview Content */}
          <motion.div
            key={activeTab}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Dashboard Overview</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Data
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(dashboardPreviews[0].data || {}).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                      <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Health Overview</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {(dashboardPreviews[1].accounts || []).map((account, i) => (
                    <motion.div
                      key={i}
                      className={`p-6 rounded-2xl border-2 ${
                        account.status === 'Excellent' ? 'border-green-200 bg-green-50' :
                        account.status === 'Healthy' ? 'border-blue-200 bg-blue-50' :
                        'border-yellow-200 bg-yellow-50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900">{account.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          account.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                          account.status === 'Healthy' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Health Score</span>
                            <span className="font-medium">{account.health}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full ${
                                account.health >= 90 ? 'bg-green-500' :
                                account.health >= 80 ? 'bg-blue-500' :
                                'bg-yellow-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${account.health}%` }}
                              transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Tickets:</span>
                            <span className="font-medium ml-1">{account.tickets}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Renewal:</span>
                            <span className="font-medium ml-1">{account.renewal}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Workflow Engine</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(dashboardPreviews[2].stats || {}).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-purple-900 mb-2">{value}</div>
                      <div className="text-sm text-purple-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Requests</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Channel Distribution</h4>
                    <div className="space-y-3">
                      {Object.entries(dashboardPreviews[3].channels || {}).map(([channel, count], i) => (
                        <motion.div
                          key={channel}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="capitalize font-medium">{channel}</span>
                          <span className="text-2xl font-bold text-blue-600">{count}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">AI Insights</h4>
                    <div className="space-y-3">
                      {Object.entries(dashboardPreviews[3].insights || {}).map(([key, value], i) => (
                        <motion.div
                          key={key}
                          className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="text-sm font-medium text-gray-900 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-600">{value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Workflow Builder Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              {...slideInLeft}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold text-sm">
                  <Workflow className="w-4 h-4" />
                  Visual Workflow Builder
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Design workflows with drag & drop simplicity
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Create complex automation workflows visually. Our Employee Onboarding workflow 
                handles account creation, equipment assignment, and department-specific training 
                with conditional logic and parallel processing.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Target className="w-5 h-5" />, title: "Smart Triggers", desc: "Event-based automation" },
                  { icon: <GitBranch className="w-5 h-5" />, title: "Conditional Logic", desc: "Decision-based routing" },
                  { icon: <Zap className="w-5 h-5" />, title: "Parallel Processing", desc: "Simultaneous actions" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <Link href="/login">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors duration-200">
                    Try Workflow Builder <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              {...slideInRight}
            >
              {/* Workflow Builder Mockup */}
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  {/* Workflow Title */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                      <h4 className="font-bold text-gray-900">Employee Onboarding</h4>
                      <p className="text-sm text-gray-600">Automated workflow for new employee setup</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                  </div>

                  {/* Workflow Steps */}
                  <div className="space-y-3">
                    {[
                      { title: "Trigger", subtitle: "New Employee Added", color: "blue", icon: "⚡" },
                      { title: "Action", subtitle: "Create Accounts", color: "green", icon: "👤" },
                      { title: "Action", subtitle: "Assign Equipment", color: "green", icon: "💻" },
                      { title: "Condition", subtitle: "Department Check", color: "yellow", icon: "❓" },
                      { title: "Action", subtitle: "Schedule Training", color: "green", icon: "📚" }
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                          step.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                          step.color === 'green' ? 'border-green-200 bg-green-50' :
                          'border-yellow-200 bg-yellow-50'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                      >
                        <div className="text-lg">{step.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{step.title}</div>
                          <div className="text-sm text-gray-600">{step.subtitle}</div>
                        </div>
                        {i < 4 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-sm font-medium text-gray-600">Success Rate</div>
                <div className="text-2xl font-bold text-green-600">94%</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="text-sm font-medium text-gray-600">Executions</div>
                <div className="text-2xl font-bold text-blue-600">245</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              200+ Integrations & Growing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect seamlessly with the tools your team already uses. No more data silos.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                className="group bg-white p-6 rounded-2xl text-center cursor-pointer border border-gray-200 hover:border-blue-300 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${integration.color} rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                  {integration.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {integration.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/login">
              <motion.button
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Integrations
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their business operations with Ackermann
            </p>
          </motion.div>

          {/* Sliding Reviews Container */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              animate={{ x: `-${currentReview * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {customerReviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 p-8 md:p-16">
                  <div className="max-w-4xl mx-auto text-center">
                    {/* Rating Stars */}
                    <div className="flex items-center justify-center mb-8">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-4 text-gray-600 font-medium text-lg">5.0 out of 5</span>
                    </div>
                    
                    {/* Review Text */}
                    <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800 mb-8">
                      "{review.text}"
                    </blockquote>
                    
                    {/* Key Metric */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 font-semibold text-lg mb-8">
                      <TrendingUp className="w-5 h-5" />
                      {review.metric}
                    </div>
                    
                    {/* Customer Info */}
                    <div className="flex items-center justify-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {review.avatar}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-xl text-gray-900">{review.name}</div>
                        <div className="text-gray-600 text-lg">{review.role}</div>
                        <div className="text-gray-500">{review.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Review Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              {customerReviews.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentReview === index
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentReview(index)}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200"
              onClick={() => setCurrentReview((prev) => (prev - 1 + customerReviews.length) % customerReviews.length)}
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200"
              onClick={() => setCurrentReview((prev) => (prev + 1) % customerReviews.length)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Customer Logos */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
          >
            {['TechCorp', 'GlobalTech', 'InnovateCorp', 'Enterprise Systems', 'ScaleUp Inc', 'CloudFirst'].map((company, index) => (
              <motion.div
                key={company}
                className="text-center text-gray-500 font-semibold text-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold leading-tight">
              Ready to transform your business operations?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join 250+ Fortune 500 companies using Ackermann to automate workflows, 
              manage accounts, and deliver exceptional service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <motion.button
                  className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial <Rocket className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link href="/login">
                <motion.button
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" /> Schedule Demo
                </motion.button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Enterprise security
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Setup in 5 minutes
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Logo size={40} className="drop-shadow-xl" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Ackermann</h1>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering enterprises with intelligent workflow automation, 
                comprehensive service management, and AI-powered insights.
              </p>
              <div className="flex items-center gap-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                {['Dashboard', 'Workflows', 'Accounts', 'Analytics', 'Integrations', 'API'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact', 'Press', 'Partners'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                {['Help Center', 'Documentation', 'Status', 'Privacy', 'Terms', 'Security'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Ackermann. All rights reserved. Built with ❤️ for enterprise teams.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0 text-sm text-gray-400">
              <span>🌍 Available in 50+ countries</span>
              <span>•</span>
              <span>🔒 SOC 2 Compliant</span>
              <span>•</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;