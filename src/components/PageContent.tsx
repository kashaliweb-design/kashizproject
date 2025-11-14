import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { PageData, ContentSection, FAQ } from '../utils/pagesData';

const PageContent: React.FC = () => {
  const location = useLocation();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    loadPageData();
  }, [location.pathname]);

  const loadPageData = () => {
    const savedData = localStorage.getItem('pagesData');
    if (savedData) {
      const pagesData: PageData[] = JSON.parse(savedData);
      const currentPage = pagesData.find(p => p.path === location.pathname);
      if (currentPage) {
        setPageData(currentPage);
      }
    }
  };

  if (!pageData || (!pageData.contentSections?.length && !pageData.faqs?.length)) {
    return null;
  }

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Content Sections */}
      {pageData.contentSections && pageData.contentSections.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-white">About This Tool</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.contentSections
              .sort((a, b) => a.order - b.order)
              .map((section: ContentSection) => (
                <div
                  key={section.id}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    {section.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {pageData.faqs && pageData.faqs.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {pageData.faqs
              .sort((a, b) => a.order - b.order)
              .map((faq: FAQ) => (
                <div
                  key={faq.id}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-lg"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-white/70" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/70" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4 pt-2 border-t border-white/10">
                      <p className="text-white/80 leading-relaxed pl-11">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContent;
