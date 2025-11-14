import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const PowerConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('watt');
  const [toUnit, setToUnit] = useState('horsepower');
  const [result, setResult] = useState('');

  const units = {
    // SI Units
    watt: { name: 'Watt', factor: 1, category: 'SI' },
    kilowatt: { name: 'Kilowatt', factor: 1000, category: 'SI' },
    megawatt: { name: 'Megawatt', factor: 1000000, category: 'SI' },
    gigawatt: { name: 'Gigawatt', factor: 1000000000, category: 'SI' },
    
    // Horsepower
    horsepower: { name: 'Horsepower (Mechanical)', factor: 745.7, category: 'Horsepower' },
    horsepowerMetric: { name: 'Horsepower (Metric)', factor: 735.5, category: 'Horsepower' },
    horsepowerElectric: { name: 'Horsepower (Electric)', factor: 746, category: 'Horsepower' },
    
    // Imperial
    footPoundPerSecond: { name: 'Foot-Pound per Second', factor: 1.35582, category: 'Imperial' },
    btuPerHour: { name: 'BTU per Hour', factor: 0.293071, category: 'Imperial' },
    btuPerSecond: { name: 'BTU per Second', factor: 1055.06, category: 'Imperial' },
    
    // Other
    calorie: { name: 'Calorie per Second', factor: 4.184, category: 'Thermal' },
    kilocalorie: { name: 'Kilocalorie per Hour', factor: 1.163, category: 'Thermal' },
    
    // Electrical
    voltAmpere: { name: 'Volt-Ampere', factor: 1, category: 'Electrical' },
    kilovoltAmpere: { name: 'Kilovolt-Ampere', factor: 1000, category: 'Electrical' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to watts first, then to target unit
      const watts = inputValue * fromFactor;
      const converted = watts / toFactor;
      
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

  const commonPowers = [
    { name: 'LED Bulb', watts: 10, description: 'Energy-efficient lighting' },
    { name: 'Laptop Computer', watts: 65, description: 'Average laptop consumption' },
    { name: 'Microwave Oven', watts: 1000, description: 'Kitchen appliance' },
    { name: 'Hair Dryer', watts: 1500, description: 'Personal care device' },
    { name: 'Electric Kettle', watts: 2000, description: 'Water heating' },
    { name: 'Car Engine', watts: 150000, description: 'Average car (200 HP)' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Power Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Power Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter power value"
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

          {/* Common Power Ratings */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Power Ratings</h3>
            
            <div className="space-y-3">
              {commonPowers.map((power, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{power.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('watt');
                        setValue(power.watts.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{power.description}</div>
                  <div className="text-white/60 text-xs">
                    {power.watts.toLocaleString()} W = {(power.watts / 745.7).toFixed(2)} HP = {(power.watts / 1000).toFixed(2)} kW
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Power Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Power Unit Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Common Conversions</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 HP =</div>
                  <div className="text-white/60">745.7 W = 0.746 kW</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 kW =</div>
                  <div className="text-white/60">1,000 W = 1.34 HP</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 MW =</div>
                  <div className="text-white/60">1,000 kW = 1,341 HP</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Power Generation</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Wind Turbine</div>
                  <div className="text-white/60">1.5-3 MW typical</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Solar Panel</div>
                  <div className="text-white/60">300-400 W per panel</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Nuclear Plant</div>
                  <div className="text-white/60">1,000-1,600 MW</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Human Power</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Resting</div>
                  <div className="text-white/60">80-100 W</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Walking</div>
                  <div className="text-white/60">200-300 W</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Cycling</div>
                  <div className="text-white/60">100-400 W</div>
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

export default PowerConverter;