import React, { useState } from 'react';
import Layout from '../../components/Layout';

const LinkAnalyzer: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeLinks = () => {
    if (!htmlContent.trim()) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const links = tempDiv.querySelectorAll('a');
    const linkData: any[] = [];
    
    links.forEach((link, index) => {
      const href = link.getAttribute('href') || '';
      const text = link.textContent?.trim() || '';
      const title = link.getAttribute('title') || '';
      const rel = link.getAttribute('rel') || '';
      const target = link.getAttribute('target') || '';
      
      let linkType = 'internal';
      if (href.startsWith('http')) {
        linkType = 'external';
      } else if (href.startsWith('mailto:')) {
        linkType = 'email';
      } else if (href.startsWith('tel:')) {
        linkType = 'phone';
      } else if (href.startsWith('#')) {
        linkType = 'anchor';
      }
      
      linkData.push({
        index: index + 1,
        href,
        text,
        title,
        rel,
        target,
        linkType,
        hasNofollow: rel.includes('nofollow'),
        hasNoopener: rel.includes('noopener'),
        hasNoreferrer: rel.includes('noreferrer'),
        isEmpty: !text.trim(),
        isLong: text.length > 100
      });
    });

    // Analyze link issues
    const issues = [];
    const emptyLinks = linkData.filter(link => link.isEmpty);
    const longLinks = linkData.filter(link => link.isLong);
    const externalWithoutNofollow = linkData.filter(link => 
      link.linkType === 'external' && !link.hasNofollow
    );
    const externalWithoutNoopener = linkData.filter(link => 
      link.linkType === 'external' && link.target === '_blank' && !link.hasNoopener
    );

    if (emptyLinks.length > 0) issues.push(`${emptyLinks.length} links with empty anchor text`);
    if (longLinks.length > 0) issues.push(`${longLinks.length} links with very long anchor text`);
    if (externalWithoutNoopener.length > 0) issues.push(`${externalWithoutNoopener.length} external links missing rel="noopener"`);

    // Count by type
    const linkCounts = {
      total: linkData.length,
      internal: linkData.filter(l => l.linkType === 'internal').length,
      external: linkData.filter(l => l.linkType === 'external').length,
      email: linkData.filter(l => l.linkType === 'email').length,
      phone: linkData.filter(l => l.linkType === 'phone').length,
      anchor: linkData.filter(l => l.linkType === 'anchor').length,
      nofollow: linkData.filter(l => l.hasNofollow).length
    };

    setAnalysis({
      links: linkData,
      counts: linkCounts,
      issues,
      emptyLinks,
      longLinks,
      externalWithoutNofollow,
      externalWithoutNoopener
    });
  };

  const copyToClipboard = () => {
    if (!analysis) return;
    
    const report = `Link Analysis Report
====================
Total Links: ${analysis.counts.total}
Internal Links: ${analysis.counts.internal}
External Links: ${analysis.counts.external}
Email Links: ${analysis.counts.email}
Phone Links: ${analysis.counts.phone}
Anchor Links: ${analysis.counts.anchor}
Nofollow Links: ${analysis.counts.nofollow}

Issues Found: ${analysis.issues.length}
${analysis.issues.map((issue: string) => `- ${issue}`).join('\n')}

All Links:
${analysis.links.map((link: any) => 
  `${link.index}. ${link.href} - "${link.text}" (${link.linkType})`
).join('\n')}`;

    navigator.clipboard.writeText(report);
  };

  const clearAll = () => {
    setHtmlContent('');
    setAnalysis(null);
  };

  const sampleHTML = `<div>
  <a href="/">Home</a>
  <a href="/about">About Us</a>
  <a href="https://google.com" target="_blank">Google</a>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link</a>
  <a href="mailto:contact@example.com">Contact Email</a>
  <a href="tel:+1234567890">Call Us</a>
  <a href="#section1">Jump to Section</a>
  <a href="/blog">Our Blog</a>
</div>`;

  return (
    <Layout title="Link Analyzer" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">HTML Content</h3>
              <button
                onClick={() => setHtmlContent(sampleHTML)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Load Sample
              </button>
            </div>
            
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Paste your HTML content here..."
              className="w-full h-48 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono text-sm"
            />
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={analyzeLinks}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Analyze Links
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Link Summary</h3>
              {analysis && (
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Report
                </button>
              )}
            </div>
            
            {analysis ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{analysis.counts.total}</div>
                    <div className="text-white/70 text-sm">Total Links</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{analysis.counts.internal}</div>
                    <div className="text-white/70 text-sm">Internal</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{analysis.counts.external}</div>
                    <div className="text-white/70 text-sm">External</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{analysis.counts.nofollow}</div>
                    <div className="text-white/70 text-sm">Nofollow</div>
                  </div>
                </div>

                {/* Issues */}
                {analysis.issues.length > 0 && (
                  <div className="backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-2">Issues Found</h4>
                    <ul className="space-y-1">
                      {analysis.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-red-300 text-sm">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Link Type Distribution */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Link Distribution</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-bold">{analysis.counts.email}</div>
                      <div className="text-white/70">Email</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{analysis.counts.phone}</div>
                      <div className="text-white/70">Phone</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{analysis.counts.anchor}</div>
                      <div className="text-white/70">Anchor</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Paste HTML content and click "Analyze Links" to see link analysis
              </div>
            )}
          </div>
        </div>

        {/* Link Details */}
        {analysis && analysis.links.length > 0 && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">All Links</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass">
                    <th className="text-left text-white/70 p-2">#</th>
                    <th className="text-left text-white/70 p-2">URL</th>
                    <th className="text-left text-white/70 p-2">Anchor Text</th>
                    <th className="text-center text-white/70 p-2">Type</th>
                    <th className="text-center text-white/70 p-2">Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.links.map((link: any, index: number) => (
                    <tr key={index} className="border-b border-glass/30">
                      <td className="text-white p-2">{link.index}</td>
                      <td className="text-blue-400 p-2 max-w-xs truncate">{link.href}</td>
                      <td className="text-white p-2 max-w-xs truncate">{link.text || '(empty)'}</td>
                      <td className="text-center p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          link.linkType === 'internal' ? 'bg-blue-500/20 text-blue-400' :
                          link.linkType === 'external' ? 'bg-green-500/20 text-green-400' :
                          link.linkType === 'email' ? 'bg-purple-500/20 text-purple-400' :
                          link.linkType === 'phone' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {link.linkType}
                        </span>
                      </td>
                      <td className="text-center text-white/70 p-2">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {link.hasNofollow && <span className="px-1 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">nofollow</span>}
                          {link.target === '_blank' && <span className="px-1 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">_blank</span>}
                          {link.hasNoopener && <span className="px-1 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">noopener</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Link Best Practices */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Link SEO Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Internal Links</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Descriptive Anchor Text</div>
                  <div className="text-white/60">Use relevant keywords in anchor text</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Link to Important Pages</div>
                  <div className="text-white/60">Help distribute page authority</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Natural Placement</div>
                  <div className="text-white/60">Place links contextually in content</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">External Links</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Use rel="nofollow"</div>
                  <div className="text-white/60">For untrusted or paid links</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Add rel="noopener"</div>
                  <div className="text-white/60">For security with target="_blank"</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Link to Quality Sites</div>
                  <div className="text-white/60">Choose reputable external sources</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LinkAnalyzer;