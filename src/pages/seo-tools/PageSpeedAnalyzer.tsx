import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const PageSpeedAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const analyzePageSpeed = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate page speed analysis
    setTimeout(() => {
      const mockResults = {
        url,
        performanceScore: Math.floor(Math.random() * 40) + 60, // 60-100
        accessibilityScore: Math.floor(Math.random() * 30) + 70, // 70-100
        bestPracticesScore: Math.floor(Math.random() * 25) + 75, // 75-100
        seoScore: Math.floor(Math.random() * 20) + 80, // 80-100
        metrics: {
          firstContentfulPaint: (Math.random() * 2 + 1).toFixed(1),
          largestContentfulPaint: (Math.random() * 3 + 2).toFixed(1),
          firstInputDelay: (Math.random() * 100 + 50).toFixed(0),
          cumulativeLayoutShift: (Math.random() * 0.2).toFixed(3),
          speedIndex: (Math.random() * 2 + 2).toFixed(1),
          totalBlockingTime: (Math.random() * 200 + 100).toFixed(0)
        },
        opportunities: [
          'Eliminate render-blocking resources',
          'Properly size images',
          'Defer offscreen images',
          'Minify CSS',
          'Minify JavaScript',
          'Enable text compression',
          'Use next-gen image formats',
          'Reduce unused JavaScript'
        ],
        diagnostics: [
          'Avoid enormous network payloads',
          'Serve images in next-gen formats',
          'Efficiently encode images',
          'Enable text compression',
          'Reduce unused CSS',
          'Avoid serving legacy JavaScript'
        ]
      };
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  const copyReport = () => {
    if (!results) return;
    
    const report = `Page Speed Analysis Report
==========================
URL: ${results.url}

Scores:
- Performance: ${results.performanceScore}/100
- Accessibility: ${results.accessibilityScore}/100
- Best Practices: ${results.bestPracticesScore}/100
- SEO: ${results.seoScore}/100

Core Web Vitals:
- First Contentful Paint: ${results.metrics.firstContentfulPaint}s
- Largest Contentful Paint: ${results.metrics.largestContentfulPaint}s
- First Input Delay: ${results.metrics.firstInputDelay}ms
- Cumulative Layout Shift: ${results.metrics.cumulativeLayoutShift}

Opportunities:
${results.opportunities.map((opp: string) => `- ${opp}`).join('\n')}`;

    navigator.clipboard.writeText(report);
  };

  const clearAll = () => {
    setUrl('');
    setResults(null);
  };

  return (
    <Layout title="Page Speed Analyzer" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Tool</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of page speed analysis. For real analysis, use Google PageSpeed Insights or similar tools.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Page Speed Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Website URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={analyzePageSpeed}
                disabled={isAnalyzing || !url.trim()}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Page Speed'}
              </button>

              {isAnalyzing && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-2">Analyzing...</div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Analysis Results</h3>
              {results && (
                <button
                  onClick={copyReport}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Report
                </button>
              )}
            </div>
            
            {results ? (
              <div className="space-y-4">
                {/* Scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(results.performanceScore)}`}>
                      {results.performanceScore}
                    </div>
                    <div className="text-white/70 text-sm">Performance</div>
                    <div className={`text-xs ${getScoreColor(results.performanceScore)}`}>
                      {getScoreLabel(results.performanceScore)}
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(results.accessibilityScore)}`}>
                      {results.accessibilityScore}
                    </div>
                    <div className="text-white/70 text-sm">Accessibility</div>
                    <div className={`text-xs ${getScoreColor(results.accessibilityScore)}`}>
                      {getScoreLabel(results.accessibilityScore)}
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(results.bestPracticesScore)}`}>
                      {results.bestPracticesScore}
                    </div>
                    <div className="text-white/70 text-sm">Best Practices</div>
                    <div className={`text-xs ${getScoreColor(results.bestPracticesScore)}`}>
                      {getScoreLabel(results.bestPracticesScore)}
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(results.seoScore)}`}>
                      {results.seoScore}
                    </div>
                    <div className="text-white/70 text-sm">SEO</div>
                    <div className={`text-xs ${getScoreColor(results.seoScore)}`}>
                      {getScoreLabel(results.seoScore)}
                    </div>
                  </div>
                </div>

                {/* Core Web Vitals */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Core Web Vitals</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">First Contentful Paint:</span>
                      <span className="text-white">{results.metrics.firstContentfulPaint}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Largest Contentful Paint:</span>
                      <span className="text-white">{results.metrics.largestContentfulPaint}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">First Input Delay:</span>
                      <span className="text-white">{results.metrics.firstInputDelay}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Cumulative Layout Shift:</span>
                      <span className="text-white">{results.metrics.cumulativeLayoutShift}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Enter a URL and click "Analyze Page Speed" to see performance metrics
              </div>
            )}
          </div>
        </div>

        {/* Opportunities */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Opportunities</h3>
              <div className="space-y-2">
                {results.opportunities.map((opportunity: string, index: number) => (
                  <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/90 text-sm">• {opportunity}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Diagnostics</h3>
              <div className="space-y-2">
                {results.diagnostics.map((diagnostic: string, index: number) => (
                  <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/90 text-sm">• {diagnostic}</div>
                  </div>
                ))}
              </div>
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
      </div>

        <PageContent />
    </Layout>
  );
};

export default PageSpeedAnalyzer;