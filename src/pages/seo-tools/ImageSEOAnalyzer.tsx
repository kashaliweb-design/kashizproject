import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ImageSEOAnalyzer: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeImages = () => {
    if (!htmlContent.trim()) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const images = tempDiv.querySelectorAll('img');
    const imageData: any[] = [];
    
    images.forEach((img, index) => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      const title = img.getAttribute('title') || '';
      const width = img.getAttribute('width') || '';
      const height = img.getAttribute('height') || '';
      const loading = img.getAttribute('loading') || '';
      
      // Analyze file extension
      const extension = src.split('.').pop()?.toLowerCase() || '';
      const isWebP = extension === 'webp';
      const isNextGen = ['webp', 'avif'].includes(extension);
      const isOptimized = ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(extension);
      
      imageData.push({
        index: index + 1,
        src,
        alt,
        title,
        width,
        height,
        loading,
        extension,
        isWebP,
        isNextGen,
        isOptimized,
        hasAlt: !!alt.trim(),
        hasTitle: !!title.trim(),
        hasDimensions: !!(width && height),
        hasLazyLoading: loading === 'lazy',
        altLength: alt.length,
        isAltTooShort: alt.length > 0 && alt.length < 10,
        isAltTooLong: alt.length > 125
      });
    });

    // Analyze issues
    const issues = [];
    const missingAlt = imageData.filter(img => !img.hasAlt);
    const missingDimensions = imageData.filter(img => !img.hasDimensions);
    const notOptimized = imageData.filter(img => !img.isOptimized);
    const noLazyLoading = imageData.filter(img => !img.hasLazyLoading);
    const shortAlt = imageData.filter(img => img.isAltTooShort);
    const longAlt = imageData.filter(img => img.isAltTooLong);

    if (missingAlt.length > 0) issues.push(`${missingAlt.length} images missing alt text`);
    if (missingDimensions.length > 0) issues.push(`${missingDimensions.length} images missing width/height`);
    if (notOptimized.length > 0) issues.push(`${notOptimized.length} images in unoptimized formats`);
    if (noLazyLoading.length > 0) issues.push(`${noLazyLoading.length} images without lazy loading`);
    if (shortAlt.length > 0) issues.push(`${shortAlt.length} images with very short alt text`);
    if (longAlt.length > 0) issues.push(`${longAlt.length} images with very long alt text`);

    // Calculate SEO score
    let score = 100;
    score -= missingAlt.length * 15;
    score -= missingDimensions.length * 5;
    score -= notOptimized.length * 10;
    score -= noLazyLoading.length * 5;
    score = Math.max(0, score);

    setAnalysis({
      images: imageData,
      totalImages: imageData.length,
      withAlt: imageData.filter(img => img.hasAlt).length,
      withDimensions: imageData.filter(img => img.hasDimensions).length,
      withLazyLoading: imageData.filter(img => img.hasLazyLoading).length,
      nextGenFormat: imageData.filter(img => img.isNextGen).length,
      issues,
      score
    });
  };

  const copyReport = () => {
    if (!analysis) return;
    
    const report = `Image SEO Analysis Report
=========================
Total Images: ${analysis.totalImages}
Images with Alt Text: ${analysis.withAlt}
Images with Dimensions: ${analysis.withDimensions}
Images with Lazy Loading: ${analysis.withLazyLoading}
Next-Gen Format Images: ${analysis.nextGenFormat}
SEO Score: ${analysis.score}/100

Issues Found: ${analysis.issues.length}
${analysis.issues.map((issue: string) => `- ${issue}`).join('\n')}

Image Details:
${analysis.images.map((img: any) => 
  `${img.index}. ${img.src} - Alt: "${img.alt}" (${img.extension})`
).join('\n')}`;

    navigator.clipboard.writeText(report);
  };

  const clearAll = () => {
    setHtmlContent('');
    setAnalysis(null);
  };

  const sampleHTML = `<div>
  <img src="hero-image.jpg" alt="Professional web development services" width="800" height="400" loading="lazy">
  <img src="about-us.png" alt="Our team" width="600" height="300">
  <img src="service-1.webp" alt="Custom website design and development solutions" width="400" height="300" loading="lazy">
  <img src="testimonial.jpg" alt="" width="150" height="150">
  <img src="logo.svg" alt="Company Logo">
  <img src="background.jpg" width="1200" height="600" loading="lazy">
</div>`;

  return (
    <Layout title="Image SEO Analyzer" showBackButton>
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
              placeholder="Paste your HTML content with images here..."
              className="w-full h-48 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono text-sm"
            />
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={analyzeImages}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Analyze Images
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
              <h3 className="text-xl font-semibold text-white">Image Analysis</h3>
              {analysis && (
                <button
                  onClick={copyReport}
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
                  <div className="text-white/70">Image SEO Score</div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">{analysis.totalImages}</div>
                    <div className="text-white/70 text-sm">Total Images</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className={`text-xl font-bold ${analysis.withAlt === analysis.totalImages ? 'text-green-400' : 'text-red-400'}`}>
                      {analysis.withAlt}
                    </div>
                    <div className="text-white/70 text-sm">With Alt Text</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">{analysis.withDimensions}</div>
                    <div className="text-white/70 text-sm">With Dimensions</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-purple-400">{analysis.nextGenFormat}</div>
                    <div className="text-white/70 text-sm">Next-Gen Format</div>
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
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Paste HTML content and click "Analyze Images" to see image SEO analysis
              </div>
            )}
          </div>
        </div>

        {/* Image Details */}
        {analysis && analysis.images.length > 0 && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Image Details</h3>
            <div className="space-y-3">
              {analysis.images.map((img: any, index: number) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="text-white font-medium break-all">{img.src}</div>
                      <div className="text-white/60 text-sm">Alt: "{img.alt || 'Missing'}"</div>
                      {img.width && img.height && (
                        <div className="text-white/60 text-sm">Dimensions: {img.width}x{img.height}</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        img.isNextGen ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {img.extension.toUpperCase()}
                      </span>
                      {img.hasAlt ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Alt ✓</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">No Alt</span>
                      )}
                      {img.hasLazyLoading && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Lazy</span>
                      )}
                    </div>
                  </div>
                  
                  {(img.isAltTooShort || img.isAltTooLong || !img.hasAlt) && (
                    <div className="mt-2 text-red-300 text-sm">
                      {!img.hasAlt && '• Missing alt text'}
                      {img.isAltTooShort && '• Alt text too short (under 10 characters)'}
                      {img.isAltTooLong && '• Alt text too long (over 125 characters)'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image SEO Guidelines */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Image SEO Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Alt Text Guidelines</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Descriptive</div>
                  <div className="text-white/60">Describe what's in the image</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Concise</div>
                  <div className="text-white/60">Keep under 125 characters</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Keywords</div>
                  <div className="text-white/60">Include relevant keywords naturally</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Technical Optimization</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">File Format</div>
                  <div className="text-white/60">Use WebP or AVIF for better compression</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Dimensions</div>
                  <div className="text-white/60">Always specify width and height</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Lazy Loading</div>
                  <div className="text-white/60">Use loading="lazy" for better performance</div>
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

export default ImageSEOAnalyzer;