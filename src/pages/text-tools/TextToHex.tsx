import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TextToHex: React.FC = () => {
  const [text, setText] = useState('');
  const [hex, setHex] = useState('');

  const textToHex = (str: string) => {
    return str.split('').map(char => {
      return char.charCodeAt(0).toString(16).padStart(2, '0');
    }).join(' ');
  };

  const hexToText = (hexStr: string) => {
    try {
      return hexStr.split(' ').map(hex => {
        return String.fromCharCode(parseInt(hex, 16));
      }).join('');
    } catch (error) {
      return 'Invalid hex format';
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setHex(textToHex(value));
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    setText(hexToText(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearAll = () => {
    setText('');
    setHex('');
  };

  const hexFormats = [
    {
      name: 'Spaced Hex',
      description: 'Hex values separated by spaces',
      convert: (str: string) => textToHex(str),
      example: '48 65 6c 6c 6f'
    },
    {
      name: 'Continuous Hex',
      description: 'Hex values without spaces',
      convert: (str: string) => textToHex(str).replace(/\s/g, ''),
      example: '48656c6c6f'
    },
    {
      name: 'Prefixed Hex',
      description: 'Hex values with 0x prefix',
      convert: (str: string) => textToHex(str).split(' ').map(h => '0x' + h).join(' '),
      example: '0x48 0x65 0x6c 0x6c 0x6f'
    },
    {
      name: 'HTML Hex Entities',
      description: 'HTML hex character entities',
      convert: (str: string) => str.split('').map(char => '&#x' + char.charCodeAt(0).toString(16) + ';').join(''),
      example: '&#x48;&#x65;&#x6c;&#x6c;&#x6f;'
    }
  ];

  return (
    <Layout title="Text to Hex Converter" showBackButton>
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
              placeholder="Enter text to convert to hex..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Hex Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Hex Code</h3>
              <button
                onClick={() => copyToClipboard(hex)}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <textarea
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="Hex code will appear here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-sm"
            />
          </div>
        </div>

        {/* Different Hex Formats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hexFormats.map((format, index) => {
            const convertedText = text ? format.convert(text) : '';
            const gradients = [
              'from-blue-500 to-cyan-600',
              'from-green-500 to-emerald-600',
              'from-purple-500 to-pink-600',
              'from-yellow-500 to-orange-600'
            ];
            
            return (
              <div key={index} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium">{format.name}</h3>
                    <p className="text-white/60 text-sm">{format.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(convertedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${gradients[index]} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[80px]">
                  <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono break-all">
                    {convertedText || `${format.name} will appear here...`}
                  </pre>
                </div>
                <div className="mt-2 text-white/50 text-xs">
                  Example: "{format.example}"
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Hex Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">About Hexadecimal</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Hexadecimal (hex) is a base-16 number system using digits 0-9 and letters A-F</p>
            <p>• Each character is converted to its ASCII value, then to hexadecimal</p>
            <p>• Hex is commonly used in programming, web colors, and data representation</p>
            <p>• Two hex digits can represent any byte value (0-255)</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Hex Reference</h4>
            <div className="grid grid-cols-4 gap-4 text-sm font-mono">
              <div>
                <div className="text-white/70">Decimal → Hex</div>
                <div className="text-white">0→0, 1→1, 2→2, 3→3</div>
                <div className="text-white">10→A, 11→B, 12→C</div>
                <div className="text-white">13→D, 14→E, 15→F</div>
              </div>
              <div>
                <div className="text-white/70">Common Characters</div>
                <div className="text-white">Space: 20</div>
                <div className="text-white">A: 41, a: 61</div>
                <div className="text-white">0: 30, 9: 39</div>
              </div>
              <div>
                <div className="text-white/70">Punctuation</div>
                <div className="text-white">!: 21, ?: 3F</div>
                <div className="text-white">.: 2E, ,: 2C</div>
                <div className="text-white">": 22, ': 27</div>
              </div>
              <div>
                <div className="text-white/70">Special</div>
                <div className="text-white">Tab: 09</div>
                <div className="text-white">LF: 0A</div>
                <div className="text-white">CR: 0D</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToHex;