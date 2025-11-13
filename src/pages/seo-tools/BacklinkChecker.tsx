import React, { useState } from 'react';
import Layout from '../../components/Layout';

const BacklinkChecker: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const checkBacklinks = async () => {
    if (!domain.trim()) return;
    
    setIsChecking(true);
    
    // Simulate backlink analysis
    setTimeout(() => {
      const mockBacklinks = [
        {
          url: 'https://example-blog.com/article-1',
          domain: 'example-blog.com',
          anchorText: 'best tools website',
          domainAuthority: 45,
          pageAuthority: 38,
          linkType: 'dofollow',
          firstSeen: '2024-01-15'
        },
        {
          url: 'https://tech-news.com/reviews',
          domain: 'tech-news.com',
          anchorText: 'useful online tools',
          domainAuthority: 62,
          pageAuthority: 55,
          linkType: 'dofollow',
          firstSeen: '2024-02-03'
        },
        {
          url: 'https://developer-forum.com/thread/123',
          domain: 'developer-forum.com',
          anchorText: domain,
          domainAuthority: 38,
          pageAuthority: 42,
          linkType: 'nofollow',
          firstSeen: '2024-02-20'
        },
        {
          url: 'https://social-media.com/post/456',
          domain: 'social-media.com',
          anchorText: 'check this out',
          domainAuthority: 78,
          pageAuthority: 35,
          linkType: 'nofollow',
          firstSeen: '2024-03-01'
        },
        {
          url: 'https://resource-site.com/links',
          domain: 'resource-site.com',
          anchorText: 'online calculator tools',
          domainAuthority: 52,
          pageAuthority: 48,
          linkType: 'dofollow',
          firstSeen: '2024-03-10'
        }
      ];

      const totalBacklinks = mockBacklinks.length;
      const dofollowLinks = mockBacklinks.filter(link => link.linkType === 'dofollow').length;
      const nofollowLinks = mockBacklinks.filter(link => link.linkType === 'nofollow').length;
      const avgDomainAuthority = Math.round(mockBacklinks.reduce((sum, link) => sum + link.domainAuthority, 0) / totalBacklinks);
      const uniqueDomains = new Set(mockBacklinks.map(link => link.domain)).size;

      setResults({
        domain,
        totalBacklinks,
        dofollowLinks,
        nofollowLinks,
        uniqueDomains,
        avgDomainAuthority,
        backlinks: mockBacklinks
      });
      setIsChecking(false);
    }, 2500);
  };

  const copyReport = () => {
    if (!results) return;
    
    const report = `Backlink Analysis Report
========================
Domain: ${results.domain}
Total Backlinks: ${results.totalBacklinks}
Dofollow Links: ${results.dofollowLinks}
Nofollow Links: ${results.nofollowLinks}
Unique Domains: ${results.uniqueDomains}
Average Domain Authority: ${results.avgDomainAuthority}

Backlink Details:
${results.backlinks.map((link: any) => 
  `- ${link.url} (DA: ${link.domainAuthority}, ${link.linkType})`
).join('\n')}`;

    navigator.clipboard.writeText(report);
  };

  const clearAll = () => {
    setDomain('');
    setResults(null);
  };

  return (
    <Layout title="Backlink Checker" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Tool</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of backlink analysis. Real backlink data requires specialized SEO APIs.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Domain Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Domain to Check</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={checkBacklinks}
                disabled={isChecking || !domain.trim()}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isChecking ? 'Checking Backlinks...' : 'Check Backlinks'}
              </button>

              {isChecking && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-2">Analyzing backlinks...</div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Backlink Summary</h3>
              {results && (
                <button
                  onClick={copyReport}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Report
                </button>
              )}
            </div>
            
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{results.totalBacklinks}</div>
                    <div className="text-white/70 text-sm">Total Backlinks</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{results.uniqueDomains}</div>
                    <div className="text-white/70 text-sm">Unique Domains</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{results.dofollowLinks}</div>
                    <div className="text-white/70 text-sm">Dofollow</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{results.nofollowLinks}</div>
                    <div className="text-white/70 text-sm">Nofollow</div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{results.avgDomainAuthority}</div>
                  <div className="text-white/70">Average Domain Authority</div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Enter a domain and click "Check Backlinks" to see analysis
              </div>
            )}
          </div>
        </div>

        {/* Backlink Details */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Backlink Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass">
                    <th className="text-left text-white/70 p-2">Source URL</th>
                    <th className="text-left text-white/70 p-2">Anchor Text</th>
                    <th className="text-center text-white/70 p-2">DA</th>
                    <th className="text-center text-white/70 p-2">PA</th>
                    <th className="text-center text-white/70 p-2">Type</th>
                    <th className="text-center text-white/70 p-2">First Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {results.backlinks.map((link: any, index: number) => (
                    <tr key={index} className="border-b border-glass/30">
                      <td className="text-blue-400 p-2 max-w-xs truncate">{link.url}</td>
                      <td className="text-white p-2">{link.anchorText}</td>
                      <td className="text-center text-white p-2">{link.domainAuthority}</td>
                      <td className="text-center text-white p-2">{link.pageAuthority}</td>
                      <td className={`text-center p-2 ${link.linkType === 'dofollow' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {link.linkType}
                      </td>
                      <td className="text-center text-white/70 p-2">{link.firstSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {/* Backlink Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Understanding Backlinks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Link Types</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-green-400 font-medium">Dofollow Links</div>
                  <div className="text-white/60">Pass link authority and help with rankings</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-yellow-400 font-medium">Nofollow Links</div>
                  <div className="text-white/60">Don't pass authority but still valuable for traffic</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Authority Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Domain Authority (DA)</div>
                  <div className="text-white/60">Overall domain strength (1-100)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Page Authority (PA)</div>
                  <div className="text-white/60">Individual page strength (1-100)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BacklinkChecker;