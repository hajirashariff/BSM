import React from 'react';
import ModernNavbar from './ModernNavbar';

interface ModernLayoutProps {
  children: React.ReactNode;
}

export default function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <ModernNavbar />
      <main className="relative">
        {children}
      </main>
      <footer className="relative z-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 BSM Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
