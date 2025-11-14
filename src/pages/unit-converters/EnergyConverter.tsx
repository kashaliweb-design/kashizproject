import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const EnergyConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('joule');
  const [toUnit, setToUnit] = useState('calorie');
  const [result, setResult] = useState('');

  const units = {
    // SI Units
    joule: { name: 'Joule', factor: 1, category: 'SI' },
    kilojoule: { name: 'Kilojoule', factor: 1000, category: 'SI' },
    megajoule: { name: 'Megajoule', factor: 1000000, category: 'SI' },
    
    // Calories
    calorie: { name: 'Calorie (cal)', factor: 4.184, category: 'Calories' },
    kilocalorie: { name: 'Kilocalorie (kcal)', factor: 4184, category: 'Calories' },
    
    // Electrical
    wattHour: { name: 'Watt Hour', factor: 3600, category: 'Electrical' },
    kilowattHour: { name: 'Kilowatt Hour', factor: 3600000, category: 'Electrical' },
    
    // Imperial
    btu: { name: 'British Thermal Unit', factor: 1055.06, category: 'Imperial' },
    footPound: { name: 'Foot-Pound', factor: 1.35582, category: 'Imperial' },
    
    // Other
    erg: { name: 'Erg', factor: 1e-7, category: 'CGS' },
    electronVolt: { name: 'Electron Volt', factor: 1.602e-19, category: 'Atomic' },
    therm: { name: 'Therm', factor: 105505600, category: 'Gas' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to joules first, then to target unit
      const joules = inputValue * fromFactor;
      const converted = joules / toFactor;
      
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

  const commonEnergies = [
    { name: 'Lightning Bolt', joules: 5000000000, description: 'Energy in a lightning strike' },
    { name: 'Car Battery', joules: 1800000, description: '12V car battery capacity' },
    { name: 'AA Battery', joules: 9360, description: 'Alkaline AA battery' },
    { name: 'Human Daily Intake', joules: 8368000, description: '2000 kcal diet' },
    { name: 'Gasoline (1 liter)', joules: 34200000, description: 'Energy content of gasoline' },
    { name: 'TNT (1 kg)', joules: 4600000, description: 'Explosive energy' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Energy Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Energy Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter energy value"
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

          {/* Common Energies */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common Energy Values</h3>
            
            <div className="space-y-3">
              {commonEnergies.map((energy, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{energy.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('joule');
                        setValue(energy.joules.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{energy.description}</div>
                  <div className="text-white/60 text-xs">
                    {energy.joules.toLocaleString()} J = {(energy.joules / 4184).toFixed(0)} kcal = {(energy.joules / 3600000).toFixed(2)} kWh
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Energy Equivalents */}
        {result && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Energy Equivalents</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(units).map(([key, unit]) => {
                const fromFactor = units[fromUnit as keyof typeof units].factor;
                const joulesValue = parseFloat(value) * fromFactor;
                const convertedValue = joulesValue / unit.factor;
                
                return (
                  <div key={key} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {convertedValue.toExponential(2)}
                    </div>
                    <div className="text-white/70 text-xs">{unit.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Energy Facts */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Energy Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Food Energy</div>
              <div className="text-white/70 text-sm">
                <div>• 1 kcal = 4,184 J</div>
                <div>• Average daily intake: 2000 kcal</div>
                <div>• 1 gram fat = 9 kcal</div>
                <div>• 1 gram carbs = 4 kcal</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Electrical Energy</div>
              <div className="text-white/70 text-sm">
                <div>• 1 kWh = 3.6 MJ</div>
                <div>• Average home: 30 kWh/day</div>
                <div>• LED bulb: 10W = 36 kJ/hour</div>
                <div>• Electric car: 20 kWh/100km</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Fuel Energy</div>
              <div className="text-white/70 text-sm">
                <div>• Gasoline: 34.2 MJ/L</div>
                <div>• Natural gas: 55.5 MJ/kg</div>
                <div>• Coal: 24 MJ/kg</div>
                <div>• Wood: 15 MJ/kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default EnergyConverter;