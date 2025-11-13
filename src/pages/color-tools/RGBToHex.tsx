import React, { useState } from 'react';
import Layout from '../../components/Layout';

const RGBToHex: React.FC = () => {
  const [rgbValues, setRgbValues] = useState({ r: 59, g: 130, b: 246 });
  const [hexResult, setHexResult] = useState('#3b82f6');

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0;
    const newRgb = { ...rgbValues, [channel]: Math.max(0, Math.min(255, numValue)) };
    setRgbValues(newRgb);
    setHexResult(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const randomizeColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setRgbValues({ r, g, b });
    setHexResult(rgbToHex(r, g, b));
  };

  const presetColors = [
    { name: 'Red', rgb: { r: 255, g: 0, b: 0 } },
    { name: 'Green', rgb: { r: 0, g: 255, b: 0 } },
    { name: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
    { name: 'Yellow', rgb: { r: 255, g: 255, b: 0 } },
    { name: 'Magenta', rgb: { r: 255, g: 0, b: 255 } },
    { name: 'Cyan', rgb: { r: 0, g: 255, b: 255 } },
    { name: 'Black', rgb: { r: 0, g: 0, b: 0 } },
    { name: 'White', rgb: { r: 255, g: 255, b: 255 } }
  ];

  return (
    <Layout title="RGB to Hex Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RGB Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">RGB Color Input</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="w-32 h-32 mx-auto rounded-xl border-4 border-white/20 shadow-lg"
                  style={{ backgroundColor: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})` }}
                ></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-red-400 text-sm font-medium mb-2">
                    Red (0-255): {rgbValues.r}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    className="w-full accent-red-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValues.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    className="w-full mt-2 p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>

                <div>
                  <label className="block text-green-400 text-sm font-medium mb-2">
                    Green (0-255): {rgbValues.g}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    className="w-full accent-green-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValues.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    className="w-full mt-2 p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>

                <div>
                  <label className="block text-blue-400 text-sm font-medium mb-2">
                    Blue (0-255): {rgbValues.b}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    className="w-full accent-blue-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValues.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    className="w-full mt-2 p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <button
                onClick={randomizeColor}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Random Color
              </button>
            </div>
          </div>

          {/* Hex Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Hex Output</h3>
            
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white mb-2 font-mono">
                  {hexResult.toUpperCase()}
                </div>
                <button
                  onClick={() => copyToClipboard(hexResult)}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy Hex
                </button>
              </div>

              {/* Color Formats */}
              <div className="space-y-3">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Hex (Uppercase):</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">{hexResult.toUpperCase()}</span>
                      <button
                        onClick={() => copyToClipboard(hexResult.toUpperCase())}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Hex (Lowercase):</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">{hexResult.toLowerCase()}</span>
                      <button
                        onClick={() => copyToClipboard(hexResult.toLowerCase())}
                        className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded hover:bg-green-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">CSS Background:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">background: {hexResult};</span>
                      <button
                        onClick={() => copyToClipboard(`background: ${hexResult};`)}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded hover:bg-purple-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Colors */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preset Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  setRgbValues(color.rgb);
                  setHexResult(rgbToHex(color.rgb.r, color.rgb.g, color.rgb.b));
                }}
                className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 hover:bg-white/10 transition-all"
              >
                <div 
                  className="w-full h-12 rounded-lg border border-white/20 mb-2"
                  style={{ backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` }}
                ></div>
                <div className="text-white text-sm font-medium">{color.name}</div>
                <div className="text-white/60 text-xs">
                  rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RGBToHex;