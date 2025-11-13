import React, { useState } from 'react';
import Layout from '../../components/Layout';

const GoogleIndexChecker: React.FC = () => {
  const [urls, setUrls] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const checkIndexStatus = async () => {
    if (!urls.trim()) return;
    
    setIsChecking(true);
    
    const urlList = urls.split('\n').filter(url => url.trim() !== '');
    
    // Simulate index checking
    setTimeout(() => {
      const mockResults = urlList.map(url => ({
        url: url.trim(),
        indexed: Math.random() > 0.3, // 70% chance of being indexed
        lastCrawled: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: Math.random() > 0.3 ? 'Indexed' : 'Not Indexed',
        issues: Math.random() > 0.7 ? ['Crawl error', 'Blocked by robots.txt'] : []
      }));
      
      setResults(mockResults);
      setIsChecking(false);
    }, 2000);
  };

  const copyReport = () => {
    const report = `Google Index Status Report
==========================
Total URLs Checked: ${results.length}
Indexed: ${results.filter(r => r.indexed).length}
Not Indexed: ${results.filter(r => !r.indexed).length}

URL Details:
${results.map(result => 
  `${result.url} - ${result.status} (Last crawled: ${result.lastCrawled})`
).join('\n')}`;

    navigator.clipboard.writeText(report);
  };

  const clearAll = () => {
    setUrls('');
    setResults([]);
  };

  const sampleUrls = `https://yoursite.com/
https://yoursite.com/about
https://yoursite.com/services
https://yoursite.com/blog/post-1
https://yoursite.com/contact`;

  return (
    <Layout title="Google Index Checker" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Tool</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of index checking. Real index status requires Google Search Console API.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">URLs to Check</h3>
            
            <div className="space-y-4">
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
                  placeholder="Enter URLs to check, one per line..."
                  className="w-full h-32 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={checkIndexStatus}
                disabled={isChecking || !urls.trim()}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isChecking ? 'Checking Index Status...' : 'Check Index Status'}
              </button>

              {isChecking && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-2">Checking Google index...</div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Index Summary</h3>
              {results.length > 0 && (
                <button
                  onClick={copyReport}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Report
                </button>
              )}
            </div>
            
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{results.length}</div>
                    <div className="text-white/70 text-sm">URLs Checked</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {results.filter(r => r.indexed).length}
                    </div>
                    <div className="text-white/70 text-sm">Indexed</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {results.filter(r => !r.indexed).length}
                    </div>
                    <div className="text-white/70 text-sm">Not Indexed</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round((results.filter(r => r.indexed).length / results.length) * 100)}%
                    </div>
                    <div className="text-white/70 text-sm">Index Rate</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Enter URLs and click "Check Index Status" to see results
              </div>
            )}
          </div>
        </div>

        {/* Detailed Results */}
        {results.length > 0 && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Detailed Results</h3>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="text-white font-medium break-all">{result.url}</div>
                      <div className="text-white/60 text-sm">Last crawled: {result.lastCrawled}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      result.indexed 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.status}
                    </div>
                  </div>
                  {result.issues.length > 0 && (
                    <div className="mt-2">
                      <div className="text-red-400 text-sm font-medium mb-1">Issues:</div>
                      <ul className="text-red-300 text-sm">
                        {result.issues.map((issue: string, i: number) => (
                          <li key={i}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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

        {/* Index Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Google Index Information</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Google indexes billions of web pages to provide relevant search results</p>
            <p>• Pages must be crawlable and not blocked by robots.txt to be indexed</p>
            <p>• Use Google Search Console to monitor your site's index status</p>
            <p>• Submit sitemaps to help Google discover and index your pages</p>
            <p>• Fix crawl errors and improve page quality to increase indexing success</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoogleIndexChecker;