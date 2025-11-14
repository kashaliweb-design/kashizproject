import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const PressureConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('pascal');
  const [toUnit, setToUnit] = useState('psi');
  const [result, setResult] = useState('');

  const units = {
    // SI Units
    pascal: { name: 'Pascal', factor: 1, category: 'SI' },
    kilopascal: { name: 'Kilopascal', factor: 1000, category: 'SI' },
    megapascal: { name: 'Megapascal', factor: 1000000, category: 'SI' },
    
    // Common
    bar: { name: 'Bar', factor: 100000, category: 'Common' },
    millibar: { name: 'Millibar', factor: 100, category: 'Common' },
    atmosphere: { name: 'Atmosphere (atm)', factor: 101325, category: 'Common' },
    psi: { name: 'Pounds per Square Inch', factor: 6894.76, category: 'Imperial' },
    
    // Mercury
    mmHg: { name: 'Millimeters of Mercury', factor: 133.322, category: 'Mercury' },
    inHg: { name: 'Inches of Mercury', factor: 3386.39, category: 'Mercury' },
    torr: { name: 'Torr', factor: 133.322, category: 'Mercury' },
    
    // Water
    mmH2O: { name: 'Millimeters of Water', factor: 9.80665, category: 'Water' },
    inH2O: { name: 'Inches of Water', factor: 249.089, category: 'Water' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to pascals first, then to target unit
      const pascals = inputValue * fromFactor;
      const converted = pascals / toFactor;
      
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

  const commonPressures = [
    { name: 'Sea Level Pressure', pascals: 101325, description: 'Standard atmospheric pressure' },
    { name: 'Car Tire Pressure', pascals: 220000, description: 'Typical car tire (32 PSI)' },
    { name: 'Blood Pressure (Systolic)', pascals: 16000, description: 'Normal 120 mmHg' },
    { name: 'Deep Sea (1000m)', pascals: 10000000, description: 'Pressure at 1km depth' },
    { name: 'Vacuum', pascals: 0.001, description: 'High vacuum' },
    { name: 'Bicycle Tire', pascals: 800000, description: 'Road bike tire pressure' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Pressure Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Pressure Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter pressure value"
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

          {/* Common Pressures */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Pressures</h3>
            
            <div className="space-y-3">
              {commonPressures.map((pressure, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{pressure.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('pascal');
                        setValue(pressure.pascals.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{pressure.description}</div>
                  <div className="text-white/60 text-xs">
                    {pressure.pascals.toLocaleString()} Pa = {(pressure.pascals / 6894.76).toFixed(1)} PSI = {(pressure.pascals / 100000).toFixed(2)} bar
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pressure Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Pressure Unit Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Common Conversions</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 atm =</div>
                  <div className="text-white/60">101,325 Pa = 14.7 PSI = 760 mmHg</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 bar =</div>
                  <div className="text-white/60">100,000 Pa = 14.5 PSI</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 PSI =</div>
                  <div className="text-white/60">6,895 Pa = 51.7 mmHg</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Applications</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Weather</div>
                  <div className="text-white/60">Measured in millibars or inHg</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Medical</div>
                  <div className="text-white/60">Blood pressure in mmHg</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Automotive</div>
                  <div className="text-white/60">Tire pressure in PSI or bar</div>
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

export default PressureConverter;