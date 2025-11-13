import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const AreaConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('squareMeter');
  const [toUnit, setToUnit] = useState('squareFeet');
  const [result, setResult] = useState('');

  const units = {
    // Metric
    squareMillimeter: { name: 'Square Millimeter', factor: 1e-6, category: 'Metric' },
    squareCentimeter: { name: 'Square Centimeter', factor: 1e-4, category: 'Metric' },
    squareMeter: { name: 'Square Meter', factor: 1, category: 'Metric' },
    squareKilometer: { name: 'Square Kilometer', factor: 1e6, category: 'Metric' },
    hectare: { name: 'Hectare', factor: 10000, category: 'Metric' },
    
    // Imperial
    squareInch: { name: 'Square Inch', factor: 0.00064516, category: 'Imperial' },
    squareFeet: { name: 'Square Feet', factor: 0.092903, category: 'Imperial' },
    squareYard: { name: 'Square Yard', factor: 0.836127, category: 'Imperial' },
    squareMile: { name: 'Square Mile', factor: 2589988.11, category: 'Imperial' },
    acre: { name: 'Acre', factor: 4046.86, category: 'Imperial' },
    
    // Other
    are: { name: 'Are', factor: 100, category: 'Other' },
    barn: { name: 'Barn', factor: 1e-28, category: 'Scientific' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to square meters first, then to target unit
      const squareMeters = inputValue * fromFactor;
      const converted = squareMeters / toFactor;
      
      setResult(converted.toString());
    } else {
      setResult('');
    }
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const clearAll = () => {
    setValue('');
    setResult('');
  };

  const commonAreas = [
    { name: 'Standard Room', sqm: 20, description: 'Average bedroom size' },
    { name: 'Tennis Court', sqm: 261, description: 'Official tennis court' },
    { name: 'Football Field', sqm: 5351, description: 'American football field' },
    { name: 'Soccer Field', sqm: 7140, description: 'FIFA regulation size' },
    { name: 'Basketball Court', sqm: 420, description: 'NBA court size' },
    { name: 'Average House', sqm: 150, description: 'Typical family home' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Area Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Area Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter area value"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">From</label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {Object.entries(groupedUnits).map(([category, unitList]) => (
                      <optgroup key={category} label={category}>
                        {unitList.map(unit => (
                          <option key={unit.key} value={unit.key}>{unit.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">To</label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {Object.entries(groupedUnits).map(([category, unitList]) => (
                      <optgroup key={category} label={category}>
                        {unitList.map(unit => (
                          <option key={unit.key} value={unit.key}>{unit.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={swapUnits}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Swap Units
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear
                </button>
              </div>

              {result && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {parseFloat(result).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                    <div className="text-white/70">
                      {value} {units[fromUnit as keyof typeof units].name} = {parseFloat(result).toLocaleString(undefined, { maximumFractionDigits: 6 })} {units[toUnit as keyof typeof units].name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Common Areas */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Areas</h3>
            
            <div className="space-y-3">
              {commonAreas.map((area, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{area.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('squareMeter');
                        setValue(area.sqm.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{area.description}</div>
                  <div className="text-white/60 text-xs">
                    {area.sqm} m² = {(area.sqm * 10.764).toFixed(0)} ft² = {(area.sqm / 4047).toFixed(3)} acres
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area Comparison */}
        {result && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Area in Different Units</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(units).slice(2, 10).map(([key, unit]) => {
                const fromFactor = units[fromUnit as keyof typeof units].factor;
                const sqmValue = parseFloat(value) * fromFactor;
                const convertedValue = sqmValue / unit.factor;
                
                return (
                  <div key={key} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {convertedValue.toFixed(convertedValue < 1 ? 6 : 2)}
                    </div>
                    <div className="text-white/70 text-xs">{unit.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Area Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Area Unit Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 m² =</div>
                  <div className="text-white/60">10,000 cm² = 1,000,000 mm²</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 hectare =</div>
                  <div className="text-white/60">10,000 m² = 2.47 acres</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 km² =</div>
                  <div className="text-white/60">100 hectares = 247 acres</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Imperial System</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 ft² =</div>
                  <div className="text-white/60">144 in² = 0.092903 m²</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 acre =</div>
                  <div className="text-white/60">43,560 ft² = 4,047 m²</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 mi² =</div>
                  <div className="text-white/60">640 acres = 2.59 km²</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AreaConverter;