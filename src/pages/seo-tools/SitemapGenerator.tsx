import React, { useState } from 'react';
import Layout from '../../components/Layout';

const SitemapGenerator: React.FC = () => {
  const [urls, setUrls] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [priority, setPriority] = useState('0.8');
  const [changeFreq, setChangeFreq] = useState('weekly');
  const [sitemap, setSitemap] = useState('');

  const frequencies = [
    'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
  ];

  const generateSitemap = () => {
    if (!siteUrl.trim() || !urls.trim()) return;

    const urlList = urls.split('\n').filter(url => url.trim() !== '');
    const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urlList.forEach(url => {
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
      xml += '  <url>\n';
      xml += `    <loc>${fullUrl}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${changeFreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    setSitemap(xml);
  };

  const downloadSitemap = () => {
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitemap);
  };

  const clearAll = () => {
    setUrls('');
    setSiteUrl('');
    setSitemap('');
  };

  const sampleUrls = `https://yoursite.com/
https://yoursite.com/about
https://yoursite.com/services
https://yoursite.com/contact
https://yoursite.com/blog
https://yoursite.com/products`;

  return (
    <Layout title="Sitemap Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Sitemap Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Website URL</label>
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white/70 text-sm font-medium">URLs (one per line)</label>
                  <button
                    onClick={() => setUrls(sampleUrls)}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                  >
                    Load Sample
                  </button>
                </div>
                <textarea
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  placeholder="Enter URLs, one per line..."
                  className="w-full h-32 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="1.0">1.0 (Highest)</option>
                    <option value="0.9">0.9</option>
                    <option value="0.8">0.8</option>
                    <option value="0.7">0.7</option>
                    <option value="0.6">0.6</option>
                    <option value="0.5">0.5 (Medium)</option>
                    <option value="0.4">0.4</option>
                    <option value="0.3">0.3</option>
                    <option value="0.2">0.2</option>
                    <option value="0.1">0.1 (Lowest)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Change Frequency</label>
                  <select
                    value={changeFreq}
                    onChange={(e) => setChangeFreq(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {frequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={generateSitemap}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Generate Sitemap
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Generated Sitemap</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
                <button
                  onClick={downloadSitemap}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Download
                </button>
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {sitemap || 'Sitemap XML will appear here...'}
              </pre>
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

        {/* Sitemap Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sitemap Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Priority Guidelines</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1.0 - Homepage</div>
                  <div className="text-white/60">Most important page</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">0.8 - Main Categories</div>
                  <div className="text-white/60">Important section pages</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">0.6 - Content Pages</div>
                  <div className="text-white/60">Blog posts, articles</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">0.4 - Archive Pages</div>
                  <div className="text-white/60">Tag pages, archives</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Change Frequency</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Daily</div>
                  <div className="text-white/60">News sites, blogs</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Weekly</div>
                  <div className="text-white/60">Regular content updates</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Monthly</div>
                  <div className="text-white/60">Business pages</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Yearly</div>
                  <div className="text-white/60">Static pages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SitemapGenerator;