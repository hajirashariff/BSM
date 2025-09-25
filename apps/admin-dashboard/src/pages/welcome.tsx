import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  MapPin
} from 'lucide-react';

const WelcomePage = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">BSM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BSM Pro</h1>
              <p className="text-xs text-gray-500 font-medium">Enterprise Workflow Platform</p>
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
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <motion.div
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 font-semibold text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  🚀 Trusted by top teams worldwide
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Enterprise Workflow
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Automation Platform
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Streamline operations with AI-powered workflow automation, intelligent service management, 
                and real-time analytics. Built for teams that demand scalability, security, and seamless integration.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  Enterprise Security
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  Real-time Processing
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  AI-Powered Insights
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial <Rocket className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link href="/login">
                  <motion.button
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" /> Watch Demo
                  </motion.button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Setup in minutes
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-6">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">BSM Pro Dashboard</div>
                  </div>
                  
                  {/* Dashboard Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Active Workflows</p>
                          <p className="text-2xl font-bold text-blue-900">247</p>
                        </div>
                        <Workflow className="w-8 h-8 text-blue-600" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Success Rate</p>
                          <p className="text-2xl font-bold text-green-900">99.2%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Mini Chart */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Real-time Analytics</span>
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 60, 45, 80, 65, 90, 75, 95, 70, 85].map((height, i) => (
                        <motion.div
                          key={i}
                          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t flex-1"
                          style={{ height: `${height}%` }}
                          animate={{ height: [`${height * 0.5}%`, `${height}%`] }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-full p-3 shadow-lg border"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Shield className="w-6 h-6 text-green-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Business Service Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From workflow automation to service requests, account management to analytics - 
              everything your enterprise needs in one unified platform
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Workflow className="w-8 h-8" />,
                title: "Workflow Engine",
                description: "AI-powered automation with visual builder and real-time monitoring",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Ticket className="w-8 h-8" />,
                title: "Service Requests",
                description: "Smart routing, SLA management, and automated escalations",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Account Management",
                description: "360° client view with health analytics and insights",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <Server className="w-8 h-8" />,
                title: "Asset Management",
                description: "Track, monitor, and optimize your digital infrastructure",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Analytics & Reports",
                description: "Real-time dashboards with predictive insights",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "User Management",
                description: "Role-based access control with activity monitoring",
                color: "from-pink-500 to-pink-600"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Knowledge Base",
                description: "Centralized documentation with AI-powered search",
                color: "from-teal-500 to-teal-600"
              },
              {
                icon: <Plug className="w-8 h-8" />,
                title: "Integrations",
                description: "Connect with 200+ tools and enterprise systems",
                color: "from-red-500 to-red-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 text-center group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${item.color} p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            {...fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Enterprise Teams</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of organizations that rely on BSM Pro for their workflow automation and service management needs
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { label: "Fortune 500 Companies", value: "250+", icon: <Building2 className="w-8 h-8" /> },
                { label: "Active Workflows", value: "1M+", icon: <Workflow className="w-8 h-8" /> },
                { label: "Countries Served", value: "50+", icon: <Globe className="w-8 h-8" /> },
                { label: "Uptime Guarantee", value: "99.9%", icon: <Shield className="w-8 h-8" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-20">
          {[
            {
              title: "Organize workflows like never before",
              description: "Create, manage, and optimize workflows with our intuitive drag-and-drop builder. Automate repetitive tasks and focus on what matters most.",
              image: <Workflow className="w-full h-full text-blue-600" />,
              reverse: false
            },
            {
              title: "Automate tasks intelligently",
              description: "Let AI handle the routine work while your team focuses on strategic initiatives. Smart automation that learns and adapts.",
              image: <Zap className="w-full h-full text-purple-600" />,
              reverse: true
            },
            {
              title: "Manage users and roles effortlessly",
              description: "Comprehensive user management with role-based access control. Keep your organization secure and organized.",
              image: <Shield className="w-full h-full text-green-600" />,
              reverse: false
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`space-y-6 ${feature.reverse ? 'lg:order-2' : ''}`}>
                <h3 className="text-3xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <motion.button
                  className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              
              <motion.div
                className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 ${feature.reverse ? 'lg:order-1' : ''}`}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-32 h-32 mx-auto">
                  {feature.image}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Where your team + AI comes together
            </h2>
            <p className="text-xl text-gray-600">
              Seamless collaboration powered by intelligent automation
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Real-time updates",
                description: "Stay synchronized with instant notifications and live updates across all your workflows."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Role-based dashboards",
                description: "Customized views for every team member based on their role and responsibilities."
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Team synchronization",
                description: "Keep everyone aligned with shared calendars, deadlines, and project milestones."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              >
                <div className="text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Teams Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="space-y-6"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Bring your whole team together under one roof
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Manage admins, customers, and workflows in one unified platform. 
              Break down silos and create seamless collaboration across your entire organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Big Picture Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              {...slideInLeft}
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Track every project in one dashboard
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Map goals to progress with comprehensive analytics. 
                Get real-time insights into your team's performance and project status.
              </p>
              <div className="flex items-center gap-4">
                <motion.button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </motion.button>
                <motion.button
                  className="text-blue-600 font-semibold flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-xl"
              {...slideInRight}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-sm text-gray-600">Active Projects</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[60, 80, 45, 90].map((value, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-16 text-sm text-gray-600">Q{index + 1}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${value}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600">{value}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Integrates with your favorite tools
            </h2>
            <p className="text-xl text-gray-600">
              Connect seamlessly with the tools your team already uses
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              'Slack', 'Google Drive', 'Zoom', 'Trello', 'GitHub', 'Figma',
              'Notion', 'Dropbox', 'Microsoft Teams', 'Jira', 'Asana', 'Linear'
            ].map((tool, index) => (
              <motion.div
                key={tool}
                className="bg-gray-50 p-6 rounded-xl text-center group cursor-pointer border border-gray-200"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  borderColor: "rgb(59, 130, 246)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold">
                  {tool.charAt(0)}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {tool}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5, 
              rotateX: 2, 
              rotateY: 2,
              boxShadow: "0 30px 60px rgba(0,0,0,0.15)" 
            }}
          >
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              "BSM Pro has completely transformed how our team collaborates. The workflow automation 
              saves us hours every week, and the unified dashboard gives us visibility we never had before."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                SJ
              </div>
              <div>
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-gray-600">Head of Operations, TechCorp</div>
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BSM</span>
                </div>
                <h1 className="text-xl font-bold">BSM Pro</h1>
              </div>
              <p className="text-gray-400">
                Empowering teams with intelligent workflow automation and seamless collaboration.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                {['Features', 'Integrations', 'Pricing', 'API'].map((item) => (
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
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
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
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
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
              © 2024 BSM Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
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
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
