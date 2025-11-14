import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (height && weight) {
      let heightInMeters: number;
      let weightInKg: number;

      if (unit === 'metric') {
        heightInMeters = parseFloat(height) / 100; // cm to meters
        weightInKg = parseFloat(weight);
      } else {
        heightInMeters = parseFloat(height) * 0.0254; // inches to meters
        weightInKg = parseFloat(weight) * 0.453592; // pounds to kg
      }

      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(Math.round(bmiValue * 10) / 10);

      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    } else {
      setBmi(null);
      setCategory('');
    }
  }, [height, weight, unit]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Underweight':
        return 'from-blue-500 to-cyan-600';
      case 'Normal weight':
        return 'from-green-500 to-emerald-600';
      case 'Overweight':
        return 'from-yellow-500 to-orange-600';
      case 'Obese':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <Layout title="BMI Calculator" showBackButton>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Unit Selection */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setUnit('metric')}
            className={`px-6 py-2 rounded-lg transition-all ${
              unit === 'metric'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                : 'backdrop-blur-md bg-black/20 border border-glass text-white/70'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-6 py-2 rounded-lg transition-all ${
              unit === 'imperial'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                : 'backdrop-blur-md bg-black/20 border border-glass text-white/70'
            }`}
          >
            Imperial (in, lbs)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Enter Your Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Height ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 69'}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your BMI Result</h3>
            
            {bmi ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{bmi}</div>
                  <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${getCategoryColor(category)} text-white font-medium`}>
                    {category}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Underweight:</span>
                    <span className="text-white">Below 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Normal weight:</span>
                    <span className="text-white">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Overweight:</span>
                    <span className="text-white">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Obese:</span>
                    <span className="text-white">30.0 and above</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter your height and weight to calculate BMI
              </div>
            )}
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default BMICalculator;