import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TextToBinary: React.FC = () => {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');

  const textToBinary = (str: string) => {
    return str.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  const binaryToText = (bin: string) => {
    try {
      return bin.split(' ').map(binary => {
        return String.fromCharCode(parseInt(binary, 2));
      }).join('');
    } catch (error) {
      return 'Invalid binary format';
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setBinary(textToBinary(value));
  };

  const handleBinaryChange = (value: string) => {
    setBinary(value);
    setText(binaryToText(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearAll = () => {
    setText('');
    setBinary('');
  };

  return (
    <Layout title="Text to Binary Converter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Text</h3>
              <button
                onClick={() => copyToClipboard(text)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter text to convert to binary..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Binary Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Binary</h3>
              <button
                onClick={() => copyToClipboard(binary)}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <textarea
              value={binary}
              onChange={(e) => handleBinaryChange(e.target.value)}
              placeholder="Binary output will appear here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-sm"
            />
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

        {/* Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
          <div className="space-y-2 text-white/70 text-sm">
            <p>• Each character is converted to its ASCII value, then to 8-bit binary</p>
            <p>• Binary digits are separated by spaces for readability</p>
            <p>• You can also paste binary code to convert back to text</p>
            <p>• Example: 'A' = 65 (ASCII) = 01000001 (Binary)</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToBinary;