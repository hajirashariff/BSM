import React, { useState } from 'react';
import { X, Download, Send, Edit, Trash2, Eye, Calendar, DollarSign, User, Mail, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Invoice, InvoiceItem } from '../lib/billingService';

interface InvoiceDetailsModalProps {
  invoice: Invoice;
  onClose: () => void;
  onUpdate?: (invoice: Invoice) => void;
  onDelete?: (invoiceId: string) => void;
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  refunded: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
};

const statusIcons = {
  draft: FileText,
  sent: Send,
  paid: CheckCircle,
  overdue: AlertTriangle,
  cancelled: X,
  refunded: Clock
};

export default function InvoiceDetailsModal({ invoice, onClose, onUpdate, onDelete }: InvoiceDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'items' | 'history' | 'attachments'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<Invoice>(invoice);

  const StatusIcon = statusIcons[invoice.status];

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedInvoice);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      if (onDelete) {
        onDelete(invoice.id);
      }
      onClose();
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <StatusIcon className="h-6 w-6 text-gray-600 dark:text-zinc-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">
                {invoice.invoiceNumber}
              </h2>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[invoice.status]}`}>
              {invoice.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
              title="Edit invoice"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
              title="Delete invoice"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-zinc-800">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'details', label: 'Details', icon: Eye },
              { id: 'items', label: 'Items', icon: FileText },
              { id: 'history', label: 'History', icon: Clock },
              { id: 'attachments', label: 'Attachments', icon: Download }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-zinc-400 dark:hover:text-zinc-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Invoice Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">Invoice Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-zinc-400">Invoice Number:</span>
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{invoice.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-zinc-400">Issue Date:</span>
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{formatDate(invoice.issueDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-zinc-400">Due Date:</span>
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{formatDate(invoice.dueDate)}</span>
                    </div>
                    {invoice.paidDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-zinc-400">Paid Date:</span>
                        <span className="font-medium text-gray-900 dark:text-zinc-100">{formatDate(invoice.paidDate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-zinc-400">Total Amount:</span>
                      <span className="font-bold text-lg text-gray-900 dark:text-zinc-100">
                        {formatCurrency(invoice.totalAmount, invoice.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{invoice.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-zinc-400">{invoice.customerEmail}</span>
                    </div>
                    {invoice.paymentMethod && (
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-zinc-400">
                          Payment: {invoice.paymentMethod.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    )}
                    {invoice.paymentReference && (
                      <div className="flex items-center space-x-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-zinc-400">Ref: {invoice.paymentReference}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-4">Amount Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Subtotal:</span>
                    <span className="text-gray-900 dark:text-zinc-100">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                  </div>
                  {invoice.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Tax:</span>
                    <span className="text-gray-900 dark:text-zinc-100">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-zinc-700 pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">Notes</h3>
                  <p className="text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 rounded-lg p-3">
                    {invoice.notes}
                  </p>
                </div>
              )}

              {/* Recurring Information */}
              {invoice.recurring && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Recurring Invoice</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Frequency:</span>
                      <span className="text-blue-900 dark:text-blue-100 capitalize">{invoice.recurring.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Next Due:</span>
                      <span className="text-blue-900 dark:text-blue-100">{formatDate(invoice.recurring.nextDueDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invoice.recurring.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {invoice.recurring.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'items' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">Invoice Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                  <thead className="bg-gray-50 dark:bg-zinc-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700">
                    {invoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                              {item.description}
                            </div>
                            {item.servicePeriod && (
                              <div className="text-sm text-gray-500 dark:text-zinc-400">
                                {formatDate(item.servicePeriod.startDate)} - {formatDate(item.servicePeriod.endDate)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-zinc-800 dark:text-zinc-300">
                            {item.category.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-zinc-100">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-zinc-100">
                          {formatCurrency(item.unitPrice, invoice.currency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-zinc-100">
                          {formatCurrency(item.totalPrice, invoice.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">Invoice History</h3>
              <div className="space-y-4">
                {invoice.history.map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                          {entry.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">
                        by {entry.user}
                      </p>
                      {entry.changes && Object.keys(entry.changes).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {Object.entries(entry.changes).map(([key, change]) => (
                            <div key={key} className="text-xs text-gray-500 dark:text-zinc-400">
                              <span className="font-medium">{key}:</span> {String(change.from)} → {String(change.to)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">Attachments</h3>
              {invoice.attachments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-zinc-400">No attachments available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {invoice.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-zinc-700 rounded-lg">
                      <FileText size={24} className="text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
                          {attachment.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                          {(attachment.size / 1024).toFixed(1)} KB • {attachment.type}
                        </p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <Download size={16} />
              <span>Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <Send size={16} />
              <span>Send Email</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

