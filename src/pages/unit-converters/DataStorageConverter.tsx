import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const DataStorageConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('gigabyte');
  const [toUnit, setToUnit] = useState('megabyte');
  const [result, setResult] = useState('');

  const units = {
    // Binary (Base 2)
    bit: { name: 'Bit', factor: 1, category: 'Binary' },
    byte: { name: 'Byte', factor: 8, category: 'Binary' },
    kilobyte: { name: 'Kilobyte (KB)', factor: 8192, category: 'Binary' },
    megabyte: { name: 'Megabyte (MB)', factor: 8388608, category: 'Binary' },
    gigabyte: { name: 'Gigabyte (GB)', factor: 8589934592, category: 'Binary' },
    terabyte: { name: 'Terabyte (TB)', factor: 8796093022208, category: 'Binary' },
    petabyte: { name: 'Petabyte (PB)', factor: 9007199254740992, category: 'Binary' },
    
    // Decimal (Base 10)
    kilobyteDecimal: { name: 'Kilobyte (1000 bytes)', factor: 8000, category: 'Decimal' },
    megabyteDecimal: { name: 'Megabyte (1000 KB)', factor: 8000000, category: 'Decimal' },
    gigabyteDecimal: { name: 'Gigabyte (1000 MB)', factor: 8000000000, category: 'Decimal' },
    terabyteDecimal: { name: 'Terabyte (1000 GB)', factor: 8000000000000, category: 'Decimal' },
    
    // Legacy
    floppy: { name: 'Floppy Disk (1.44 MB)', factor: 12058624, category: 'Legacy' },
    cd: { name: 'CD (700 MB)', factor: 5872025600, category: 'Legacy' },
    dvd: { name: 'DVD (4.7 GB)', factor: 40265318400, category: 'Legacy' },
    bluray: { name: 'Blu-ray (25 GB)', factor: 214748364800, category: 'Legacy' }
  };

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const inputValue = parseFloat(value);
      const fromFactor = units[fromUnit as keyof typeof units].factor;
      const toFactor = units[toUnit as keyof typeof units].factor;
      
      // Convert to bits first, then to target unit
      const bits = inputValue * fromFactor;
      const converted = bits / toFactor;
      
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

  const commonSizes = [
    { name: 'Text Message', bytes: 160, description: 'SMS character limit' },
    { name: 'Email (text)', bytes: 2048, description: 'Plain text email' },
    { name: 'Photo (JPEG)', bytes: 2097152, description: 'High quality photo' },
    { name: 'Song (MP3)', bytes: 4194304, description: '3-minute song' },
    { name: 'HD Movie', bytes: 4294967296, description: '2-hour 1080p movie' },
    { name: '4K Movie', bytes: 21474836480, description: '2-hour 4K movie' }
  ];

  const groupedUnits = Object.entries(units).reduce((acc, [key, unit]) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push({ key, ...unit });
    return acc;
  }, {} as Record<string, Array<{ key: string; name: string; factor: number; category: string }>>);

  return (
    <Layout title="Data Storage Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Data Storage Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter storage value"
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

          {/* Common File Sizes */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Common File Sizes</h3>
            
            <div className="space-y-3">
              {commonSizes.map((size, index) => (
                <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{size.name}</span>
                    <button
                      onClick={() => {
                        setFromUnit('byte');
                        setValue(size.bytes.toString());
                      }}
                      className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                    >
                      Use
                    </button>
                  </div>
                  <div className="text-white/70 text-sm">{size.description}</div>
                  <div className="text-white/60 text-xs">
                    {size.bytes < 1024 
                      ? `${size.bytes} bytes`
                      : size.bytes < 1048576
                        ? `${(size.bytes / 1024).toFixed(1)} KB`
                        : size.bytes < 1073741824
                          ? `${(size.bytes / 1048576).toFixed(1)} MB`
                          : `${(size.bytes / 1073741824).toFixed(1)} GB`
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Storage Unit Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Binary System (Base 2)</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 KB =</div>
                  <div className="text-white/60">1,024 bytes (2¹⁰)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 MB =</div>
                  <div className="text-white/60">1,024 KB (2²⁰ bytes)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 GB =</div>
                  <div className="text-white/60">1,024 MB (2³⁰ bytes)</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Decimal System (Base 10)</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 KB =</div>
                  <div className="text-white/60">1,000 bytes (10³)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 MB =</div>
                  <div className="text-white/60">1,000 KB (10⁶ bytes)</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">1 GB =</div>
                  <div className="text-white/60">1,000 MB (10⁹ bytes)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Devices */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Storage Device Capacities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Historical</div>
              <div className="text-white/70 text-sm">
                <div>• Floppy Disk: 1.44 MB</div>
                <div>• CD: 700 MB</div>
                <div>• DVD: 4.7 GB</div>
                <div>• Blu-ray: 25 GB</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Modern</div>
              <div className="text-white/70 text-sm">
                <div>• USB Flash: 32-256 GB</div>
                <div>• SSD: 256 GB - 4 TB</div>
                <div>• HDD: 1-20 TB</div>
                <div>• microSD: 32 GB - 1 TB</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Cloud Storage</div>
              <div className="text-white/70 text-sm">
                <div>• Google Drive: 15 GB free</div>
                <div>• Dropbox: 2 GB free</div>
                <div>• iCloud: 5 GB free</div>
                <div>• OneDrive: 5 GB free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataStorageConverter;