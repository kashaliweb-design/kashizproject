import React, { useState } from 'react';
import Layout from '../../components/Layout';

const KeywordDensityChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [minLength, setMinLength] = useState(3);

  const analyzeKeywords = () => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    // Clean and split text into words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= minLength);

    // Count word frequency
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Calculate density and sort by frequency
    const totalWords = words.length;
    const keywordData = Object.entries(wordCount)
      .map(([word, count]) => ({
        keyword: word,
        count,
        density: ((count / totalWords) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 keywords

    setResults(keywordData);
  };

  const copyKeywords = () => {
    const keywordList = results.map(item => item.keyword).join(', ');
    navigator.clipboard.writeText(keywordList);
  };

  const clearAll = () => {
    setText('');
    setResults([]);
  };

  return (
    <Layout title="Keyword Density Checker" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Content Analysis</h3>
            
            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your content here to analyze keyword density..."
                className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Minimum Word Length: {minLength}
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={minLength}
                  onChange={(e) => setMinLength(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={analyzeKeywords}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
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
          </div>

          {/* Results */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Keyword Analysis</h3>
              {results.length > 0 && (
                <button
                  onClick={copyKeywords}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Keywords
                </button>
              )}
            </div>
            
            <div className="h-64 overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((item, index) => (
                    <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{item.keyword}</span>
                        <div className="text-right">
                          <div className="text-white font-bold">{item.density}%</div>
                          <div className="text-white/60 text-xs">{item.count} times</div>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-black/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full"
                          style={{ width: `${Math.min(parseFloat(item.density) * 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/50 py-8">
                  Enter content and click "Analyze" to see keyword density
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Guidelines */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Keyword Density Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-green-400 font-medium mb-2">Optimal (1-3%)</div>
              <div className="text-white/70 text-sm">
                Good keyword density that appears natural and helps with SEO without over-optimization.
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-yellow-400 font-medium mb-2">Acceptable (3-5%)</div>
              <div className="text-white/70 text-sm">
                Higher density that's still acceptable but should be monitored to avoid keyword stuffing.
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-red-400 font-medium mb-2">Too High (5%+)</div>
              <div className="text-white/70 text-sm">
                May be considered keyword stuffing by search engines and could hurt your rankings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KeywordDensityChecker;