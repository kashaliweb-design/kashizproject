import React, { useState } from 'react';
import Layout from '../../components/Layout';

const OpenGraphGenerator: React.FC = () => {
  const [ogData, setOgData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    type: 'website',
    siteName: '',
    locale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: ''
  });

  const ogTypes = [
    'website', 'article', 'book', 'profile', 'music.song', 'music.album', 
    'video.movie', 'video.episode', 'video.tv_show', 'video.other'
  ];

  const twitterCardTypes = [
    'summary', 'summary_large_image', 'app', 'player'
  ];

  const generateTags = () => {
    const tags = [];
    
    // Open Graph Tags
    if (ogData.title) tags.push(`<meta property="og:title" content="${ogData.title}" />`);
    if (ogData.description) tags.push(`<meta property="og:description" content="${ogData.description}" />`);
    if (ogData.image) tags.push(`<meta property="og:image" content="${ogData.image}" />`);
    if (ogData.url) tags.push(`<meta property="og:url" content="${ogData.url}" />`);
    if (ogData.type) tags.push(`<meta property="og:type" content="${ogData.type}" />`);
    if (ogData.siteName) tags.push(`<meta property="og:site_name" content="${ogData.siteName}" />`);
    if (ogData.locale) tags.push(`<meta property="og:locale" content="${ogData.locale}" />`);
    
    // Twitter Card Tags
    if (ogData.twitterCard) tags.push(`<meta name="twitter:card" content="${ogData.twitterCard}" />`);
    if (ogData.title) tags.push(`<meta name="twitter:title" content="${ogData.title}" />`);
    if (ogData.description) tags.push(`<meta name="twitter:description" content="${ogData.description}" />`);
    if (ogData.image) tags.push(`<meta name="twitter:image" content="${ogData.image}" />`);
    if (ogData.twitterSite) tags.push(`<meta name="twitter:site" content="${ogData.twitterSite}" />`);
    if (ogData.twitterCreator) tags.push(`<meta name="twitter:creator" content="${ogData.twitterCreator}" />`);
    
    return tags.join('\n');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTags());
  };

  const clearAll = () => {
    setOgData({
      title: '',
      description: '',
      image: '',
      url: '',
      type: 'website',
      siteName: '',
      locale: 'en_US',
      twitterCard: 'summary_large_image',
      twitterSite: '',
      twitterCreator: ''
    });
  };

  return (
    <Layout title="Open Graph Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Open Graph Data</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={ogData.title}
                  onChange={(e) => setOgData({...ogData, title: e.target.value})}
                  placeholder="Your page title"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={ogData.description}
                  onChange={(e) => setOgData({...ogData, description: e.target.value})}
                  placeholder="Brief description of your page"
                  className="w-full h-20 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={ogData.image}
                  onChange={(e) => setOgData({...ogData, image: e.target.value})}
                  placeholder="https://yoursite.com/image.jpg"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Page URL</label>
                <input
                  type="url"
                  value={ogData.url}
                  onChange={(e) => setOgData({...ogData, url: e.target.value})}
                  placeholder="https://yoursite.com/page"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Content Type</label>
                  <select
                    value={ogData.type}
                    onChange={(e) => setOgData({...ogData, type: e.target.value})}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {ogTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Twitter Card</label>
                  <select
                    value={ogData.twitterCard}
                    onChange={(e) => setOgData({...ogData, twitterCard: e.target.value})}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {twitterCardTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={ogData.siteName}
                  onChange={(e) => setOgData({...ogData, siteName: e.target.value})}
                  placeholder="Your Site Name"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Twitter Handle</label>
                  <input
                    type="text"
                    value={ogData.twitterSite}
                    onChange={(e) => setOgData({...ogData, twitterSite: e.target.value})}
                    placeholder="@yoursite"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Creator Handle</label>
                  <input
                    type="text"
                    value={ogData.twitterCreator}
                    onChange={(e) => setOgData({...ogData, twitterCreator: e.target.value})}
                    placeholder="@creator"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Social Media Preview</h3>
            
            {/* Facebook Preview */}
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 mb-4">
              <h4 className="text-white/80 font-medium mb-3">Facebook Preview</h4>
              <div className="border border-white/20 rounded-lg overflow-hidden bg-white">
                {ogData.image && (
                  <img 
                    src={ogData.image} 
                    alt="Preview" 
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="p-3">
                  <div className="text-gray-500 text-xs uppercase mb-1">
                    {ogData.url ? new URL(ogData.url).hostname : 'yoursite.com'}
                  </div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    {ogData.title || 'Your Page Title'}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {ogData.description || 'Your page description will appear here...'}
                  </div>
                </div>
              </div>
            </div>

            {/* Twitter Preview */}
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <h4 className="text-white/80 font-medium mb-3">Twitter Preview</h4>
              <div className="border border-white/20 rounded-lg overflow-hidden bg-white">
                {ogData.image && (
                  <img 
                    src={ogData.image} 
                    alt="Preview" 
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="p-3">
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    {ogData.title || 'Your Page Title'}
                  </div>
                  <div className="text-gray-600 text-xs mb-2">
                    {ogData.description || 'Your page description will appear here...'}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {ogData.url ? new URL(ogData.url).hostname : 'yoursite.com'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Tags */}
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
          
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-48 overflow-y-auto">
            <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
              {generateTags() || 'Open Graph tags will appear here...'}
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

        {/* Guidelines */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Open Graph Guidelines</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Use high-quality images (minimum 1200x630 pixels for best results)</p>
            <p>• Keep titles under 60 characters for optimal display</p>
            <p>• Write compelling descriptions under 160 characters</p>
            <p>• Use absolute URLs for all links and images</p>
            <p>• Test your tags using Facebook's Sharing Debugger</p>
            <p>• Include both Open Graph and Twitter Card tags for maximum compatibility</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpenGraphGenerator;