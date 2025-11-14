import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const AreaCalculator: React.FC = () => {
  const [shape, setShape] = useState('rectangle');
  const [dimensions, setDimensions] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<number | null>(null);

  const shapes = [
    {
      id: 'rectangle',
      name: 'Rectangle',
      fields: [
        { key: 'length', label: 'Length', placeholder: '10' },
        { key: 'width', label: 'Width', placeholder: '5' }
      ],
      formula: 'Area = Length × Width',
      calculate: (dims: any) => parseFloat(dims.length || 0) * parseFloat(dims.width || 0)
    },
    {
      id: 'square',
      name: 'Square',
      fields: [
        { key: 'side', label: 'Side Length', placeholder: '8' }
      ],
      formula: 'Area = Side²',
      calculate: (dims: any) => Math.pow(parseFloat(dims.side || 0), 2)
    },
    {
      id: 'circle',
      name: 'Circle',
      fields: [
        { key: 'radius', label: 'Radius', placeholder: '7' }
      ],
      formula: 'Area = π × Radius²',
      calculate: (dims: any) => Math.PI * Math.pow(parseFloat(dims.radius || 0), 2)
    },
    {
      id: 'triangle',
      name: 'Triangle',
      fields: [
        { key: 'base', label: 'Base', placeholder: '12' },
        { key: 'height', label: 'Height', placeholder: '8' }
      ],
      formula: 'Area = ½ × Base × Height',
      calculate: (dims: any) => 0.5 * parseFloat(dims.base || 0) * parseFloat(dims.height || 0)
    },
    {
      id: 'trapezoid',
      name: 'Trapezoid',
      fields: [
        { key: 'base1', label: 'Base 1', placeholder: '10' },
        { key: 'base2', label: 'Base 2', placeholder: '6' },
        { key: 'height', label: 'Height', placeholder: '4' }
      ],
      formula: 'Area = ½ × (Base1 + Base2) × Height',
      calculate: (dims: any) => 0.5 * (parseFloat(dims.base1 || 0) + parseFloat(dims.base2 || 0)) * parseFloat(dims.height || 0)
    },
    {
      id: 'parallelogram',
      name: 'Parallelogram',
      fields: [
        { key: 'base', label: 'Base', placeholder: '15' },
        { key: 'height', label: 'Height', placeholder: '6' }
      ],
      formula: 'Area = Base × Height',
      calculate: (dims: any) => parseFloat(dims.base || 0) * parseFloat(dims.height || 0)
    },
    {
      id: 'ellipse',
      name: 'Ellipse',
      fields: [
        { key: 'majorAxis', label: 'Major Axis (a)', placeholder: '10' },
        { key: 'minorAxis', label: 'Minor Axis (b)', placeholder: '6' }
      ],
      formula: 'Area = π × a × b',
      calculate: (dims: any) => Math.PI * parseFloat(dims.majorAxis || 0) * parseFloat(dims.minorAxis || 0)
    },
    {
      id: 'rhombus',
      name: 'Rhombus',
      fields: [
        { key: 'diagonal1', label: 'Diagonal 1', placeholder: '12' },
        { key: 'diagonal2', label: 'Diagonal 2', placeholder: '8' }
      ],
      formula: 'Area = ½ × d1 × d2',
      calculate: (dims: any) => 0.5 * parseFloat(dims.diagonal1 || 0) * parseFloat(dims.diagonal2 || 0)
    }
  ];

  const currentShape = shapes.find(s => s.id === shape);

  const handleDimensionChange = (key: string, value: string) => {
    const newDimensions = { ...dimensions, [key]: value };
    setDimensions(newDimensions);
    
    if (currentShape) {
      const area = currentShape.calculate(newDimensions);
      setResult(isNaN(area) ? null : area);
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
    <Layout title="Area Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shape Selection & Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Select Shape</h3>
            
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
                  <div className="text-white font-mono">{currentShape.formula}</div>
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
            <h3 className="text-xl font-semibold text-white mb-4">Area Result</h3>
            
            {result !== null ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {result.toFixed(2)}
                  </div>
                  <div className="text-white/70">Square Units</div>
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
                        <span>Square Meters:</span>
                        <span>{result.toFixed(2)} m²</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Square Feet:</span>
                        <span>{(result * 10.764).toFixed(2)} ft²</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Square Inches:</span>
                        <span>{(result * 1550).toFixed(0)} in²</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Acres:</span>
                        <span>{(result / 4047).toFixed(6)} acres</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter dimensions to calculate area
              </div>
            )}
          </div>
        </div>

        {/* Shape Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Area Formulas Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shapes.map((shapeRef) => (
              <div key={shapeRef.id} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="text-white font-medium mb-1">{shapeRef.name}</div>
                <div className="text-white/70 text-sm font-mono">{shapeRef.formula}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Areas */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Common Area Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Standard Room</div>
              <div className="text-white/70 text-sm">
                <div>12 ft × 10 ft</div>
                <div className="text-green-400">120 ft² (11.15 m²)</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Basketball Court</div>
              <div className="text-white/70 text-sm">
                <div>94 ft × 50 ft</div>
                <div className="text-green-400">4,700 ft² (436.6 m²)</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Football Field</div>
              <div className="text-white/70 text-sm">
                <div>360 ft × 160 ft</div>
                <div className="text-green-400">57,600 ft² (1.32 acres)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default AreaCalculator;