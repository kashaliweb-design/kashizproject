import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ColorPicker: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [colorFormats, setColorFormats] = useState<any>({});

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  React.useEffect(() => {
    const rgb = hexToRgb(selectedColor);
    const hsl = hexToHsl(selectedColor);
    
    if (rgb && hsl) {
      setColorFormats({
        hex: selectedColor.toUpperCase(),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
        css: `color: ${selectedColor};`,
        tailwind: `bg-[${selectedColor}]`
      });
    }
  }, [selectedColor]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setSelectedColor(randomColor);
  };

  const presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
    '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#c084fc', '#d946ef', '#ec4899', '#f43f5e'
  ];

  return (
    <Layout title="Color Picker" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Picker */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Pick a Color</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="w-32 h-32 mx-auto rounded-xl border-4 border-white/20 shadow-lg"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div className="mt-3 text-white font-mono text-lg">{selectedColor.toUpperCase()}</div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Color Value
                </label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full h-12 rounded-lg border border-glass cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Hex Code
                </label>
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={generateRandomColor}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Random Color
              </button>
            </div>

            {/* Preset Colors */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Preset Colors</h4>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/40 transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Color Formats */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Color Formats</h3>
            
            <div className="space-y-3">
              {Object.entries(colorFormats).map(([format, value]) => (
                <div key={format} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 font-medium capitalize">{format}</span>
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

        {/* Color Harmony */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Color Harmony</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Complementary */}
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Complementary</h4>
              <div className="flex gap-2">
                <div 
                  className="w-12 h-12 rounded-lg border border-white/20"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div 
                  className="w-12 h-12 rounded-lg border border-white/20"
                  style={{ 
                    backgroundColor: `hsl(${(hexToHsl(selectedColor)?.h || 0) + 180}, ${hexToHsl(selectedColor)?.s}%, ${hexToHsl(selectedColor)?.l}%)`
                  }}
                ></div>
              </div>
            </div>

            {/* Triadic */}
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Triadic</h4>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20"
                  style={{ 
                    backgroundColor: `hsl(${(hexToHsl(selectedColor)?.h || 0) + 120}, ${hexToHsl(selectedColor)?.s}%, ${hexToHsl(selectedColor)?.l}%)`
                  }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20"
                  style={{ 
                    backgroundColor: `hsl(${(hexToHsl(selectedColor)?.h || 0) + 240}, ${hexToHsl(selectedColor)?.s}%, ${hexToHsl(selectedColor)?.l}%)`
                  }}
                ></div>
              </div>
            </div>

            {/* Analogous */}
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Analogous</h4>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20"
                  style={{ 
                    backgroundColor: `hsl(${(hexToHsl(selectedColor)?.h || 0) - 30}, ${hexToHsl(selectedColor)?.s}%, ${hexToHsl(selectedColor)?.l}%)`
                  }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20"
                  style={{ 
                    backgroundColor: `hsl(${(hexToHsl(selectedColor)?.h || 0) + 30}, ${hexToHsl(selectedColor)?.s}%, ${hexToHsl(selectedColor)?.l}%)`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default ColorPicker;