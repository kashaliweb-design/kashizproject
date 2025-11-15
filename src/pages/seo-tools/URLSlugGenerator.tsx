import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const stopWords = [
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it',
  'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they',
  'have', 'had', 'what', 'said', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'up', 'out',
  'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him',
  'time', 'two', 'more', 'go', 'no', 'way', 'could', 'my', 'than', 'first', 'been', 'call', 'who',
  'oil', 'sit', 'now', 'find', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'
];

const URLSlugGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [options, setOptions] = useState({
    lowercase: true,
    removeStopWords: false,
    maxLength: 50
  });

  const generateSlug = useCallback((inputTitle: string) => {
    let processedTitle = inputTitle.trim();
    
    if (options.lowercase) {
      processedTitle = processedTitle.toLowerCase();
    }
    
    if (options.removeStopWords) {
      const words = processedTitle.split(/\s+/);
      const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
      processedTitle = filteredWords.join(' ');
    }
    
    // Convert to slug
    let slugResult = processedTitle
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    
    // Limit length
    if (options.maxLength && slugResult.length > options.maxLength) {
      slugResult = slugResult.substring(0, options.maxLength).replace(/-[^-]*$/, '');
    }
    
    return slugResult;
  }, [options]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  // Update slug when options change
  useEffect(() => {
    if (title) {
      setSlug(generateSlug(title));
    }
  }, [options, title, generateSlug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
  };

  const clearAll = () => {
    setTitle('');
    setSlug('');
  };

  const examples = [
    'How to Create SEO Friendly URLs',
    'Best Practices for Web Development in 2024',
    'The Ultimate Guide to Digital Marketing',
    'Top 10 JavaScript Frameworks You Should Know',
    'Why Mobile-First Design Matters for Your Business'
  ];

  return (
    <Layout title="URL Slug Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Title Input</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Page Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter your page title..."
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-white/80 font-medium">Options</h4>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.lowercase}
                    onChange={(e) => setOptions({...options, lowercase: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-white/70 text-sm">Convert to lowercase</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.removeStopWords}
                    onChange={(e) => setOptions({...options, removeStopWords: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-white/70 text-sm">Remove stop words</span>
                </label>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Max Length: {options.maxLength}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={options.maxLength}
                    onChange={(e) => setOptions({...options, maxLength: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-white/80 font-medium mb-3">Try Examples</h4>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleTitleChange(example)}
                      className="w-full p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm text-left"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Generated URL Slug</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy Slug
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="text-white/70 text-sm mb-2">URL Slug:</div>
                <div className="text-white font-mono text-lg break-all">
                  {slug || 'URL slug will appear here...'}
                </div>
              </div>

              <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="text-white/70 text-sm mb-2">Full URL Example:</div>
                <div className="text-white/90 font-mono text-sm break-all">
                  https://yoursite.com/{slug || 'your-url-slug'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="text-white font-bold">{slug.length}</div>
                  <div className="text-white/70 text-xs">Characters</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="text-white font-bold">{slug.split('-').length}</div>
                  <div className="text-white/70 text-xs">Words</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className={`font-bold ${slug.length <= 50 ? 'text-green-400' : slug.length <= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {slug.length <= 50 ? 'Good' : slug.length <= 75 ? 'OK' : 'Long'}
                  </div>
                  <div className="text-white/70 text-xs">SEO Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* SEO Guidelines */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">URL Slug Best Practices</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Keep URLs short and descriptive (under 50 characters is ideal)</p>
            <p>• Use hyphens (-) to separate words, not underscores</p>
            <p>• Include target keywords naturally</p>
            <p>• Avoid special characters and spaces</p>
            <p>• Use lowercase letters for consistency</p>
            <p>• Remove unnecessary stop words for cleaner URLs</p>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default URLSlugGenerator;