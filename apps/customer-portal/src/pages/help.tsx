import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ModernLayout from '../components/ModernLayout';

import { 
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  BookOpen,
  FileText,
  Video,
  Download,
  Star,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Ticket,
  User,
  Settings,
  Bell,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

const supportMethods = [
  {
    id: 'ticket',
    title: 'Create Support Ticket',
    description: 'Submit a detailed support request and track its progress',
    icon: Ticket,
    color: 'from-blue-500 to-cyan-500',
    href: '/tickets',
    action: 'Create Ticket'
  },
  {
    id: 'phone',
    title: 'Call Support',
    description: 'Speak directly with our support team',
    icon: Phone,
    color: 'from-green-500 to-emerald-500',
    contact: '+1 (555) 123-4567',
    availability: 'Mon-Fri 9AM-6PM EST'
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    icon: Mail,
    color: 'from-purple-500 to-pink-500',
    contact: 'support@bsm.com',
    response: '24 hours'
  },
  {
    id: 'chat',
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    availability: 'Mon-Fri 9AM-6PM EST',
    status: 'Online'
  }
];

const faqCategories = [
  {
    id: 'account',
    title: 'Account & Profile',
    icon: User,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-100/20',
    questions: [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile to update your personal information, contact details, and preferences.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Navigate to Settings > Security > Change Password. You\'ll need to enter your current password and create a new one.'
      },
      {
        question: 'How do I update my notification preferences?',
        answer: 'Visit Settings > Notifications to customize which notifications you receive and how you receive them.'
      }
    ]
  },
  {
    id: 'tickets',
    title: 'Support Tickets',
    icon: Ticket,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-100/20',
    questions: [
      {
        question: 'How do I create a support ticket?',
        answer: 'Click on "Create Ticket" in the navigation or go to the Tickets page and click the "New Ticket" button.'
      },
      {
        question: 'How can I track my ticket status?',
        answer: 'All your tickets are visible on the Tickets page with real-time status updates and progress tracking.'
      },
      {
        question: 'Can I attach files to my ticket?',
        answer: 'Yes, you can attach files, screenshots, and documents when creating or updating a ticket.'
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    icon: CheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-100/20',
    questions: [
      {
        question: 'How do I view my billing history?',
        answer: 'Go to Settings > Billing to view your invoices, payment history, and billing information.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.'
      },
      {
        question: 'How do I update my payment method?',
        answer: 'Navigate to Settings > Billing > Payment Methods to add, update, or remove payment methods.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: Settings,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-100/20',
    questions: [
      {
        question: 'What are the system requirements?',
        answer: 'Our platform works on all modern browsers. We recommend Chrome, Firefox, Safari, or Edge with JavaScript enabled.'
      },
      {
        question: 'How do I troubleshoot login issues?',
        answer: 'Try clearing your browser cache, check your internet connection, or reset your password if needed.'
      },
      {
        question: 'Is there a mobile app available?',
        answer: 'Yes, our mobile app is available for iOS and Android devices. Download it from the App Store or Google Play.'
      }
    ]
  }
];

const quickLinks = [
  {
    title: 'User Guide',
    description: 'Complete guide to using our platform',
    icon: BookOpen,
    href: '#',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'API Documentation',
    description: 'Technical documentation for developers',
    icon: FileText,
    href: '#',
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides',
    icon: Video,
    href: '#',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'System Status',
    description: 'Check current system status and uptime',
    icon: Globe,
    href: '/services',
    color: 'from-orange-500 to-red-500'
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFaqToggle = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const filteredSupportMethods = supportMethods.filter(method =>
    method.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuickLinks = quickLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ModernLayout>
      <Head>
        <title>Customer Support - BSM Customer Portal</title>
        <meta name="description" content="Get help and support for your BSM platform" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Customer Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're here to help! Get support through multiple channels and find answers to common questions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Support Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How can we help you?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSupportMethods.map((method) => (
              <div
                key={method.id}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg p-6 text-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <method.icon className="w-8 h-8 mr-3" />
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                </div>
                <p className="text-white/90 mb-4">{method.description}</p>
                {method.href ? (
                  <Link
                    href={method.href}
                    className="inline-flex items-center text-white font-medium hover:text-white/80 transition-colors"
                  >
                    {method.action}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <p className="text-white/90 font-medium">{method.contact}</p>
                    {method.availability && (
                      <p className="text-white/70 text-sm">{method.availability}</p>
                    )}
                    {method.response && (
                      <p className="text-white/70 text-sm">Response time: {method.response}</p>
                    )}
                    {method.status && (
                      <span className="inline-flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {method.status}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Quick Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredQuickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg p-6 text-white hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center mb-4">
                  <link.icon className="w-8 h-8 mr-3" />
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                </div>
                <p className="text-white/90 mb-4">{link.description}</p>
                <div className="flex items-center text-white font-medium group-hover:text-white/80 transition-colors">
                  Learn More
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          {searchQuery && (
            <div className="text-center text-gray-600 dark:text-gray-400 mb-8">
              <p className="text-lg font-medium mb-2">
                Search results for "{searchQuery}"
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <span>{filteredSupportMethods.length} support methods</span>
                <span>{filteredQuickLinks.length} resources</span>
                <span>{filteredFaqs.reduce((total, category) => total + category.questions.length, 0)} FAQs</span>
              </div>
              {filteredSupportMethods.length === 0 && filteredQuickLinks.length === 0 && filteredFaqs.reduce((total, category) => total + category.questions.length, 0) === 0 && (
                <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    No results found for "{searchQuery}". Try different keywords or browse our support methods below.
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="space-y-6">
            {filteredFaqs.map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <button
                          onClick={() => handleFaqToggle(`${category.id}-${index}`)}
                          className="w-full text-left py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-2 -mx-2 transition-colors"
                        >
                          <span className="font-medium text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </span>
                          {expandedFaq === `${category.id}-${index}` ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === `${category.id}-${index}` && (
                          <div className="pb-4 px-2 -mx-2">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Create Support Ticket
            </Link>
            <a
              href="mailto:support@bsm.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}