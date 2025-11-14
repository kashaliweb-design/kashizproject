import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const AlphabeticalOrder: React.FC = () => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    caseSensitive: false,
    reverse: false,
    removeEmpty: true,
    sortBy: 'lines' // 'lines' or 'words'
  });

  const sortText = () => {
    if (!text.trim()) return '';

    let items = options.sortBy === 'lines' ? text.split('\n') : text.split(/\s+/);
    
    if (options.removeEmpty) {
      items = items.filter(item => item.trim() !== '');
    }

    items.sort((a, b) => {
      const aCompare = options.caseSensitive ? a : a.toLowerCase();
      const bCompare = options.caseSensitive ? b : b.toLowerCase();
      
      if (options.reverse) {
        return bCompare.localeCompare(aCompare);
      }
      return aCompare.localeCompare(bCompare);
    });

    return options.sortBy === 'lines' ? items.join('\n') : items.join(' ');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sortText());
  };

  const clearText = () => {
    setText('');
  };

  const sortedText = sortText();

  return (
    <Layout title="Alphabetical Order Sorter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Original Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to sort alphabetically..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            {/* Options */}
            <div className="mt-4 space-y-3">
              <h4 className="text-white/70 font-medium">Sort Options</h4>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={options.sortBy === 'lines'}
                    onChange={() => setOptions({...options, sortBy: 'lines'})}
                    className="text-cyan-500"
                  />
                  <span className="text-white/70 text-sm">Sort Lines</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={options.sortBy === 'words'}
                    onChange={() => setOptions({...options, sortBy: 'words'})}
                    className="text-cyan-500"
                  />
                  <span className="text-white/70 text-sm">Sort Words</span>
                </label>
              </div>
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
                  checked={options.reverse}
                  onChange={(e) => setOptions({...options, reverse: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Reverse order (Z to A)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.removeEmpty}
                  onChange={(e) => setOptions({...options, removeEmpty: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Remove empty lines</span>
              </label>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Sorted Text</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm">
                {sortedText || 'Sorted text will appear here...'}
              </pre>
            </div>

            {/* Statistics */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {text ? (options.sortBy === 'lines' ? text.split('\n').length : text.split(/\s+/).length) : 0}
                </div>
                <div className="text-white/70 text-xs">
                  {options.sortBy === 'lines' ? 'Lines' : 'Words'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {sortedText ? (options.sortBy === 'lines' ? sortedText.split('\n').length : sortedText.split(/\s+/).length) : 0}
                </div>
                <div className="text-white/70 text-xs">After Sort</div>
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

export default AlphabeticalOrder;