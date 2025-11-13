import React, { useState } from 'react';
import Layout from '../../components/Layout';

const ColorContrastChecker: React.FC = () => {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [results, setResults] = useState<any>({});

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  React.useEffect(() => {
    const contrastRatio = getContrastRatio(foregroundColor, backgroundColor);
    
    const wcagAA = {
      normalText: contrastRatio >= 4.5,
      largeText: contrastRatio >= 3,
      uiComponents: contrastRatio >= 3
    };

    const wcagAAA = {
      normalText: contrastRatio >= 7,
      largeText: contrastRatio >= 4.5,
      uiComponents: contrastRatio >= 4.5
    };

    setResults({
      contrastRatio: contrastRatio.toFixed(2),
      wcagAA,
      wcagAAA,
      rating: contrastRatio >= 7 ? 'Excellent' : 
              contrastRatio >= 4.5 ? 'Good' : 
              contrastRatio >= 3 ? 'Fair' : 'Poor'
    });
  }, [foregroundColor, backgroundColor]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const swapColors = () => {
    const temp = foregroundColor;
    setForegroundColor(backgroundColor);
    setBackgroundColor(temp);
  };

  const commonCombinations = [
    { fg: '#000000', bg: '#ffffff', name: 'Black on White' },
    { fg: '#ffffff', bg: '#000000', name: 'White on Black' },
    { fg: '#0066cc', bg: '#ffffff', name: 'Blue on White' },
    { fg: '#ffffff', bg: '#0066cc', name: 'White on Blue' },
    { fg: '#333333', bg: '#f5f5f5', name: 'Dark Gray on Light' },
    { fg: '#666666', bg: '#ffffff', name: 'Medium Gray on White' }
  ];

  return (
    <Layout title="Color Contrast Checker" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Selection */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Color Selection</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Foreground Color (Text)
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border border-glass cursor-pointer"
                  />
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border border-glass cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <button
                onClick={swapColors}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Swap Colors
              </button>
            </div>

            {/* Common Combinations */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Common Combinations</h4>
              <div className="space-y-2">
                {commonCombinations.map((combo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setForegroundColor(combo.fg);
                      setBackgroundColor(combo.bg);
                    }}
                    className="w-full p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm text-left"
                  >
                    {combo.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contrast Results */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Contrast Analysis</h3>
            
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {results.contrastRatio}:1
                </div>
                <div className={`inline-block px-3 py-1 rounded-lg font-medium ${
                  results.rating === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                  results.rating === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                  results.rating === 'Fair' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {results.rating}
                </div>
              </div>

              {/* WCAG Compliance */}
              <div className="space-y-3">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">WCAG AA Compliance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Normal Text (4.5:1):</span>
                      <span className={results.wcagAA?.normalText ? 'text-green-400' : 'text-red-400'}>
                        {results.wcagAA?.normalText ? '✅ Pass' : '❌ Fail'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Large Text (3:1):</span>
                      <span className={results.wcagAA?.largeText ? 'text-green-400' : 'text-red-400'}>
                        {results.wcagAA?.largeText ? '✅ Pass' : '❌ Fail'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">UI Components (3:1):</span>
                      <span className={results.wcagAA?.uiComponents ? 'text-green-400' : 'text-red-400'}>
                        {results.wcagAA?.uiComponents ? '✅ Pass' : '❌ Fail'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">WCAG AAA Compliance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Normal Text (7:1):</span>
                      <span className={results.wcagAAA?.normalText ? 'text-green-400' : 'text-red-400'}>
                        {results.wcagAAA?.normalText ? '✅ Pass' : '❌ Fail'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Large Text (4.5:1):</span>
                      <span className={results.wcagAAA?.largeText ? 'text-green-400' : 'text-red-400'}>
                        {results.wcagAAA?.largeText ? '✅ Pass' : '❌ Fail'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Preview */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Text Preview</h3>
          <div 
            className="rounded-xl p-8 border border-white/20"
            style={{ backgroundColor: backgroundColor, color: foregroundColor }}
          >
            <h1 className="text-4xl font-bold mb-4">Large Heading Text</h1>
            <h2 className="text-2xl font-semibold mb-4">Medium Heading Text</h2>
            <p className="text-lg mb-4">
              This is normal body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm">
              This is small text. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button 
              className="mt-4 px-4 py-2 border-2 rounded-lg"
              style={{ borderColor: foregroundColor, color: foregroundColor }}
            >
              Button Example
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ColorContrastChecker;