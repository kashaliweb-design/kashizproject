import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const SpeedConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [toUnit, setToUnit] = useState('mph');
  const [result, setResult] = useState('');

  const units = {
    // Common
    kmh: { name: 'Kilometers per Hour', factor: 1, category: 'Metric' },
    mph: { name: 'Miles per Hour', factor: 1.609344, category: 'Imperial' },
    ms: { name: 'Meters per Second', factor: 3.6, category: 'Metric' },
    fps: { name: 'Feet per Second', factor: 1.097, category: 'Imperial' },
    
    // Nautical
    knots: { name: 'Knots', factor: 1.852, category: 'Nautical' },
    
    // Scientific
    mach: { name: 'Mach (Speed of Sound)', factor: 1234.8, category: 'Scientific' },
    lightSpeed: { name: 'Speed of Light', factor: 1.079e12, category: 'Scientific' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to km/h first, then to target unit
      const kmh = inputValue * fromFactor;
      const converted = kmh / toFactor;
      
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

  const commonSpeeds = [
    { name: 'Walking Speed', kmh: 5, description: 'Average human walking' },
    { name: 'Cycling Speed', kmh: 20, description: 'Casual bicycle riding' },
    { name: 'City Speed Limit', kmh: 50, description: 'Urban driving limit' },
    { name: 'Highway Speed', kmh: 120, description: 'Highway speed limit' },
    { name: 'Cheetah', kmh: 112, description: 'Fastest land animal' },
    { name: 'Commercial Jet', kmh: 900, description: 'Cruising altitude' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Speed Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Speed Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter speed value"
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

          {/* Common Speeds */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Speeds</h3>
            
            <div className="space-y-3">
              {commonSpeeds.map((speed, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{speed.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('kmh');
                        setValue(speed.kmh.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{speed.description}</div>
                  <div className="text-white/60 text-xs">
                    {speed.kmh} km/h = {(speed.kmh / 1.609344).toFixed(1)} mph = {(speed.kmh / 3.6).toFixed(1)} m/s
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Speed Comparison Chart */}
        {result && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Speed in Different Units</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(units).map(([key, unit]) => {
                const fromFactor = units[fromUnit as keyof typeof units].factor;
                const kmhValue = parseFloat(value) * fromFactor;
                const convertedValue = kmhValue / unit.factor;
                
                return (
                  <div key={key} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {convertedValue.toFixed(key === 'lightSpeed' || key === 'mach' ? 8 : 2)}
                    </div>
                    <div className="text-white/70 text-xs">{unit.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Speed Records */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Speed Records</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Land Speed Record</div>
              <div className="text-white/70 text-sm">
                <div>1,227.985 km/h</div>
                <div className="text-cyan-400">(763.035 mph)</div>
                <div className="text-white/50 text-xs">ThrustSSC, 1997</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Sound Speed</div>
              <div className="text-white/70 text-sm">
                <div>1,234.8 km/h</div>
                <div className="text-cyan-400">(767.269 mph)</div>
                <div className="text-white/50 text-xs">At sea level, 20°C</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Light Speed</div>
              <div className="text-white/70 text-sm">
                <div>1.08 × 10¹² km/h</div>
                <div className="text-cyan-400">(6.7 × 10⁸ mph)</div>
                <div className="text-white/50 text-xs">In vacuum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default SpeedConverter;