import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const TextToOctal: React.FC = () => {
  const [text, setText] = useState('');
  const [octal, setOctal] = useState('');

  const textToOctal = (str: string) => {
    return str.split('').map(char => {
      return char.charCodeAt(0).toString(8).padStart(3, '0');
    }).join(' ');
  };

  const octalToText = (octalStr: string) => {
    try {
      return octalStr.split(' ').map(oct => {
        return String.fromCharCode(parseInt(oct, 8));
      }).join('');
    } catch (error) {
      return 'Invalid octal format';
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setOctal(textToOctal(value));
  };

  const handleOctalChange = (value: string) => {
    setOctal(value);
    setText(octalToText(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearAll = () => {
    setText('');
    setOctal('');
  };

  const octalFormats = [
    {
      name: 'Spaced Octal',
      description: 'Octal values separated by spaces',
      convert: (str: string) => textToOctal(str),
      example: '110 145 154 154 157'
    },
    {
      name: 'Continuous Octal',
      description: 'Octal values without spaces',
      convert: (str: string) => textToOctal(str).replace(/\s/g, ''),
      example: '110145154154157'
    },
    {
      name: 'Prefixed Octal',
      description: 'Octal values with 0 prefix',
      convert: (str: string) => textToOctal(str).split(' ').map(o => '0' + o).join(' '),
      example: '0110 0145 0154 0154 0157'
    },
    {
      name: 'Escaped Octal',
      description: 'C-style escaped octal',
      convert: (str: string) => str.split('').map(char => '\\' + char.charCodeAt(0).toString(8).padStart(3, '0')).join(''),
      example: '\\110\\145\\154\\154\\157'
    }
  ];

  return (
    <Layout title="Text to Octal Converter" showBackButton>
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
              placeholder="Enter text to convert to octal..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Octal Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Octal Code</h3>
              <button
                onClick={() => copyToClipboard(octal)}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <textarea
              value={octal}
              onChange={(e) => handleOctalChange(e.target.value)}
              placeholder="Octal code will appear here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-sm"
            />
          </div>
        </div>

        {/* Different Octal Formats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {octalFormats.map((format, index) => {
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

        {/* Octal Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">About Octal</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Octal is a base-8 number system using digits 0-7</p>
            <p>• Each character is converted to its ASCII value, then to octal</p>
            <p>• Octal was commonly used in early computing systems</p>
            <p>• Three octal digits can represent any byte value (0-377 in octal = 0-255 in decimal)</p>
            <p>• Still used in Unix file permissions (e.g., 755, 644)</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Octal Reference</h4>
            <div className="grid grid-cols-4 gap-4 text-sm font-mono">
              <div>
                <div className="text-white/70">Decimal → Octal</div>
                <div className="text-white">0→0, 1→1, 2→2, 3→3</div>
                <div className="text-white">4→4, 5→5, 6→6, 7→7</div>
                <div className="text-white">8→10, 9→11, 10→12</div>
              </div>
              <div>
                <div className="text-white/70">Common Characters</div>
                <div className="text-white">Space: 040</div>
                <div className="text-white">A: 101, a: 141</div>
                <div className="text-white">0: 060, 9: 071</div>
              </div>
              <div>
                <div className="text-white/70">Punctuation</div>
                <div className="text-white">!: 041, ?: 077</div>
                <div className="text-white">.: 056, ,: 054</div>
                <div className="text-white">": 042, ': 047</div>
              </div>
              <div>
                <div className="text-white/70">Special</div>
                <div className="text-white">Tab: 011</div>
                <div className="text-white">LF: 012</div>
                <div className="text-white">CR: 015</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Unix File Permissions (Octal)</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                <div className="text-white font-medium">755</div>
                <div className="text-white/60">rwxr-xr-x</div>
              </div>
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                <div className="text-white font-medium">644</div>
                <div className="text-white/60">rw-r--r--</div>
              </div>
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                <div className="text-white font-medium">777</div>
                <div className="text-white/60">rwxrwxrwx</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default TextToOctal;