import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ColorConverter: React.FC = () => {
  const [inputColor, setInputColor] = useState('#3b82f6');
  const [inputFormat, setInputFormat] = useState('hex');
  const [results, setResults] = useState<any>({});

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  React.useEffect(() => {
    const rgb = hexToRgb(inputColor);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
      
      setResults({
        hex: inputColor.toUpperCase(),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: `hsl(${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%)`,
        hsla: `hsla(${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%, 1)`,
        cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
        css: `background-color: ${inputColor};`,
        tailwind: `bg-[${inputColor}]`,
        rgbValues: rgb,
        hslValues: hsl,
        cmykValues: cmyk
      });
    }
  }, [inputColor]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Layout title="Color Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Color Input</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="w-40 h-40 mx-auto rounded-xl border-4 border-white/20 shadow-lg"
                  style={{ backgroundColor: inputColor }}
                ></div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Color Picker
                </label>
                <input
                  type="color"
                  value={inputColor}
                  onChange={(e) => setInputColor(e.target.value)}
                  className="w-full h-12 rounded-lg border border-glass cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Hex Code
                </label>
                <input
                  type="text"
                  value={inputColor}
                  onChange={(e) => setInputColor(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Color Formats */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">All Formats</h3>
            
            <div className="space-y-3">
              {Object.entries(results).filter(([key]) => 
                !['rgbValues', 'hslValues', 'cmykValues'].includes(key)
              ).map(([format, value]) => (
                <div key={format} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 font-medium uppercase">{format}</span>
                    <button
                      onClick={() => copyToClipboard(value as string)}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-white font-mono text-sm break-all">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Values Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">RGB Values</h3>
            {results.rgbValues && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-400">Red:</span>
                  <span className="text-white font-mono">{results.rgbValues.r}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400">Green:</span>
                  <span className="text-white font-mono">{results.rgbValues.g}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">Blue:</span>
                  <span className="text-white font-mono">{results.rgbValues.b}</span>
                </div>
              </div>
            )}
          </div>

          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">HSL Values</h3>
            {results.hslValues && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-400">Hue:</span>
                  <span className="text-white font-mono">{results.hslValues.h}°</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400">Saturation:</span>
                  <span className="text-white font-mono">{results.hslValues.s}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">Lightness:</span>
                  <span className="text-white font-mono">{results.hslValues.l}%</span>
                </div>
              </div>
            )}
          </div>

          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">CMYK Values</h3>
            {results.cmykValues && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400">Cyan:</span>
                  <span className="text-white font-mono">{results.cmykValues.c}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-400">Magenta:</span>
                  <span className="text-white font-mono">{results.cmykValues.m}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">Yellow:</span>
                  <span className="text-white font-mono">{results.cmykValues.y}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Black:</span>
                  <span className="text-white font-mono">{results.cmykValues.k}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default ColorConverter;