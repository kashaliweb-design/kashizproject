import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ROT13Encoder: React.FC = () => {
  const [text, setText] = useState('');

  const rot13Transform = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const rotVariants = [
    { name: 'ROT13', shift: 13, description: 'Standard ROT13 - shifts by 13 positions' },
    { name: 'ROT1', shift: 1, description: 'Caesar cipher with shift of 1' },
    { name: 'ROT5', shift: 5, description: 'Shifts by 5 positions' },
    { name: 'ROT8', shift: 8, description: 'Shifts by 8 positions' },
    { name: 'ROT18', shift: 18, description: 'Shifts by 18 positions' },
    { name: 'ROT25', shift: 25, description: 'Shifts by 25 positions (reverse of ROT1)' }
  ];

  const applyROT = (str: string, shift: number) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <Layout title="ROT13 Encoder" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to encode with ROT13..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rotVariants.map((variant, index) => {
            const encodedText = text ? applyROT(text, variant.shift) : '';
            const gradients = [
              'from-blue-500 to-cyan-600',
              'from-purple-500 to-pink-600',
              'from-green-500 to-emerald-600',
              'from-red-500 to-pink-600',
              'from-yellow-500 to-orange-600',
              'from-cyan-500 to-blue-600'
            ];
            
            return (
              <div key={index} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium">{variant.name}</h3>
                    <p className="text-white/60 text-sm">{variant.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(encodedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${gradients[index]} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[100px]">
                  <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                    {encodedText || `${variant.name} encoded text will appear here...`}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROT13 Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">About ROT13</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• ROT13 is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet</p>
            <p>• It's a special case of the Caesar cipher with a shift of 13</p>
            <p>• ROT13 is its own inverse - applying ROT13 twice returns the original text</p>
            <p>• Only letters are affected; numbers, punctuation, and spaces remain unchanged</p>
            <p>• Example: "Hello World" becomes "Uryyb Jbeyq"</p>
            <p>• ROT13 was commonly used in online forums to hide spoilers or potentially offensive content</p>
          </div>

          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Alphabet Mapping (ROT13)</h4>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div>
                <div className="text-white/70">Original:</div>
                <div className="text-white">ABCDEFGHIJKLM</div>
                <div className="text-white">abcdefghijklm</div>
              </div>
              <div>
                <div className="text-white/70">ROT13:</div>
                <div className="text-white">NOPQRSTUVWXYZ</div>
                <div className="text-white">nopqrstuvwxyz</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default ROT13Encoder;