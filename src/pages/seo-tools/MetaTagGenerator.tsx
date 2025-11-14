import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const MetaTagGenerator: React.FC = () => {
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    viewport: 'width=device-width, initial-scale=1.0',
    robots: 'index, follow',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: ''
  });

  const generateMetaTags = () => {
    const tags = [];
    
    // Basic Meta Tags
    if (metaData.title) tags.push(`<title>${metaData.title}</title>`);
    if (metaData.description) tags.push(`<meta name="description" content="${metaData.description}">`);
    if (metaData.keywords) tags.push(`<meta name="keywords" content="${metaData.keywords}">`);
    if (metaData.author) tags.push(`<meta name="author" content="${metaData.author}">`);
    if (metaData.viewport) tags.push(`<meta name="viewport" content="${metaData.viewport}">`);
    if (metaData.robots) tags.push(`<meta name="robots" content="${metaData.robots}">`);
    
    // Open Graph Tags
    if (metaData.ogTitle) tags.push(`<meta property="og:title" content="${metaData.ogTitle}">`);
    if (metaData.ogDescription) tags.push(`<meta property="og:description" content="${metaData.ogDescription}">`);
    if (metaData.ogImage) tags.push(`<meta property="og:image" content="${metaData.ogImage}">`);
    if (metaData.ogUrl) tags.push(`<meta property="og:url" content="${metaData.ogUrl}">`);
    tags.push(`<meta property="og:type" content="website">`);
    
    // Twitter Card Tags
    if (metaData.twitterCard) tags.push(`<meta name="twitter:card" content="${metaData.twitterCard}">`);
    if (metaData.twitterTitle) tags.push(`<meta name="twitter:title" content="${metaData.twitterTitle}">`);
    if (metaData.twitterDescription) tags.push(`<meta name="twitter:description" content="${metaData.twitterDescription}">`);
    if (metaData.twitterImage) tags.push(`<meta name="twitter:image" content="${metaData.twitterImage}">`);
    
    return tags.join('\n');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
  };

  const clearAll = () => {
    setMetaData({
      title: '',
      description: '',
      keywords: '',
      author: '',
      viewport: 'width=device-width, initial-scale=1.0',
      robots: 'index, follow',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterCard: 'summary_large_image',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: ''
    });
  };

  return (
    <Layout title="Meta Tag Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Meta Tags */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Basic Meta Tags</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Page Title</label>
                <input
                  type="text"
                  value={metaData.title}
                  onChange={(e) => setMetaData({...metaData, title: e.target.value})}
                  placeholder="Your Page Title"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={metaData.description}
                  onChange={(e) => setMetaData({...metaData, description: e.target.value})}
                  placeholder="Brief description of your page"
                  className="w-full h-20 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Keywords</label>
                <input
                  type="text"
                  value={metaData.keywords}
                  onChange={(e) => setMetaData({...metaData, keywords: e.target.value})}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={metaData.author}
                  onChange={(e) => setMetaData({...metaData, author: e.target.value})}
                  placeholder="Your Name"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Robots</label>
                <select
                  value={metaData.robots}
                  onChange={(e) => setMetaData({...metaData, robots: e.target.value})}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                </select>
              </div>
            </div>
          </div>

          {/* Social Media Tags */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Social Media Tags</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white/80 font-medium mb-3">Open Graph (Facebook)</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={metaData.ogTitle}
                    onChange={(e) => setMetaData({...metaData, ogTitle: e.target.value})}
                    placeholder="OG Title"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <textarea
                    value={metaData.ogDescription}
                    onChange={(e) => setMetaData({...metaData, ogDescription: e.target.value})}
                    placeholder="OG Description"
                    className="w-full h-16 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <input
                    type="url"
                    value={metaData.ogImage}
                    onChange={(e) => setMetaData({...metaData, ogImage: e.target.value})}
                    placeholder="OG Image URL"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <input
                    type="url"
                    value={metaData.ogUrl}
                    onChange={(e) => setMetaData({...metaData, ogUrl: e.target.value})}
                    placeholder="Page URL"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-white/80 font-medium mb-3">Twitter Card</h4>
                <div className="space-y-3">
                  <select
                    value={metaData.twitterCard}
                    onChange={(e) => setMetaData({...metaData, twitterCard: e.target.value})}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                  <input
                    type="text"
                    value={metaData.twitterTitle}
                    onChange={(e) => setMetaData({...metaData, twitterTitle: e.target.value})}
                    placeholder="Twitter Title"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <textarea
                    value={metaData.twitterDescription}
                    onChange={(e) => setMetaData({...metaData, twitterDescription: e.target.value})}
                    placeholder="Twitter Description"
                    className="w-full h-16 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <input
                    type="url"
                    value={metaData.twitterImage}
                    onChange={(e) => setMetaData({...metaData, twitterImage: e.target.value})}
                    placeholder="Twitter Image URL"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Meta Tags */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Generated Meta Tags</h3>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Copy All Tags
            </button>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
            <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
              {generateMetaTags() || 'Meta tags will appear here...'}
            </pre>
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

        {/* SEO Tips */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Best Practices</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Keep title tags under 60 characters for optimal display in search results</p>
            <p>• Write compelling meta descriptions under 160 characters</p>
            <p>• Use relevant keywords naturally in your content</p>
            <p>• Ensure Open Graph images are at least 1200x630 pixels</p>
            <p>• Test your meta tags using Facebook Debugger and Twitter Card Validator</p>
          </div>
        </div>

        <PageContent />
      </div>
    </Layout>
  );
};

export default MetaTagGenerator;