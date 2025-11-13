import React, { useState } from 'react';
import Layout from '../../components/Layout';

const HexToRGB: React.FC = () => {
  const [hexColor, setHexColor] = useState('#3b82f6');
  const [rgbResult, setRgbResult] = useState({ r: 59, g: 130, b: 246 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleHexChange = (value: string) => {
    setHexColor(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgbResult(rgb);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presetColors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#000000', '#ffffff', '#808080', '#800000', '#008000', '#000080'
  ];

  return (
    <Layout title="Hex to RGB Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Hex Color Input</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="w-32 h-32 mx-auto rounded-xl border-4 border-white/20 shadow-lg"
                  style={{ backgroundColor: hexColor }}
                ></div>
                <div className="mt-3 text-white font-mono text-lg">{hexColor.toUpperCase()}</div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Hex Color Code
                </label>
                <input
                  type="text"
                  value={hexColor}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#3b82f6"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Color Picker
                </label>
                <input
                  type="color"
                  value={hexColor}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="w-full h-12 rounded-lg border border-glass cursor-pointer"
                />
              </div>
            </div>

            {/* Preset Colors */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Preset Colors</h4>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleHexChange(color)}
                    className="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/40 transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RGB Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">RGB Output</h3>
            
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  rgb({rgbResult.r}, {rgbResult.g}, {rgbResult.b})
                </div>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b})`)}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy RGB
                </button>
              </div>

              <div className="space-y-3">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-red-400 font-medium">Red (R):</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">{rgbResult.r}</span>
                      <button
                        onClick={() => copyToClipboard(rgbResult.r.toString())}
                        className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded hover:bg-red-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-medium">Green (G):</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">{rgbResult.g}</span>
                      <button
                        onClick={() => copyToClipboard(rgbResult.g.toString())}
                        className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded hover:bg-green-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-medium">Blue (B):</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">{rgbResult.b}</span>
                      <button
                        onClick={() => copyToClipboard(rgbResult.b.toString())}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Formats */}
              <div className="space-y-2">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">RGBA:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">rgba({rgbResult.r}, {rgbResult.g}, {rgbResult.b}, 1)</span>
                      <button
                        onClick={() => copyToClipboard(`rgba(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b}, 1)`)}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded hover:bg-purple-500/30 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">CSS:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">color: rgb({rgbResult.r}, {rgbResult.g}, {rgbResult.b});</span>
                      <button
                        onClick={() => copyToClipboard(`color: rgb(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b});`)}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded hover:bg-cyan-500/30 transition-colors"
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

        {/* Color Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Color Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Hex Format</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Format:</div>
                  <div className="text-white/60">#RRGGBB (6 digits)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Range:</div>
                  <div className="text-white/60">00 to FF (0-255)</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">RGB Format</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Format:</div>
                  <div className="text-white/60">rgb(r, g, b)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Range:</div>
                  <div className="text-white/60">0 to 255 for each channel</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Usage</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Web Design:</div>
                  <div className="text-white/60">CSS, HTML, JavaScript</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Graphics:</div>
                  <div className="text-white/60">Photoshop, GIMP, Figma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HexToRGB;