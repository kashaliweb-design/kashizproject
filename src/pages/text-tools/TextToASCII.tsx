import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TextToASCII: React.FC = () => {
  const [text, setText] = useState('');
  const [ascii, setAscii] = useState('');

  const textToASCII = (str: string) => {
    return str.split('').map(char => char.charCodeAt(0)).join(' ');
  };

  const asciiToText = (asciiStr: string) => {
    try {
      return asciiStr.split(' ').map(code => String.fromCharCode(parseInt(code))).join('');
    } catch (error) {
      return 'Invalid ASCII format';
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setAscii(textToASCII(value));
  };

  const handleAsciiChange = (value: string) => {
    setAscii(value);
    setText(asciiToText(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearAll = () => {
    setText('');
    setAscii('');
  };

  return (
    <Layout title="Text to ASCII Converter" showBackButton>
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
              placeholder="Enter text to convert to ASCII..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* ASCII Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">ASCII Codes</h3>
              <button
                onClick={() => copyToClipboard(ascii)}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <textarea
              value={ascii}
              onChange={(e) => handleAsciiChange(e.target.value)}
              placeholder="ASCII codes will appear here..."
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

        {/* ASCII Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">ASCII Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-white/70 font-medium">Common Characters</div>
              <div className="text-white/60">Space: 32</div>
              <div className="text-white/60">A: 65, a: 97</div>
              <div className="text-white/60">0: 48, 9: 57</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/70 font-medium">Punctuation</div>
              <div className="text-white/60">!: 33, ?: 63</div>
              <div className="text-white/60">.: 46, ,: 44</div>
              <div className="text-white/60">": 34, ': 39</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/70 font-medium">Special</div>
              <div className="text-white/60">Tab: 9</div>
              <div className="text-white/60">Enter: 10</div>
              <div className="text-white/60">Return: 13</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/70 font-medium">Symbols</div>
              <div className="text-white/60">@: 64, #: 35</div>
              <div className="text-white/60">$: 36, %: 37</div>
              <div className="text-white/60">&: 38, *: 42</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToASCII;