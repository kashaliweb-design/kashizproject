import React, { useState } from 'react';
import Layout from '../../components/Layout';

const RandomColorGenerator: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [colorType, setColorType] = useState('any');
  const [count, setCount] = useState(6);

  const generateRandomHex = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const generatePastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 20; // 20-50%
    const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
    return hslToHex(hue, saturation, lightness);
  };

  const generateBrightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
    const lightness = Math.floor(Math.random() * 30) + 40; // 40-70%
    return hslToHex(hue, saturation, lightness);
  };

  const generateDarkColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 30; // 30-80%
    const lightness = Math.floor(Math.random() * 30) + 10; // 10-40%
    return hslToHex(hue, saturation, lightness);
  };

  const generateWarmColor = () => {
    const hue = Math.floor(Math.random() * 60); // 0-60 (reds, oranges, yellows)
    const saturation = Math.floor(Math.random() * 40) + 60; // 60-100%
    const lightness = Math.floor(Math.random() * 40) + 40; // 40-80%
    return hslToHex(hue, saturation, lightness);
  };

  const generateCoolColor = () => {
    const hue = Math.floor(Math.random() * 120) + 180; // 180-300 (blues, greens, purples)
    const saturation = Math.floor(Math.random() * 40) + 60; // 60-100%
    const lightness = Math.floor(Math.random() * 40) + 40; // 40-80%
    return hslToHex(hue, saturation, lightness);
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 12) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateColors = () => {
    const newColors = [];
    
    for (let i = 0; i < count; i++) {
      let color;
      switch (colorType) {
        case 'pastel':
          color = generatePastelColor();
          break;
        case 'bright':
          color = generateBrightColor();
          break;
        case 'dark':
          color = generateDarkColor();
          break;
        case 'warm':
          color = generateWarmColor();
          break;
        case 'cool':
          color = generateCoolColor();
          break;
        default:
          color = generateRandomHex();
      }
      newColors.push(color);
    }
    
    setColors(newColors);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllColors = () => {
    const colorString = colors.join(', ');
    copyToClipboard(colorString);
  };

  React.useEffect(() => {
    generateColors();
  }, [colorType, count]);

  return (
    <Layout title="Random Color Generator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Generator Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Color Type
                </label>
                <select
                  value={colorType}
                  onChange={(e) => setColorType(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="any">Any Color</option>
                  <option value="pastel">Pastel Colors</option>
                  <option value="bright">Bright Colors</option>
                  <option value="dark">Dark Colors</option>
                  <option value="warm">Warm Colors</option>
                  <option value="cool">Cool Colors</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Number of Colors: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={generateColors}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Generate New
                </button>
                <button
                  onClick={copyAllColors}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Copy All
                </button>
              </div>
            </div>
          </div>

          {/* Color Display */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Generated Colors</h3>
            
            <div className="grid grid-cols-3 gap-3">
              {colors.map((color, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div 
                    className="w-full h-16 rounded-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                    title={`Click to copy: ${color}`}
                  />
                  <div className="text-white font-mono text-xs text-center mt-2">{color.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Details */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Color Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((color, index) => {
              const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
              if (!rgb) return null;
              
              const r = parseInt(rgb[1], 16);
              const g = parseInt(rgb[2], 16);
              const b = parseInt(rgb[3], 16);
              
              return (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-white font-mono">{color.toUpperCase()}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-400">R:</span>
                      <span className="text-white">{r}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-400">G:</span>
                      <span className="text-white">{g}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-400">B:</span>
                      <span className="text-white">{b}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Type Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Color Type Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Pastel Colors</div>
              <div className="text-white/70 text-sm">Soft, muted colors with high lightness and low saturation</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Bright Colors</div>
              <div className="text-white/70 text-sm">Vivid, saturated colors that stand out</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Dark Colors</div>
              <div className="text-white/70 text-sm">Deep, rich colors with low lightness</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Warm Colors</div>
              <div className="text-white/70 text-sm">Reds, oranges, and yellows that evoke warmth</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Cool Colors</div>
              <div className="text-white/70 text-sm">Blues, greens, and purples that feel cool</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RandomColorGenerator;