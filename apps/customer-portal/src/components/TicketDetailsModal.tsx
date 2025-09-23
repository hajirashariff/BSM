import React, { useState } from 'react';
import { X, MessageSquare, Paperclip, Clock, User, Tag, AlertCircle, CheckCircle, XCircle, Edit, Trash2, Send } from 'lucide-react';

interface TicketDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket;
  onUpdate: (ticketId: string, updates: Partial<Ticket>) => void;
  onAddComment: (ticketId: string, comment: string) => void;
}

interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assignee: string;
  created: string;
  updated: string;
  comments: Comment[];
  attachments: Attachment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  url: string;
}

const statusConfig = {
  'Open': { color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900', icon: AlertCircle },
  'In Progress': { color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900', icon: Clock },
  'Resolved': { color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900', icon: CheckCircle },
  'Closed': { color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900', icon: XCircle },
};

const priorityConfig = {
  'Low': { color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' },
  'Medium': { color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900' },
  'High': { color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' },
  'Urgent': { color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' },
};

export default function TicketDetailsModal({ isOpen, onClose, ticket, onUpdate, onAddComment }: TicketDetailsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    subject: ticket.subject,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status
  });

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsAddingComment(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    onAddComment(ticket.id, newComment);
    setNewComment('');
    setIsAddingComment(false);
  };

  const handleSaveEdit = () => {
    onUpdate(ticket.id, editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  const statusInfo = statusConfig[ticket.status as keyof typeof statusConfig];
  const priorityInfo = priorityConfig[ticket.priority as keyof typeof priorityConfig];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.subject}
                    onChange={(e) => setEditData(prev => ({ ...prev, subject: e.target.value }))}
                    className="px-2 py-1 border border-gray-300 dark:border-zinc-600 rounded dark:bg-zinc-800 dark:text-zinc-100"
                  />
                ) : (
                  ticket.subject
                )}
              </h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                {ticket.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bgColor} ${priorityInfo.color}`}>
                {ticket.priority}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Edit size={16} className="text-gray-500 dark:text-zinc-400" />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-sm rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Ticket Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Tag size={16} className="text-gray-500 dark:text-zinc-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Category</span>
              </div>
              <p className="text-sm text-gray-900 dark:text-zinc-100 capitalize">{ticket.category}</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <User size={16} className="text-gray-500 dark:text-zinc-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Assignee</span>
              </div>
              <p className="text-sm text-gray-900 dark:text-zinc-100">{ticket.assignee}</p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={16} className="text-gray-500 dark:text-zinc-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Created</span>
              </div>
              <p className="text-sm text-gray-900 dark:text-zinc-100">{formatDate(ticket.created)}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-3">Description</h3>
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-zinc-100"
                />
              ) : (
                <p className="text-gray-900 dark:text-zinc-100 whitespace-pre-wrap">{ticket.description}</p>
              )}
            </div>
          </div>

          {/* Attachments */}
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-3">Attachments</h3>
              <div className="space-y-2">
                {ticket.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Paperclip size={16} className="text-gray-500 dark:text-zinc-400" />
                      <span className="text-sm text-gray-900 dark:text-zinc-100">{attachment.name}</span>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        ({formatFileSize(attachment.size)})
                      </span>
                    </div>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-3">Comments</h3>
            <div className="space-y-4">
              {ticket.comments && ticket.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg ${
                    comment.isInternal
                      ? 'bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400'
                      : 'bg-gray-50 dark:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{comment.author}</span>
                      {comment.isInternal && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                          Internal
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-zinc-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-900 dark:text-zinc-100 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-700 dark:text-zinc-100"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleAddComment}
                  disabled={isAddingComment || !newComment.trim()}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isAddingComment ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
