import React, { useState } from 'react';
import Layout from '../../components/Layout';

const CanonicalTagGenerator: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [urlVariations, setUrlVariations] = useState('');

  const generateCanonicalTag = () => {
    if (!canonicalUrl.trim()) return '';
    return `<link rel="canonical" href="${canonicalUrl}" />`;
  };

  const analyzeUrlVariations = () => {
    if (!currentUrl.trim()) return [];
    
    const baseUrl = currentUrl.replace(/\/$/, ''); // Remove trailing slash
    const variations = [
      baseUrl,
      baseUrl + '/',
      baseUrl.replace('https://', 'http://'),
      baseUrl.replace('http://', 'https://'),
      baseUrl.replace('www.', ''),
      baseUrl.includes('www.') ? baseUrl : baseUrl.replace('://', '://www.'),
      baseUrl + '?utm_source=google',
      baseUrl + '#section1',
      baseUrl + '/index.html'
    ];
    
    return [...new Set(variations)]; // Remove duplicates
  };

  const copyCanonicalTag = () => {
    navigator.clipboard.writeText(generateCanonicalTag());
  };

  const copyAllVariations = () => {
    const variations = analyzeUrlVariations();
    navigator.clipboard.writeText(variations.join('\n'));
  };

  const clearAll = () => {
    setCurrentUrl('');
    setCanonicalUrl('');
    setUrlVariations('');
  };

  const urlVariationsList = analyzeUrlVariations();

  return (
    <Layout title="Canonical Tag Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">URL Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Current Page URL</label>
                <input
                  type="url"
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  placeholder="https://yoursite.com/page"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Canonical URL</label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://yoursite.com/preferred-url"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={() => setCanonicalUrl(currentUrl)}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Use Current URL as Canonical
              </button>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Additional URL Variations</label>
                <textarea
                  value={urlVariations}
                  onChange={(e) => setUrlVariations(e.target.value)}
                  placeholder="Enter additional URL variations that should point to the canonical URL..."
                  className="w-full h-20 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Generated Tag */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Generated Canonical Tag</h3>
              <button
                onClick={copyCanonicalTag}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy Tag
              </button>
            </div>
            
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 mb-4">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {generateCanonicalTag() || 'Canonical tag will appear here...'}
              </pre>
            </div>

            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">How to Use</h4>
              <div className="text-white/70 text-sm space-y-1">
                <p>1. Copy the generated canonical tag</p>
                <p>2. Paste it in the &lt;head&gt; section of your HTML</p>
                <p>3. Add the same tag to all duplicate pages</p>
                <p>4. Ensure the canonical URL is accessible</p>
              </div>
            </div>
          </div>
        </div>

        {/* URL Variations */}
        {currentUrl && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Potential URL Variations</h3>
              <button
                onClick={copyAllVariations}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy All
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {urlVariationsList.map((variation, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 font-mono text-sm break-all">{variation}</span>
                    <button
                      onClick={() => setCanonicalUrl(variation)}
                      className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs rounded hover:opacity-90 transition-opacity ml-2"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Canonical URL Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">About Canonical URLs</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Canonical tags tell search engines which version of a URL is the "master" copy</p>
            <p>• Helps prevent duplicate content issues when multiple URLs show the same content</p>
            <p>• Consolidates ranking signals to the preferred URL version</p>
            <p>• Essential for e-commerce sites with product variations and filters</p>
            <p>• Should point to the most complete and user-friendly version of the page</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Common Use Cases</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="text-white/70 font-medium">HTTP vs HTTPS</div>
                <div className="text-white/60 text-sm">Point to the secure HTTPS version</div>
              </div>
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="text-white/70 font-medium">WWW vs Non-WWW</div>
                <div className="text-white/60 text-sm">Choose one consistent format</div>
              </div>
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="text-white/70 font-medium">URL Parameters</div>
                <div className="text-white/60 text-sm">Point to clean URL without tracking params</div>
              </div>
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="text-white/70 font-medium">Trailing Slashes</div>
                <div className="text-white/60 text-sm">Be consistent with or without trailing slash</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CanonicalTagGenerator;