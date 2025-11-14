import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const GradientGenerator: React.FC = () => {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [direction, setDirection] = useState('to right');
  const [gradientType, setGradientType] = useState('linear');

  const directions = [
    { value: 'to right', label: 'Left to Right' },
    { value: 'to left', label: 'Right to Left' },
    { value: 'to bottom', label: 'Top to Bottom' },
    { value: 'to top', label: 'Bottom to Top' },
    { value: 'to bottom right', label: 'Top-Left to Bottom-Right' },
    { value: 'to bottom left', label: 'Top-Right to Bottom-Left' },
    { value: 'to top right', label: 'Bottom-Left to Top-Right' },
    { value: 'to top left', label: 'Bottom-Right to Top-Left' }
  ];

  const generateGradient = () => {
    if (gradientType === 'linear') {
      return `linear-gradient(${direction}, ${color1}, ${color2})`;
    } else {
      return `radial-gradient(circle, ${color1}, ${color2})`;
    }
  };

  const generateCSS = () => {
    const gradient = generateGradient();
    return `background: ${gradient};`;
  };

  const generateTailwind = () => {
    const directionMap: { [key: string]: string } = {
      'to right': 'bg-gradient-to-r',
      'to left': 'bg-gradient-to-l',
      'to bottom': 'bg-gradient-to-b',
      'to top': 'bg-gradient-to-t',
      'to bottom right': 'bg-gradient-to-br',
      'to bottom left': 'bg-gradient-to-bl',
      'to top right': 'bg-gradient-to-tr',
      'to top left': 'bg-gradient-to-tl'
    };
    
    return `${directionMap[direction] || 'bg-gradient-to-r'} from-[${color1}] to-[${color2}]`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const randomizeColors = () => {
    const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomColor1);
    setColor2(randomColor2);
  };

  const presetGradients = [
    { name: 'Ocean Blue', colors: ['#667eea', '#764ba2'] },
    { name: 'Sunset', colors: ['#ff7e5f', '#feb47b'] },
    { name: 'Purple Rain', colors: ['#667eea', '#764ba2'] },
    { name: 'Green Tea', colors: ['#00b09b', '#96c93d'] },
    { name: 'Pink Dream', colors: ['#ff9a9e', '#fecfef'] },
    { name: 'Fire', colors: ['#ff416c', '#ff4b2b'] }
  ];

  return (
    <Layout title="Gradient Generator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Gradient Preview */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Gradient Preview</h3>
          <div 
            className="w-full h-48 rounded-xl border border-white/20"
            style={{ background: generateGradient() }}
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Gradient Controls</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Gradient Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGradientType('linear')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      gradientType === 'linear'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                        : 'backdrop-blur-md bg-black/20 border border-glass text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setGradientType('radial')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      gradientType === 'radial'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                        : 'backdrop-blur-md bg-black/20 border border-glass text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>

              {gradientType === 'linear' && (
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Direction
                  </label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {directions.map(dir => (
                      <option key={dir.value} value={dir.value}>{dir.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Color 1
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-glass cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Color 2
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-glass cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={randomizeColors}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Random Colors
              </button>
            </div>

            {/* Preset Gradients */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Preset Gradients</h4>
              <div className="grid grid-cols-2 gap-2">
                {presetGradients.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setColor1(preset.colors[0]);
                      setColor2(preset.colors[1]);
                    }}
                    className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Generated Code</h3>
            
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 font-medium">CSS</span>
                  <button
                    onClick={() => copyToClipboard(generateCSS())}
                    className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-white font-mono text-sm break-all whitespace-pre-wrap">
                  {generateCSS()}
                </pre>
              </div>

              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 font-medium">Tailwind CSS</span>
                  <button
                    onClick={() => copyToClipboard(generateTailwind())}
                    className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-white font-mono text-sm break-all whitespace-pre-wrap">
                  {generateTailwind()}
                </pre>
              </div>

              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 font-medium">Full CSS Property</span>
                  <button
                    onClick={() => copyToClipboard(generateGradient())}
                    className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-white font-mono text-sm break-all whitespace-pre-wrap">
                  {generateGradient()}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Variations */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Gradient Variations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {directions.slice(0, 8).map((dir, index) => (
              <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div 
                  className="w-full h-16 rounded-lg mb-2"
                  style={{ background: `linear-gradient(${dir.value}, ${color1}, ${color2})` }}
                ></div>
                <div className="text-white/70 text-xs text-center">{dir.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default GradientGenerator;