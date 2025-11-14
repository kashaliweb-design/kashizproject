import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const TimeConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('hours');
  const [toUnit, setToUnit] = useState('minutes');
  const [result, setResult] = useState('');

  const units = {
    // Basic Time Units
    nanoseconds: { name: 'Nanoseconds', factor: 1e-9, category: 'Precise' },
    microseconds: { name: 'Microseconds', factor: 1e-6, category: 'Precise' },
    milliseconds: { name: 'Milliseconds', factor: 0.001, category: 'Precise' },
    seconds: { name: 'Seconds', factor: 1, category: 'Basic' },
    minutes: { name: 'Minutes', factor: 60, category: 'Basic' },
    hours: { name: 'Hours', factor: 3600, category: 'Basic' },
    days: { name: 'Days', factor: 86400, category: 'Basic' },
    weeks: { name: 'Weeks', factor: 604800, category: 'Basic' },
    months: { name: 'Months (30 days)', factor: 2592000, category: 'Calendar' },
    years: { name: 'Years (365 days)', factor: 31536000, category: 'Calendar' },
    decades: { name: 'Decades', factor: 315360000, category: 'Calendar' },
    centuries: { name: 'Centuries', factor: 3153600000, category: 'Calendar' },
    millennia: { name: 'Millennia', factor: 31536000000, category: 'Calendar' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to seconds first, then to target unit
      const seconds = inputValue * fromFactor;
      const converted = seconds / toFactor;
      
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

  const commonTimes = [
    { name: 'Blink of an Eye', seconds: 0.1, description: 'Human eye blink duration' },
    { name: 'Heartbeat', seconds: 0.8, description: 'Average resting heart rate' },
    { name: 'Lightning Flash', seconds: 0.0002, description: 'Duration of lightning' },
    { name: 'Work Day', seconds: 28800, description: '8 hours of work' },
    { name: 'Average Sleep', seconds: 28800, description: '8 hours of sleep' },
    { name: 'Movie Length', seconds: 7200, description: 'Average 2-hour movie' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Time Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Time Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter time value"
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

          {/* Common Times */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Time Durations</h3>
            
            <div className="space-y-3">
              {commonTimes.map((time, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{time.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('seconds');
                        setValue(time.seconds.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{time.description}</div>
                  <div className="text-white/60 text-xs">
                    {time.seconds < 1 
                      ? `${(time.seconds * 1000).toFixed(1)} ms`
                      : time.seconds < 60 
                        ? `${time.seconds} seconds`
                        : time.seconds < 3600
                          ? `${(time.seconds / 60).toFixed(1)} minutes`
                          : `${(time.seconds / 3600).toFixed(1)} hours`
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Breakdown */}
        {result && parseFloat(value) > 0 && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Time Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(units).slice(3, 11).map(([key, unit]) => {
                const fromFactor = units[fromUnit as keyof typeof units].factor;
                const seconds = parseFloat(value) * fromFactor;
                const convertedValue = seconds / unit.factor;
                
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

        {/* Time Facts */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Time Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Time Relationships</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>1 minute:</span>
                  <span>60 seconds</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>1 hour:</span>
                  <span>60 minutes</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>1 day:</span>
                  <span>24 hours</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>1 week:</span>
                  <span>7 days</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>1 year:</span>
                  <span>365.25 days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Interesting Times</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Human Lifespan</div>
                  <div className="text-white/60">~80 years = 700,800 hours</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Earth's Rotation</div>
                  <div className="text-white/60">23h 56m 4s (sidereal day)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Light to Sun</div>
                  <div className="text-white/60">8 minutes 20 seconds</div>
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

export default TimeConverter;