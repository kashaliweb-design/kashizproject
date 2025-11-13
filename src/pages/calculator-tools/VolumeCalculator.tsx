import React, { useState } from 'react';
import Layout from '../../components/Layout';

const VolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState('cube');
  const [dimensions, setDimensions] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<number | null>(null);

  const shapes = [
    {
      id: 'cube',
      name: 'Cube',
      fields: [
        { key: 'side', label: 'Side Length', placeholder: '5' }
      ],
      formula: 'Volume = Side³',
      calculate: (dims: any) => Math.pow(parseFloat(dims.side || 0), 3)
    },
    {
      id: 'rectangular',
      name: 'Rectangular Prism',
      fields: [
        { key: 'length', label: 'Length', placeholder: '10' },
        { key: 'width', label: 'Width', placeholder: '6' },
        { key: 'height', label: 'Height', placeholder: '4' }
      ],
      formula: 'Volume = Length × Width × Height',
      calculate: (dims: any) => parseFloat(dims.length || 0) * parseFloat(dims.width || 0) * parseFloat(dims.height || 0)
    },
    {
      id: 'sphere',
      name: 'Sphere',
      fields: [
        { key: 'radius', label: 'Radius', placeholder: '8' }
      ],
      formula: 'Volume = (4/3) × π × Radius³',
      calculate: (dims: any) => (4/3) * Math.PI * Math.pow(parseFloat(dims.radius || 0), 3)
    },
    {
      id: 'cylinder',
      name: 'Cylinder',
      fields: [
        { key: 'radius', label: 'Radius', placeholder: '5' },
        { key: 'height', label: 'Height', placeholder: '12' }
      ],
      formula: 'Volume = π × Radius² × Height',
      calculate: (dims: any) => Math.PI * Math.pow(parseFloat(dims.radius || 0), 2) * parseFloat(dims.height || 0)
    },
    {
      id: 'cone',
      name: 'Cone',
      fields: [
        { key: 'radius', label: 'Radius', placeholder: '6' },
        { key: 'height', label: 'Height', placeholder: '9' }
      ],
      formula: 'Volume = (1/3) × π × Radius² × Height',
      calculate: (dims: any) => (1/3) * Math.PI * Math.pow(parseFloat(dims.radius || 0), 2) * parseFloat(dims.height || 0)
    },
    {
      id: 'pyramid',
      name: 'Pyramid',
      fields: [
        { key: 'baseArea', label: 'Base Area', placeholder: '25' },
        { key: 'height', label: 'Height', placeholder: '8' }
      ],
      formula: 'Volume = (1/3) × Base Area × Height',
      calculate: (dims: any) => (1/3) * parseFloat(dims.baseArea || 0) * parseFloat(dims.height || 0)
    },
    {
      id: 'triangularPrism',
      name: 'Triangular Prism',
      fields: [
        { key: 'base', label: 'Triangle Base', placeholder: '8' },
        { key: 'triangleHeight', label: 'Triangle Height', placeholder: '6' },
        { key: 'prismHeight', label: 'Prism Height', placeholder: '10' }
      ],
      formula: 'Volume = (1/2) × Base × Triangle Height × Prism Height',
      calculate: (dims: any) => 0.5 * parseFloat(dims.base || 0) * parseFloat(dims.triangleHeight || 0) * parseFloat(dims.prismHeight || 0)
    },
    {
      id: 'ellipsoid',
      name: 'Ellipsoid',
      fields: [
        { key: 'a', label: 'Semi-axis a', placeholder: '4' },
        { key: 'b', label: 'Semi-axis b', placeholder: '3' },
        { key: 'c', label: 'Semi-axis c', placeholder: '2' }
      ],
      formula: 'Volume = (4/3) × π × a × b × c',
      calculate: (dims: any) => (4/3) * Math.PI * parseFloat(dims.a || 0) * parseFloat(dims.b || 0) * parseFloat(dims.c || 0)
    }
  ];

  const currentShape = shapes.find(s => s.id === shape);

  const handleDimensionChange = (key: string, value: string) => {
    const newDimensions = { ...dimensions, [key]: value };
    setDimensions(newDimensions);
    
    if (currentShape) {
      const volume = currentShape.calculate(newDimensions);
      setResult(isNaN(volume) ? null : volume);
    }
  };

  const handleShapeChange = (newShape: string) => {
    setShape(newShape);
    setDimensions({});
    setResult(null);
  };

  const reset = () => {
    setDimensions({});
    setResult(null);
  };

  return (
    <Layout title="Volume Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shape Selection & Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Select 3D Shape</h3>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              {shapes.map((shapeOption) => (
                <button
                  key={shapeOption.id}
                  onClick={() => handleShapeChange(shapeOption.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    shape === shapeOption.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                      : 'backdrop-blur-md bg-black/20 border border-glass text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {shapeOption.name}
                </button>
              ))}
            </div>

            {currentShape && (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="text-white/70 text-sm mb-1">Formula:</div>
                  <div className="text-white font-mono text-sm">{currentShape.formula}</div>
                </div>

                {currentShape.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={dimensions[field.key] || ''}
                      onChange={(e) => handleDimensionChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      step="0.01"
                      className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                ))}

                <button
                  onClick={reset}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Volume Result</h3>
            
            {result !== null ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {result.toFixed(2)}
                  </div>
                  <div className="text-white/70">Cubic Units</div>
                </div>

                <div className="space-y-3">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Shape:</div>
                    <div className="text-white font-medium">{currentShape?.name}</div>
                  </div>

                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Dimensions:</div>
                    <div className="space-y-1">
                      {currentShape?.fields.map((field) => (
                        <div key={field.key} className="flex justify-between text-white text-sm">
                          <span>{field.label}:</span>
                          <span>{dimensions[field.key] || '0'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Different Units:</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-white">
                        <span>Cubic Meters:</span>
                        <span>{result.toFixed(2)} m³</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Cubic Feet:</span>
                        <span>{(result * 35.314).toFixed(2)} ft³</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Liters:</span>
                        <span>{(result * 1000).toFixed(2)} L</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Gallons (US):</span>
                        <span>{(result * 264.172).toFixed(2)} gal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter dimensions to calculate volume
              </div>
            )}
          </div>
        </div>

        {/* Volume Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Volume Formulas Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shapes.map((shapeRef) => (
              <div key={shapeRef.id} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="text-white font-medium mb-1">{shapeRef.name}</div>
                <div className="text-white/70 text-sm font-mono">{shapeRef.formula}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Volumes */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Common Volume Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Swimming Pool</div>
              <div className="text-white/70 text-sm">
                <div>25m × 12m × 2m</div>
                <div className="text-green-400">600 m³ (158,503 gal)</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Water Tank</div>
              <div className="text-white/70 text-sm">
                <div>Cylinder: r=2m, h=3m</div>
                <div className="text-green-400">37.7 m³ (9,963 gal)</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Room</div>
              <div className="text-white/70 text-sm">
                <div>4m × 3m × 2.5m</div>
                <div className="text-green-400">30 m³ (1,060 ft³)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolumeCalculator;