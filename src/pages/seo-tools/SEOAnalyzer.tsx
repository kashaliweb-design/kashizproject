import React, { useState } from 'react';
import Layout from '../../components/Layout';

const SEOAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSEO = () => {
    if (!htmlContent.trim()) return;
    
    setIsAnalyzing(true);
    
    // Create temporary DOM element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Extract SEO elements
    const title = tempDiv.querySelector('title')?.textContent || '';
    const metaDescription = tempDiv.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const metaKeywords = tempDiv.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    const h1Tags = tempDiv.querySelectorAll('h1');
    const h2Tags = tempDiv.querySelectorAll('h2');
    const images = tempDiv.querySelectorAll('img');
    const links = tempDiv.querySelectorAll('a');
    const internalLinks = Array.from(links).filter(link => {
      const href = link.getAttribute('href');
      return href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:');
    });
    const externalLinks = Array.from(links).filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('http');
    });

    // Count words in content
    const textContent = tempDiv.textContent || '';
    const wordCount = textContent.trim().split(/\s+/).length;
    
    // Check for alt attributes
    const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
    
    // Analyze issues
    const issues = [];
    const suggestions = [];
    
    if (!title) issues.push('Missing title tag');
    else if (title.length < 30) suggestions.push('Title tag is too short (under 30 characters)');
    else if (title.length > 60) suggestions.push('Title tag is too long (over 60 characters)');
    
    if (!metaDescription) issues.push('Missing meta description');
    else if (metaDescription.length < 120) suggestions.push('Meta description is too short (under 120 characters)');
    else if (metaDescription.length > 160) suggestions.push('Meta description is too long (over 160 characters)');
    
    if (h1Tags.length === 0) issues.push('Missing H1 tag');
    else if (h1Tags.length > 1) issues.push('Multiple H1 tags found');
    
    if (h2Tags.length === 0) suggestions.push('Consider adding H2 tags for better structure');
    
    if (wordCount < 300) suggestions.push('Content is quite short (under 300 words)');
    
    if (imagesWithoutAlt.length > 0) issues.push(`${imagesWithoutAlt.length} images missing alt attributes`);
    
    if (internalLinks.length === 0) suggestions.push('No internal links found');
    
    // Calculate SEO score
    let score = 100;
    score -= issues.length * 15;
    score -= suggestions.length * 5;
    score = Math.max(0, score);

    setTimeout(() => {
      setAnalysis({
        title,
        metaDescription,
        metaKeywords,
        h1Count: h1Tags.length,
        h2Count: h2Tags.length,
        wordCount,
        imageCount: images.length,
        imagesWithoutAlt: imagesWithoutAlt.length,
        internalLinkCount: internalLinks.length,
        externalLinkCount: externalLinks.length,
        issues,
        suggestions,
        score
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const copyAnalysis = () => {
    if (!analysis) return;
    
    const report = `SEO Analysis Report
===================
URL: ${url}
SEO Score: ${analysis.score}/100

Title: ${analysis.title}
Meta Description: ${analysis.metaDescription}
Word Count: ${analysis.wordCount}
H1 Tags: ${analysis.h1Count}
H2 Tags: ${analysis.h2Count}
Images: ${analysis.imageCount}
Images without Alt: ${analysis.imagesWithoutAlt}
Internal Links: ${analysis.internalLinkCount}
External Links: ${analysis.externalLinkCount}

Issues:
${analysis.issues.map((issue: string) => `- ${issue}`).join('\n')}

Suggestions:
${analysis.suggestions.map((suggestion: string) => `- ${suggestion}`).join('\n')}`;

    navigator.clipboard.writeText(report);
  };

  const clearAll = () => {
    setUrl('');
    setHtmlContent('');
    setAnalysis(null);
  };

  const sampleHTML = `<!DOCTYPE html>
<html>
<head>
  <title>Best SEO Tools for Website Optimization</title>
  <meta name="description" content="Discover the best SEO tools to optimize your website for search engines. Improve rankings with our comprehensive guide.">
  <meta name="keywords" content="SEO tools, website optimization, search engine optimization">
</head>
<body>
  <h1>Best SEO Tools for Website Optimization</h1>
  <p>Search engine optimization is crucial for online success...</p>
  <h2>Top SEO Tools</h2>
  <p>Here are the most effective tools...</p>
  <img src="seo-tools.jpg" alt="SEO Tools Dashboard">
  <h2>How to Use SEO Tools</h2>
  <p>Follow these steps to optimize your website...</p>
  <a href="/seo-guide">Read our complete SEO guide</a>
</body>
</html>`;

  return (
    <Layout title="SEO Analyzer" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Page Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Page URL (optional)</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yoursite.com/page"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white/70 text-sm font-medium">HTML Content</label>
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
              </div>

              <button
                onClick={analyzeSEO}
                disabled={isAnalyzing}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze SEO'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">SEO Analysis</h3>
              {analysis && (
                <button
                  onClick={copyAnalysis}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Report
                </button>
              )}
            </div>
            
            {analysis ? (
              <div className="space-y-4">
                {/* SEO Score */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    analysis.score >= 80 ? 'text-green-400' :
                    analysis.score >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {analysis.score}/100
                  </div>
                  <div className="text-white/70">SEO Score</div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{analysis.wordCount}</div>
                    <div className="text-white/70 text-xs">Words</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`font-bold ${analysis.h1Count === 1 ? 'text-green-400' : 'text-red-400'}`}>
                      {analysis.h1Count}
                    </div>
                    <div className="text-white/70 text-xs">H1 Tags</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{analysis.imageCount}</div>
                    <div className="text-white/70 text-xs">Images</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{analysis.internalLinkCount}</div>
                    <div className="text-white/70 text-xs">Internal Links</div>
                  </div>
                </div>

                {/* Issues */}
                {analysis.issues.length > 0 && (
                  <div className="backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-2">Issues ({analysis.issues.length})</h4>
                    <ul className="space-y-1">
                      {analysis.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-red-300 text-sm">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-medium mb-2">Suggestions ({analysis.suggestions.length})</h4>
                    <ul className="space-y-1">
                      {analysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-yellow-300 text-sm">• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Page Details */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Page Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-white/70">Title: </span>
                      <span className="text-white">{analysis.title || 'Not found'}</span>
                      <span className={`ml-2 text-xs ${
                        analysis.title.length >= 30 && analysis.title.length <= 60 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        ({analysis.title.length} chars)
                      </span>
                    </div>
                    <div>
                      <span className="text-white/70">Meta Description: </span>
                      <span className="text-white">{analysis.metaDescription || 'Not found'}</span>
                      <span className={`ml-2 text-xs ${
                        analysis.metaDescription.length >= 120 && analysis.metaDescription.length <= 160 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        ({analysis.metaDescription.length} chars)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Paste HTML content and click "Analyze SEO" to see results
              </div>
            )}
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

        {/* SEO Checklist */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">On-Page SEO</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.title ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-white/70">Title tag present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.metaDescription ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-white/70">Meta description present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.h1Count === 1 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-white/70">Single H1 tag</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.imagesWithoutAlt === 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-white/70">All images have alt text</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Content Quality</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.wordCount >= 300 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-white/70">Adequate content length</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.h2Count > 0 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-white/70">Proper heading structure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.internalLinkCount > 0 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-white/70">Internal linking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${analysis?.metaKeywords ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-white/70">Meta keywords present</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SEOAnalyzer;