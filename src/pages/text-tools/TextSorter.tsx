import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TextSorter: React.FC = () => {
  const [text, setText] = useState('');
  const [sortType, setSortType] = useState('alphabetical');

  const sortOptions = [
    {
      id: 'alphabetical',
      title: 'Alphabetical (A-Z)',
      description: 'Sort lines alphabetically',
      function: (lines: string[]) => lines.sort((a, b) => a.localeCompare(b)),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'reverse-alphabetical',
      title: 'Reverse Alphabetical (Z-A)',
      description: 'Sort lines in reverse alphabetical order',
      function: (lines: string[]) => lines.sort((a, b) => b.localeCompare(a)),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'length-ascending',
      title: 'Length (Short to Long)',
      description: 'Sort by line length (ascending)',
      function: (lines: string[]) => lines.sort((a, b) => a.length - b.length),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'length-descending',
      title: 'Length (Long to Short)',
      description: 'Sort by line length (descending)',
      function: (lines: string[]) => lines.sort((a, b) => b.length - a.length),
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 'random',
      title: 'Random Shuffle',
      description: 'Randomly shuffle the lines',
      function: (lines: string[]) => {
        const shuffled = [...lines];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      },
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'reverse-order',
      title: 'Reverse Order',
      description: 'Reverse the current order of lines',
      function: (lines: string[]) => lines.reverse(),
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const getSortedText = () => {
    if (!text.trim()) return '';
    
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const selectedOption = sortOptions.find(option => option.id === sortType);
    
    if (selectedOption) {
      const sortedLines = selectedOption.function([...lines]);
      return sortedLines.join('\n');
    }
    
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getSortedText());
  };

  const clearText = () => {
    setText('');
  };

  const sortedText = getSortedText();
  const selectedOption = sortOptions.find(option => option.id === sortType);

  return (
    <Layout title="Text Sorter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Original Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text lines to sort..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            {/* Sort Type Selection */}
            <div className="mt-4">
              <h4 className="text-white/70 font-medium mb-3">Sort Type</h4>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="sortType"
                      value={option.id}
                      checked={sortType === option.id}
                      onChange={(e) => setSortType(e.target.value)}
                      className="text-cyan-500"
                    />
                    <div>
                      <div className="text-white/90 text-sm font-medium">{option.title}</div>
                      <div className="text-white/60 text-xs">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Sorted Text</h3>
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1 bg-gradient-to-r ${selectedOption?.gradient || 'from-green-500 to-emerald-600'} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
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
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {text ? text.split('\n').filter(line => line.trim() !== '').length : 0}
                </div>
                <div className="text-white/70 text-xs">Lines</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {text ? text.split(/\s+/).filter(word => word.trim() !== '').length : 0}
                </div>
                <div className="text-white/70 text-xs">Words</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{text.length}</div>
                <div className="text-white/70 text-xs">Characters</div>
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
    </Layout>
  );
};

export default TextSorter;