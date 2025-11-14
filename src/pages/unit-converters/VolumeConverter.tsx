import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const VolumeConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('liter');
  const [toUnit, setToUnit] = useState('gallon');
  const [result, setResult] = useState('');

  const units = {
    // Metric
    milliliter: { name: 'Milliliter', factor: 0.001, category: 'Metric' },
    liter: { name: 'Liter', factor: 1, category: 'Metric' },
    cubicCentimeter: { name: 'Cubic Centimeter', factor: 0.001, category: 'Metric' },
    cubicMeter: { name: 'Cubic Meter', factor: 1000, category: 'Metric' },
    
    // Imperial Liquid
    fluidOunce: { name: 'Fluid Ounce (US)', factor: 0.0295735, category: 'Imperial Liquid' },
    cup: { name: 'Cup (US)', factor: 0.236588, category: 'Imperial Liquid' },
    pint: { name: 'Pint (US)', factor: 0.473176, category: 'Imperial Liquid' },
    quart: { name: 'Quart (US)', factor: 0.946353, category: 'Imperial Liquid' },
    gallon: { name: 'Gallon (US)', factor: 3.78541, category: 'Imperial Liquid' },
    
    // Imperial UK
    fluidOunceUK: { name: 'Fluid Ounce (UK)', factor: 0.0284131, category: 'Imperial UK' },
    pintUK: { name: 'Pint (UK)', factor: 0.568261, category: 'Imperial UK' },
    gallonUK: { name: 'Gallon (UK)', factor: 4.54609, category: 'Imperial UK' },
    
    // Cubic
    cubicInch: { name: 'Cubic Inch', factor: 0.0163871, category: 'Cubic' },
    cubicFeet: { name: 'Cubic Feet', factor: 28.3168, category: 'Cubic' },
    cubicYard: { name: 'Cubic Yard', factor: 764.555, category: 'Cubic' },
    
    // Cooking
    tablespoon: { name: 'Tablespoon', factor: 0.0147868, category: 'Cooking' },
    teaspoon: { name: 'Teaspoon', factor: 0.00492892, category: 'Cooking' },
    
    // Other
    barrel: { name: 'Barrel (Oil)', factor: 158.987, category: 'Industrial' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to liters first, then to target unit
      const liters = inputValue * fromFactor;
      const converted = liters / toFactor;
      
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

  const commonVolumes = [
    { name: 'Water Bottle', liters: 0.5, description: 'Standard water bottle' },
    { name: 'Soda Can', liters: 0.355, description: '12 fl oz can' },
    { name: 'Wine Bottle', liters: 0.75, description: 'Standard wine bottle' },
    { name: 'Milk Gallon', liters: 3.785, description: 'US gallon of milk' },
    { name: 'Car Gas Tank', liters: 60, description: 'Average car fuel tank' },
    { name: 'Swimming Pool', liters: 50000, description: 'Average home pool' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Volume Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Volume Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter volume value"
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

          {/* Common Volumes */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Volumes</h3>
            
            <div className="space-y-3">
              {commonVolumes.map((volume, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{volume.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('liter');
                        setValue(volume.liters.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{volume.description}</div>
                  <div className="text-white/60 text-xs">
                    {volume.liters} L = {(volume.liters / 3.785).toFixed(2)} gal (US) = {(volume.liters * 33.814).toFixed(1)} fl oz
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Volume Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Volume Unit Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 Liter =</div>
                  <div className="text-white/60">1,000 mL = 1,000 cm³</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 m³ =</div>
                  <div className="text-white/60">1,000 L = 1,000,000 cm³</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">US System</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 Gallon =</div>
                  <div className="text-white/60">4 quarts = 8 pints = 16 cups</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 Cup =</div>
                  <div className="text-white/60">8 fl oz = 16 tbsp = 48 tsp</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Cooking</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 Tablespoon =</div>
                  <div className="text-white/60">3 teaspoons = 15 mL</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 Cup =</div>
                  <div className="text-white/60">240 mL = 16 tbsp</div>
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

export default VolumeConverter;