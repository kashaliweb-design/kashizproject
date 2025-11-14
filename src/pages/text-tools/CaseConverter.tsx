import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');

  const convertCase = (type: string) => {
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'sentence':
        return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
      case 'alternate':
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      case 'inverse':
        return text.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      default:
        return text;
    }
  };

  const copyToClipboard = (convertedText: string) => {
    navigator.clipboard.writeText(convertedText);
  };

  const conversions = [
    { type: 'uppercase', label: 'UPPERCASE', gradient: 'from-blue-500 to-cyan-600' },
    { type: 'lowercase', label: 'lowercase', gradient: 'from-purple-500 to-pink-600' },
    { type: 'capitalize', label: 'Capitalize Each Word', gradient: 'from-green-500 to-emerald-600' },
    { type: 'sentence', label: 'Sentence case', gradient: 'from-red-500 to-pink-600' },
    { type: 'alternate', label: 'aLtErNaTe CaSe', gradient: 'from-yellow-500 to-orange-600' },
    { type: 'inverse', label: 'iNVERSE cASE', gradient: 'from-cyan-500 to-blue-600' }
  ];

  return (
    <Layout title="Text Case Converter" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert case..."
            className="w-full h-32 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conversions.map((conversion) => {
            const convertedText = convertCase(conversion.type);
            return (
              <div key={conversion.type} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-medium">{conversion.label}</h3>
                  <button
                    onClick={() => copyToClipboard(convertedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${conversion.gradient} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[80px]">
                  <p className="text-white/90 whitespace-pre-wrap">{convertedText || 'Converted text will appear here...'}</p>
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

export default CaseConverter;