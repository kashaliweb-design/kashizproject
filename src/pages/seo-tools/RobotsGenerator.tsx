import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const RobotsGenerator: React.FC = () => {
  const [siteUrl, setSiteUrl] = useState('');
  const [rules, setRules] = useState([
    { userAgent: '*', allow: '/', disallow: '' }
  ]);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');

  const addRule = () => {
    setRules([...rules, { userAgent: '*', allow: '', disallow: '' }]);
  };

  const updateRule = (index: number, field: string, value: string) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const generateRobotsTxt = () => {
    let robotsContent = '';
    
    rules.forEach(rule => {
      robotsContent += `User-agent: ${rule.userAgent}\n`;
      if (rule.allow) robotsContent += `Allow: ${rule.allow}\n`;
      if (rule.disallow) robotsContent += `Disallow: ${rule.disallow}\n`;
      if (crawlDelay) robotsContent += `Crawl-delay: ${crawlDelay}\n`;
      robotsContent += '\n';
    });
    
    if (sitemapUrl) {
      robotsContent += `Sitemap: ${sitemapUrl}\n`;
    }
    
    return robotsContent.trim();
  };

  const downloadRobotsTxt = () => {
    const content = generateRobotsTxt();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateRobotsTxt());
  };

  const clearAll = () => {
    setSiteUrl('');
    setRules([{ userAgent: '*', allow: '/', disallow: '' }]);
    setSitemapUrl('');
    setCrawlDelay('');
  };

  const presetConfigs = [
    {
      name: 'Allow All',
      rules: [{ userAgent: '*', allow: '/', disallow: '' }],
      description: 'Allow all bots to crawl entire site'
    },
    {
      name: 'Block All',
      rules: [{ userAgent: '*', allow: '', disallow: '/' }],
      description: 'Block all bots from crawling'
    },
    {
      name: 'WordPress Standard',
      rules: [
        { userAgent: '*', allow: '', disallow: '/wp-admin/' },
        { userAgent: '*', allow: '', disallow: '/wp-includes/' }
      ],
      description: 'Standard WordPress configuration'
    },
    {
      name: 'E-commerce',
      rules: [
        { userAgent: '*', allow: '', disallow: '/admin/' },
        { userAgent: '*', allow: '', disallow: '/cart/' },
        { userAgent: '*', allow: '', disallow: '/checkout/' }
      ],
      description: 'Block admin and checkout pages'
    }
  ];

  return (
    <Layout title="Robots.txt Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Robots.txt Configuration</h3>
            
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
                <label className="block text-white/70 text-sm font-medium mb-2">Sitemap URL</label>
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://yoursite.com/sitemap.xml"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Crawl Delay (seconds)</label>
                <input
                  type="number"
                  value={crawlDelay}
                  onChange={(e) => setCrawlDelay(e.target.value)}
                  placeholder="Optional"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-white/80 font-medium">Rules</h4>
                  <button
                    onClick={addRule}
                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                  >
                    Add Rule
                  </button>
                </div>
                
                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <input
                          type="text"
                          value={rule.userAgent}
                          onChange={(e) => updateRule(index, 'userAgent', e.target.value)}
                          placeholder="User-agent"
                          className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                        />
                        <input
                          type="text"
                          value={rule.allow}
                          onChange={(e) => updateRule(index, 'allow', e.target.value)}
                          placeholder="Allow path"
                          className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50"
                        />
                        <input
                          type="text"
                          value={rule.disallow}
                          onChange={(e) => updateRule(index, 'disallow', e.target.value)}
                          placeholder="Disallow path"
                          className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/50"
                        />
                      </div>
                      {rules.length > 1 && (
                        <button
                          onClick={() => removeRule(index)}
                          className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Generated Robots.txt */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Generated Robots.txt</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
                <button
                  onClick={downloadRobotsTxt}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Download
                </button>
              </div>
            </div>
            
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {generateRobotsTxt() || 'Robots.txt content will appear here...'}
              </pre>
            </div>
          </div>
        </div>

        {/* Preset Configurations */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preset Configurations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presetConfigs.map((preset, index) => (
              <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{preset.name}</h4>
                  <button
                    onClick={() => setRules(preset.rules)}
                    className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                  >
                    Use
                  </button>
                </div>
                <div className="text-white/70 text-sm">{preset.description}</div>
              </div>
            ))}
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
      </div>

        <PageContent />
    </Layout>
  );
};

export default RobotsGenerator;