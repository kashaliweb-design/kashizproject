import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const convertFromCelsius = (c: number) => {
    const f = (c * 9/5) + 32;
    const k = c + 273.15;
    setFahrenheit(f.toFixed(2));
    setKelvin(k.toFixed(2));
  };

  const convertFromFahrenheit = (f: number) => {
    const c = (f - 32) * 5/9;
    const k = c + 273.15;
    setCelsius(c.toFixed(2));
    setKelvin(k.toFixed(2));
  };

  const convertFromKelvin = (k: number) => {
    const c = k - 273.15;
    const f = (c * 9/5) + 32;
    setCelsius(c.toFixed(2));
    setFahrenheit(f.toFixed(2));
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    if (value && !isNaN(parseFloat(value))) {
      convertFromCelsius(parseFloat(value));
    } else {
      setFahrenheit('');
      setKelvin('');
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    if (value && !isNaN(parseFloat(value))) {
      convertFromFahrenheit(parseFloat(value));
    } else {
      setCelsius('');
      setKelvin('');
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    if (value && !isNaN(parseFloat(value))) {
      convertFromKelvin(parseFloat(value));
    } else {
      setCelsius('');
      setFahrenheit('');
    }
  };

  const clearAll = () => {
    setCelsius('');
    setFahrenheit('');
    setKelvin('');
  };

  const temperatureRanges = [
    { name: 'Water Freezing Point', celsius: 0, description: 'Water turns to ice' },
    { name: 'Room Temperature', celsius: 20, description: 'Comfortable indoor temperature' },
    { name: 'Human Body Temperature', celsius: 37, description: 'Normal body temperature' },
    { name: 'Water Boiling Point', celsius: 100, description: 'Water turns to steam' }
  ];

  return (
    <Layout title="Temperature Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Celsius */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="inline-block w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mr-2"></span>
              Celsius (°C)
            </h3>
            <input
              type="number"
              value={celsius}
              onChange={(e) => handleCelsiusChange(e.target.value)}
              placeholder="Enter temperature in Celsius"
              className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <p className="text-white/60 text-sm mt-2">
              Water freezes at 0°C, boils at 100°C
            </p>
          </div>

          {/* Fahrenheit */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="inline-block w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mr-2"></span>
              Fahrenheit (°F)
            </h3>
            <input
              type="number"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder="Enter temperature in Fahrenheit"
              className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            <p className="text-white/60 text-sm mt-2">
              Water freezes at 32°F, boils at 212°F
            </p>
          </div>

          {/* Kelvin */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="inline-block w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-2"></span>
              Kelvin (K)
            </h3>
            <input
              type="number"
              value={kelvin}
              onChange={(e) => handleKelvinChange(e.target.value)}
              placeholder="Enter temperature in Kelvin"
              className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <p className="text-white/60 text-sm mt-2">
              Absolute zero is 0K (-273.15°C)
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Common Temperature References */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Common Temperature References</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {temperatureRanges.map((temp, index) => (
              <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{temp.name}</h4>
                  <button
                    onClick={() => handleCelsiusChange(temp.celsius.toString())}
                    className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                  >
                    Convert
                  </button>
                </div>
                <div className="text-white/70 text-sm space-y-1">
                  <div>{temp.celsius}°C = {((temp.celsius * 9/5) + 32).toFixed(1)}°F = {(temp.celsius + 273.15).toFixed(1)}K</div>
                  <div className="text-white/50">{temp.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemperatureConverter;