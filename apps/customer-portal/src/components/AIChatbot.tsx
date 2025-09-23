import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  X, 
  Minimize2,
  Maximize2,
  Sparkles,
  HelpCircle,
  FileText,
  Search
} from 'lucide-react';
import aiService from '../lib/aiService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  isTyping?: boolean;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ 
  isOpen, 
  onClose, 
  onMinimize, 
  isMinimized = false 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI assistant. I can help you with tickets, account information, knowledge base searches, and more. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Create a new ticket",
        "Search knowledge base",
        "Check account status",
        "Get help with workflows"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Simulate AI response (replace with actual AI service call)
      const response = await generateAIResponse(inputMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error. Please try again or contact support if the issue persists.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const generateAIResponse = async (message: string): Promise<{ content: string; suggestions?: string[] }> => {
    // Mock AI response generation
    // In a real implementation, this would call your AI service
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ticket') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
      return {
        content: "I can help you with tickets! You can create a new ticket, check the status of existing tickets, or search for solutions in our knowledge base. What would you like to do?",
        suggestions: [
          "Create new ticket",
          "Check ticket status",
          "Search knowledge base",
          "View my tickets"
        ]
      };
    }
    
    if (lowerMessage.includes('account') || lowerMessage.includes('billing') || lowerMessage.includes('payment')) {
      return {
        content: "I can help you with account-related questions. I can check your account status, billing information, or help you understand your service details. What specific information do you need?",
        suggestions: [
          "Check account status",
          "View billing information",
          "Update account details",
          "Contact account manager"
        ]
      };
    }
    
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('knowledge')) {
      return {
        content: "I can help you search our knowledge base! I can look up articles, guides, and solutions. What topic would you like to search for?",
        suggestions: [
          "Search for VPN issues",
          "Find email setup guides",
          "Look up password reset",
          "Browse all articles"
        ]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return {
        content: "I'm here to help! I can assist you with tickets, account management, knowledge base searches, and general questions. I can also connect you with a human support agent if needed. What do you need help with?",
        suggestions: [
          "Get general help",
          "Contact support agent",
          "Browse help topics",
          "Check system status"
        ]
      };
    }
    
    // Default response
    return {
      content: "I understand you're looking for help. I can assist you with tickets, account information, knowledge base searches, and more. Could you be more specific about what you need help with?",
      suggestions: [
        "Create a ticket",
        "Search knowledge base",
        "Check account status",
        "Get general help"
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={onMinimize}
          className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <MessageCircle size={20} />
          <span>AI Assistant</span>
          <Maximize2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-white bg-opacity-20 rounded-lg">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-purple-100">Powered by AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              <Minimize2 size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-2 rounded-full ${
                message.type === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
                
                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium">Quick actions:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-2">
              <div className="p-2 rounded-full bg-gray-100 text-gray-700">
                <Bot size={16} />
              </div>
              <div className="bg-gray-100 text-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-1">
                  <Loader2 className="animate-spin" size={14} />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        
        {/* Quick actions */}
        <div className="mt-2 flex flex-wrap gap-1">
          {['Help', 'Tickets', 'Account', 'Search'].map((action) => (
            <button
              key={action}
              onClick={() => handleSuggestionClick(action)}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;

