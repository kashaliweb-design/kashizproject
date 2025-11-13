import React, { useState } from 'react';
import Layout from '../../components/Layout';

const RemoveExtraSpaces: React.FC = () => {
  const [text, setText] = useState('');

  const spaceOptions = [
    {
      title: 'Remove Extra Spaces',
      description: 'Remove multiple consecutive spaces',
      function: (str: string) => str.replace(/\s+/g, ' '),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Remove All Spaces',
      description: 'Remove all spaces from text',
      function: (str: string) => str.replace(/\s/g, ''),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Remove Leading Spaces',
      description: 'Remove spaces at the beginning of lines',
      function: (str: string) => str.replace(/^\s+/gm, ''),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Remove Trailing Spaces',
      description: 'Remove spaces at the end of lines',
      function: (str: string) => str.replace(/\s+$/gm, ''),
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: 'Trim All Lines',
      description: 'Remove leading and trailing spaces from all lines',
      function: (str: string) => str.split('\n').map(line => line.trim()).join('\n'),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Remove Empty Lines',
      description: 'Remove blank lines from text',
      function: (str: string) => str.split('\n').filter(line => line.trim() !== '').join('\n'),
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <Layout title="Remove Extra Spaces" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text with extra spaces..."
            className="w-full h-32 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={clearText}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaceOptions.map((option, index) => {
            const processedText = text ? option.function(text) : '';
            return (
              <div key={index} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium">{option.title}</h3>
                    <p className="text-white/60 text-sm">{option.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(processedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${option.gradient} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[80px]">
                  <pre className="text-white/90 whitespace-pre-wrap text-sm">
                    {processedText || 'Processed text will appear here...'}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default RemoveExtraSpaces;