import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const RemoveDuplicates: React.FC = () => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    caseSensitive: true,
    keepFirst: true,
    trimWhitespace: true
  });

  const removeDuplicateLines = (inputText: string) => {
    if (!inputText.trim()) return '';

    let lines = inputText.split('\n');
    
    if (options.trimWhitespace) {
      lines = lines.map(line => line.trim());
    }

    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const compareKey = options.caseSensitive ? line : line.toLowerCase();
      
      if (!seen.has(compareKey)) {
        seen.add(compareKey);
        result.push(line);
      } else if (!options.keepFirst) {
        // If not keeping first occurrence, remove previous and add current
        const index = result.findIndex(l => 
          options.caseSensitive ? l === line : l.toLowerCase() === line.toLowerCase()
        );
        if (index !== -1) {
          result.splice(index, 1);
        }
        result.push(line);
      }
    }

    return result.join('\n');
  };

  const getStats = () => {
    const originalLines = text.split('\n').filter(line => line.trim() !== '');
    const processedLines = removeDuplicateLines(text).split('\n').filter(line => line.trim() !== '');
    const duplicatesRemoved = originalLines.length - processedLines.length;

    return {
      original: originalLines.length,
      processed: processedLines.length,
      removed: duplicatesRemoved
    };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(removeDuplicateLines(text));
  };

  const clearText = () => {
    setText('');
  };

  const stats = getStats();
  const processedText = removeDuplicateLines(text);

  return (
    <Layout title="Remove Duplicate Lines" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Original Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text with duplicate lines..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            {/* Options */}
            <div className="mt-4 space-y-3">
              <h4 className="text-white/70 font-medium">Options</h4>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.caseSensitive}
                  onChange={(e) => setOptions({...options, caseSensitive: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Case sensitive</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.keepFirst}
                  onChange={(e) => setOptions({...options, keepFirst: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Keep first occurrence</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.trimWhitespace}
                  onChange={(e) => setOptions({...options, trimWhitespace: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Trim whitespace</span>
              </label>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Processed Text</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm">
                {processedText || 'Processed text will appear here...'}
              </pre>
            </div>

            {/* Statistics */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats.original}</div>
                <div className="text-white/70 text-xs">Original Lines</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats.processed}</div>
                <div className="text-white/70 text-xs">Unique Lines</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-400">{stats.removed}</div>
                <div className="text-white/70 text-xs">Duplicates Removed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearText}
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

export default RemoveDuplicates;