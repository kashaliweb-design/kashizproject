import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBackButton = false, seoTitle, seoDescription }) => {
  useEffect(() => {
    // Update document title
    document.title = seoTitle || title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (seoDescription) {
      metaDescription.setAttribute('content', seoDescription);
    }
  }, [title, seoTitle, seoDescription]);
  return (
    <div className="min-h-screen bg-dark-gradient">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 min-h-[calc(100vh-200px)]">
        {showBackButton && (
          <div className="mb-4 sm:mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors backdrop-blur-md bg-black/20 border border-glass rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
          </div>
        )}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;