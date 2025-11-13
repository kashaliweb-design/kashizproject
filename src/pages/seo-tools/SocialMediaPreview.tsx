import React, { useState } from 'react';
import Layout from '../../components/Layout';

const SocialMediaPreview: React.FC = () => {
  const [previewData, setPreviewData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    siteName: '',
    twitterHandle: ''
  });

  const copyMetaTags = () => {
    const tags = [
      `<meta property="og:title" content="${previewData.title}" />`,
      `<meta property="og:description" content="${previewData.description}" />`,
      `<meta property="og:image" content="${previewData.image}" />`,
      `<meta property="og:url" content="${previewData.url}" />`,
      `<meta property="og:type" content="website" />`,
      previewData.siteName && `<meta property="og:site_name" content="${previewData.siteName}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${previewData.title}" />`,
      `<meta name="twitter:description" content="${previewData.description}" />`,
      `<meta name="twitter:image" content="${previewData.image}" />`,
      previewData.twitterHandle && `<meta name="twitter:site" content="${previewData.twitterHandle}" />`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(tags);
  };

  const clearAll = () => {
    setPreviewData({
      title: '',
      description: '',
      image: '',
      url: '',
      siteName: '',
      twitterHandle: ''
    });
  };

  const loadSample = () => {
    setPreviewData({
      title: 'Ultimate SEO Tools Collection - Boost Your Rankings',
      description: 'Discover powerful SEO tools to optimize your website, analyze keywords, check backlinks, and improve search engine rankings. Free online SEO toolkit.',
      image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
      url: 'https://yoursite.com/seo-tools',
      siteName: 'Toolify',
      twitterHandle: '@toolify'
    });
  };

  return (
    <Layout title="Social Media Preview" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Preview Data</h3>
              <button
                onClick={loadSample}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Load Sample
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={previewData.title}
                  onChange={(e) => setPreviewData({...previewData, title: e.target.value})}
                  placeholder="Your page title"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <div className={`text-xs mt-1 ${
                  previewData.title.length <= 60 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {previewData.title.length}/60 characters
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={previewData.description}
                  onChange={(e) => setPreviewData({...previewData, description: e.target.value})}
                  placeholder="Brief description of your page"
                  className="w-full h-20 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <div className={`text-xs mt-1 ${
                  previewData.description.length <= 160 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {previewData.description.length}/160 characters
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={previewData.image}
                  onChange={(e) => setPreviewData({...previewData, image: e.target.value})}
                  placeholder="https://yoursite.com/image.jpg"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Page URL</label>
                <input
                  type="url"
                  value={previewData.url}
                  onChange={(e) => setPreviewData({...previewData, url: e.target.value})}
                  placeholder="https://yoursite.com/page"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Site Name</label>
                  <input
                    type="text"
                    value={previewData.siteName}
                    onChange={(e) => setPreviewData({...previewData, siteName: e.target.value})}
                    placeholder="Your Site"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Twitter Handle</label>
                  <input
                    type="text"
                    value={previewData.twitterHandle}
                    onChange={(e) => setPreviewData({...previewData, twitterHandle: e.target.value})}
                    placeholder="@yoursite"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <button
                onClick={copyMetaTags}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Copy Meta Tags
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Social Media Previews</h3>
            
            <div className="space-y-6">
              {/* Facebook Preview */}
              <div>
                <h4 className="text-white/80 font-medium mb-3">Facebook Preview</h4>
                <div className="border border-white/20 rounded-lg overflow-hidden bg-white max-w-md">
                  {previewData.image && (
                    <img 
                      src={previewData.image} 
                      alt="Preview" 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <div className="text-gray-500 text-xs uppercase mb-1">
                      {previewData.url ? new URL(previewData.url).hostname : 'yoursite.com'}
                    </div>
                    <div className="text-gray-900 font-semibold text-lg mb-1 line-clamp-2">
                      {previewData.title || 'Your Page Title'}
                    </div>
                    <div className="text-gray-600 text-sm line-clamp-2">
                      {previewData.description || 'Your page description will appear here...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitter Preview */}
              <div>
                <h4 className="text-white/80 font-medium mb-3">Twitter Preview</h4>
                <div className="border border-white/20 rounded-xl overflow-hidden bg-white max-w-md">
                  {previewData.image && (
                    <img 
                      src={previewData.image} 
                      alt="Preview" 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <div className="text-gray-900 font-semibold text-base mb-1 line-clamp-2">
                      {previewData.title || 'Your Page Title'}
                    </div>
                    <div className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {previewData.description || 'Your page description will appear here...'}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {previewData.url ? new URL(previewData.url).hostname : 'yoursite.com'}
                    </div>
                  </div>
                </div>
              </div>

              {/* LinkedIn Preview */}
              <div>
                <h4 className="text-white/80 font-medium mb-3">LinkedIn Preview</h4>
                <div className="border border-white/20 rounded-lg overflow-hidden bg-white max-w-md">
                  {previewData.image && (
                    <img 
                      src={previewData.image} 
                      alt="Preview" 
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-3">
                    <div className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">
                      {previewData.title || 'Your Page Title'}
                    </div>
                    <div className="text-gray-600 text-xs mb-2 line-clamp-2">
                      {previewData.description || 'Your page description will appear here...'}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {previewData.url ? new URL(previewData.url).hostname : 'yoursite.com'}
                    </div>
                  </div>
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

        {/* Social Media Guidelines */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Social Media Optimization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Image Specifications</div>
              <div className="text-white/70 text-sm">
                <div>• Facebook: 1200x630px</div>
                <div>• Twitter: 1200x675px</div>
                <div>• LinkedIn: 1200x627px</div>
                <div>• Format: JPG or PNG</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Text Guidelines</div>
              <div className="text-white/70 text-sm">
                <div>• Title: Under 60 characters</div>
                <div>• Description: Under 160 chars</div>
                <div>• Use compelling language</div>
                <div>• Include call-to-action</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Testing Tools</div>
              <div className="text-white/70 text-sm">
                <div>• Facebook Debugger</div>
                <div>• Twitter Card Validator</div>
                <div>• LinkedIn Post Inspector</div>
                <div>• Open Graph Checker</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SocialMediaPreview;