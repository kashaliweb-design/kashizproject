import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const LengthConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState('');

  const units = {
    // Metric
    kilometer: { name: 'Kilometer', factor: 1000, category: 'Metric' },
    meter: { name: 'Meter', factor: 1, category: 'Metric' },
    centimeter: { name: 'Centimeter', factor: 0.01, category: 'Metric' },
    millimeter: { name: 'Millimeter', factor: 0.001, category: 'Metric' },
    
    // Imperial
    mile: { name: 'Mile', factor: 1609.344, category: 'Imperial' },
    yard: { name: 'Yard', factor: 0.9144, category: 'Imperial' },
    feet: { name: 'Feet', factor: 0.3048, category: 'Imperial' },
    inch: { name: 'Inch', factor: 0.0254, category: 'Imperial' },
    
    // Nautical
    nauticalMile: { name: 'Nautical Mile', factor: 1852, category: 'Nautical' },
    
    // Other
    lightYear: { name: 'Light Year', factor: 9.461e15, category: 'Astronomical' },
    astronomicalUnit: { name: 'Astronomical Unit', factor: 1.496e11, category: 'Astronomical' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to meters first, then to target unit
      const meters = inputValue * fromFactor;
      const converted = meters / toFactor;
      
      setResult(converted.toExponential(6));
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

  const commonConversions = [
    { from: 'meter', to: 'feet', label: '1 meter = 3.28084 feet' },
    { from: 'kilometer', to: 'mile', label: '1 km = 0.621371 miles' },
    { from: 'inch', to: 'centimeter', label: '1 inch = 2.54 cm' },
    { from: 'yard', to: 'meter', label: '1 yard = 0.9144 meters' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Length Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Length Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter length value"
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
                    <div className="text-2xl font-bold text-white mb-2">{result}</div>
                    <div className="text-white/70">
                      {value} {units[fromUnit as keyof typeof units].name} = {result} {units[toUnit as keyof typeof units].name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Common Conversions */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Conversions</h3>
            
            <div className="space-y-3">
              {commonConversions.map((conversion, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">{conversion.label}</span>
                    <button
                      onClick={() => {
                        setFromUnit(conversion.from);
                        setToUnit(conversion.to);
                        setValue('1');
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Quick Reference</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>1 meter</span>
                  <span>100 centimeters</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>1 kilometer</span>
                  <span>1000 meters</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>1 foot</span>
                  <span>12 inches</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>1 yard</span>
                  <span>3 feet</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>1 mile</span>
                  <span>5280 feet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default LengthConverter;