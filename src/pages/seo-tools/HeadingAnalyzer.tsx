import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const HeadingAnalyzer: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [headings, setHeadings] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeHeadings = () => {
    if (!htmlContent.trim()) {
      setHeadings([]);
      setAnalysis(null);
      return;
    }

    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Extract all heading elements
    const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingData: any[] = [];
    const headingCounts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };

    headingElements.forEach((heading, index) => {
      const tagName = heading.tagName.toLowerCase() as keyof typeof headingCounts;
      headingCounts[tagName]++;
      
      headingData.push({
        level: parseInt(tagName.charAt(1)),
        tag: tagName,
        text: heading.textContent?.trim() || '',
        length: heading.textContent?.trim().length || 0,
        position: index + 1
      });
    });

    setHeadings(headingData);

    // Analyze structure
    const issues = [];
    if (headingCounts.h1 === 0) issues.push('No H1 tag found');
    if (headingCounts.h1 > 1) issues.push('Multiple H1 tags found');
    
    // Check for proper hierarchy
    let previousLevel = 0;
    headingData.forEach(heading => {
      if (heading.level > previousLevel + 1 && previousLevel !== 0) {
        issues.push(`Heading hierarchy skip: H${previousLevel} to H${heading.level}`);
      }
      previousLevel = heading.level;
    });

    // Check heading lengths
    headingData.forEach(heading => {
      if (heading.length > 70) {
        issues.push(`${heading.tag.toUpperCase()} too long (${heading.length} chars): "${heading.text.substring(0, 30)}..."`);
      }
      if (heading.length < 10 && heading.level <= 2) {
        issues.push(`${heading.tag.toUpperCase()} too short (${heading.length} chars): "${heading.text}"`);
      }
    });

    setAnalysis({
      totalHeadings: headingData.length,
      headingCounts,
      issues,
      hasH1: headingCounts.h1 > 0,
      multipleH1: headingCounts.h1 > 1,
      averageLength: headingData.length > 0 ? Math.round(headingData.reduce((sum, h) => sum + h.length, 0) / headingData.length) : 0
    });
  };

  const copyToClipboard = () => {
    const headingList = headings.map(h => `${h.tag.toUpperCase()}: ${h.text}`).join('\n');
    navigator.clipboard.writeText(headingList);
  };

  const clearAll = () => {
    setHtmlContent('');
    setHeadings([]);
    setAnalysis(null);
  };

  const sampleHTML = `<h1>Main Page Title</h1>
<h2>Introduction Section</h2>
<p>Some content here...</p>
<h2>Features Overview</h2>
<h3>Feature One</h3>
<p>Description of feature one...</p>
<h3>Feature Two</h3>
<p>Description of feature two...</p>
<h2>Conclusion</h2>
<p>Final thoughts...</p>`;

  return (
    <Layout title="Heading Structure Analyzer" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HTML Input */}
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
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono text-sm"
            />
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={analyzeHeadings}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Analyze
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Analysis Results</h3>
              {headings.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy List
                </button>
              )}
            </div>
            
            {analysis ? (
              <div className="space-y-4">
                {/* Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{analysis.totalHeadings}</div>
                    <div className="text-white/70 text-xs">Total Headings</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`font-bold ${analysis.hasH1 ? 'text-green-400' : 'text-red-400'}`}>
                      {analysis.headingCounts.h1}
                    </div>
                    <div className="text-white/70 text-xs">H1 Tags</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{analysis.averageLength}</div>
                    <div className="text-white/70 text-xs">Avg Length</div>
                  </div>
                </div>

                {/* Heading Distribution */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Heading Distribution</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.entries(analysis.headingCounts).map(([tag, count]) => (
                      <div key={tag} className="text-center">
                        <div className="text-white font-bold">{count as number}</div>
                        <div className="text-white/70 text-xs">{tag.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issues */}
                {analysis.issues.length > 0 && (
                  <div className="backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-3">SEO Issues Found</h4>
                    <ul className="space-y-1">
                      {analysis.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-red-300 text-sm">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Heading List */}
                <div className="h-32 overflow-y-auto">
                  {headings.map((heading, index) => (
                    <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 mb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              heading.tag === 'h1' ? 'bg-red-500/20 text-red-400' :
                              heading.tag === 'h2' ? 'bg-blue-500/20 text-blue-400' :
                              heading.tag === 'h3' ? 'bg-green-500/20 text-green-400' :
                              heading.tag === 'h4' ? 'bg-yellow-500/20 text-yellow-400' :
                              heading.tag === 'h5' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-pink-500/20 text-pink-400'
                            }`}>
                              {heading.tag.toUpperCase()}
                            </span>
                            <span className="text-white/60 text-xs">{heading.length} chars</span>
                          </div>
                          <div className="text-white text-sm">{heading.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Paste HTML content and click "Analyze" to see heading structure
              </div>
            )}
          </div>
        </div>

        {/* SEO Guidelines */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Heading SEO Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Structure Guidelines</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">H1 Tag</div>
                  <div className="text-white/60">Use exactly one H1 per page for main title</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Hierarchy</div>
                  <div className="text-white/60">Follow logical order: H1 → H2 → H3 → H4</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Length</div>
                  <div className="text-white/60">Keep headings under 70 characters</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Content Guidelines</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Keywords</div>
                  <div className="text-white/60">Include target keywords naturally</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Descriptive</div>
                  <div className="text-white/60">Make headings descriptive and meaningful</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">User-Friendly</div>
                  <div className="text-white/60">Write for users first, search engines second</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default HeadingAnalyzer;