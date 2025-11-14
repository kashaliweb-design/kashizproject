import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ColorPaletteGenerator: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [paletteType, setPaletteType] = useState('monochromatic');
  const [colorCount, setColorCount] = useState(5);

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
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

  const generatePalette = () => {
    const baseHsl = hexToHsl(baseColor);
    if (!baseHsl) return [];

    const colors = [];

    switch (paletteType) {
      case 'monochromatic':
        for (let i = 0; i < colorCount; i++) {
          const lightness = 20 + (i * (80 / (colorCount - 1)));
          colors.push(hslToHex(baseHsl.h, baseHsl.s, lightness));
        }
        break;

      case 'analogous':
        for (let i = 0; i < colorCount; i++) {
          const hue = (baseHsl.h + (i * 30) - 60) % 360;
          colors.push(hslToHex(hue < 0 ? hue + 360 : hue, baseHsl.s, baseHsl.l));
        }
        break;

      case 'complementary':
        colors.push(baseColor);
        colors.push(hslToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l));
        for (let i = 2; i < colorCount; i++) {
          const hue = (baseHsl.h + (i * 60)) % 360;
          colors.push(hslToHex(hue, baseHsl.s, baseHsl.l));
        }
        break;

      case 'triadic':
        colors.push(baseColor);
        colors.push(hslToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l));
        colors.push(hslToHex((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l));
        for (let i = 3; i < colorCount; i++) {
          const hue = (baseHsl.h + (i * 45)) % 360;
          colors.push(hslToHex(hue, baseHsl.s, baseHsl.l));
        }
        break;

      case 'tetradic':
        colors.push(baseColor);
        colors.push(hslToHex((baseHsl.h + 90) % 360, baseHsl.s, baseHsl.l));
        colors.push(hslToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l));
        colors.push(hslToHex((baseHsl.h + 270) % 360, baseHsl.s, baseHsl.l));
        for (let i = 4; i < colorCount; i++) {
          const hue = (baseHsl.h + (i * 30)) % 360;
          colors.push(hslToHex(hue, baseHsl.s, baseHsl.l));
        }
        break;

      default:
        colors.push(baseColor);
    }

    return colors.slice(0, colorCount);
  };

  const palette = generatePalette();

  const copyPalette = () => {
    const paletteString = palette.join(', ');
    copyToClipboard(paletteString);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Layout title="Color Palette Generator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Palette Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Base Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border border-glass cursor-pointer"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Palette Type
                </label>
                <select
                  value={paletteType}
                  onChange={(e) => setPaletteType(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="monochromatic">Monochromatic</option>
                  <option value="analogous">Analogous</option>
                  <option value="complementary">Complementary</option>
                  <option value="triadic">Triadic</option>
                  <option value="tetradic">Tetradic</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Number of Colors: {colorCount}
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={colorCount}
                  onChange={(e) => setColorCount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={copyPalette}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Copy Palette
              </button>
            </div>
          </div>

          {/* Palette Display */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Generated Palette</h3>
            
            <div className="space-y-4">
              <div className="flex rounded-xl overflow-hidden border border-white/20">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 h-24 cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                    title={`Click to copy: ${color}`}
                  />
                ))}
              </div>

              <div className="space-y-2">
                {palette.map((color, index) => (
                  <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded border border-white/20"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-white font-mono">{color.toUpperCase()}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(color)}
                        className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Palette Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Color Harmony Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Monochromatic</div>
              <div className="text-white/70 text-sm">Uses different shades and tints of a single color</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Analogous</div>
              <div className="text-white/70 text-sm">Uses colors that are next to each other on the color wheel</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Complementary</div>
              <div className="text-white/70 text-sm">Uses colors that are opposite each other on the color wheel</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Triadic</div>
              <div className="text-white/70 text-sm">Uses three colors equally spaced on the color wheel</div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Tetradic</div>
              <div className="text-white/70 text-sm">Uses four colors arranged into two complementary pairs</div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default ColorPaletteGenerator;