import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const WeightConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kilogram');
  const [toUnit, setToUnit] = useState('pound');
  const [result, setResult] = useState('');

  const units = {
    // Metric
    kilogram: { name: 'Kilogram', factor: 1, category: 'Metric' },
    gram: { name: 'Gram', factor: 0.001, category: 'Metric' },
    milligram: { name: 'Milligram', factor: 0.000001, category: 'Metric' },
    tonne: { name: 'Tonne (Metric Ton)', factor: 1000, category: 'Metric' },
    
    // Imperial
    pound: { name: 'Pound', factor: 0.453592, category: 'Imperial' },
    ounce: { name: 'Ounce', factor: 0.0283495, category: 'Imperial' },
    stone: { name: 'Stone', factor: 6.35029, category: 'Imperial' },
    ton: { name: 'Ton (Imperial)', factor: 1016.05, category: 'Imperial' },
    
    // Troy
    troyOunce: { name: 'Troy Ounce', factor: 0.0311035, category: 'Troy' },
    troyPound: { name: 'Troy Pound', factor: 0.373242, category: 'Troy' },
    
    // Other
    carat: { name: 'Carat', factor: 0.0002, category: 'Jewelry' },
    grain: { name: 'Grain', factor: 0.0000647989, category: 'Other' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to kilograms first, then to target unit
      const kilograms = inputValue * fromFactor;
      const converted = kilograms / toFactor;
      
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

  const commonConversions = [
    { from: 'kilogram', to: 'pound', label: '1 kg = 2.20462 lbs' },
    { from: 'pound', to: 'kilogram', label: '1 lb = 0.453592 kg' },
    { from: 'ounce', to: 'gram', label: '1 oz = 28.3495 g' },
    { from: 'stone', to: 'kilogram', label: '1 stone = 6.35029 kg' },
    { from: 'tonne', to: 'pound', label: '1 tonne = 2204.62 lbs' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Weight Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Weight Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter weight value"
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
              <h4 className="text-white/70 font-medium mb-3">Weight Categories</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Metric System</div>
                  <div className="text-white/60">1 kg = 1000 g = 1,000,000 mg</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Imperial System</div>
                  <div className="text-white/60">1 lb = 16 oz, 1 stone = 14 lbs</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Precious Metals</div>
                  <div className="text-white/60">1 troy oz = 31.1035 g</div>
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

export default WeightConverter;