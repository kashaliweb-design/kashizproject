import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ReverseText: React.FC = () => {
  const [text, setText] = useState('');

  const reverseOptions = [
    {
      title: 'Reverse Text',
      description: 'Reverse the entire text character by character',
      function: (str: string) => str.split('').reverse().join(''),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Reverse Words',
      description: 'Reverse the order of words',
      function: (str: string) => str.split(' ').reverse().join(' '),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Reverse Lines',
      description: 'Reverse the order of lines',
      function: (str: string) => str.split('\n').reverse().join('\n'),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Reverse Each Word',
      description: 'Reverse characters in each word separately',
      function: (str: string) => str.split(' ').map(word => word.split('').reverse().join('')).join(' '),
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: 'Reverse Sentences',
      description: 'Reverse the order of sentences',
      function: (str: string) => str.split(/([.!?]+)/).filter(s => s.trim()).reverse().join(''),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Flip Text',
      description: 'Flip text upside down using Unicode',
      function: (str: string) => {
        const flipMap: { [key: string]: string } = {
          'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
          'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
          'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
          'y': 'ʎ', 'z': 'z', '?': '¿', '!': '¡', '.': '˙', ',': "'", "'": ',', '"': '„',
          '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0'
        };
        return str.toLowerCase().split('').map(char => flipMap[char] || char).reverse().join('');
      },
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
    <Layout title="Reverse Text" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to reverse..."
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
          {reverseOptions.map((option, index) => {
            const reversedText = text ? option.function(text) : '';
            return (
              <div key={index} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium">{option.title}</h3>
                    <p className="text-white/60 text-sm">{option.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(reversedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${option.gradient} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[80px]">
                  <p className="text-white/90 whitespace-pre-wrap break-all">
                    {reversedText || 'Reversed text will appear here...'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default ReverseText;