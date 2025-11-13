import React, { useState } from 'react';
import Layout from '../../components/Layout';

const PercentageCalculator: React.FC = () => {
  const [calculations, setCalculations] = useState({
    // What is X% of Y?
    percentOf: { percent: '', number: '', result: '' },
    // X is what percent of Y?
    whatPercent: { part: '', whole: '', result: '' },
    // What number is X% of Y?
    percentageIncrease: { original: '', percentage: '', result: '' },
    // Percentage change
    percentageChange: { original: '', new: '', result: '' }
  });

  const calculatePercentOf = () => {
    const { percent, number } = calculations.percentOf;
    if (percent && number) {
      const result = (parseFloat(percent) / 100) * parseFloat(number);
      setCalculations(prev => ({
        ...prev,
        percentOf: { ...prev.percentOf, result: result.toFixed(2) }
      }));
    }
  };

  const calculateWhatPercent = () => {
    const { part, whole } = calculations.whatPercent;
    if (part && whole && parseFloat(whole) !== 0) {
      const result = (parseFloat(part) / parseFloat(whole)) * 100;
      setCalculations(prev => ({
        ...prev,
        whatPercent: { ...prev.whatPercent, result: result.toFixed(2) }
      }));
    }
  };

  const calculatePercentageIncrease = () => {
    const { original, percentage } = calculations.percentageIncrease;
    if (original && percentage) {
      const result = parseFloat(original) * (1 + parseFloat(percentage) / 100);
      setCalculations(prev => ({
        ...prev,
        percentageIncrease: { ...prev.percentageIncrease, result: result.toFixed(2) }
      }));
    }
  };

  const calculatePercentageChange = () => {
    const { original, new: newValue } = calculations.percentageChange;
    if (original && newValue && parseFloat(original) !== 0) {
      const result = ((parseFloat(newValue) - parseFloat(original)) / parseFloat(original)) * 100;
      setCalculations(prev => ({
        ...prev,
        percentageChange: { ...prev.percentageChange, result: result.toFixed(2) }
      }));
    }
  };

  const clearAll = () => {
    setCalculations({
      percentOf: { percent: '', number: '', result: '' },
      whatPercent: { part: '', whole: '', result: '' },
      percentageIncrease: { original: '', percentage: '', result: '' },
      percentageChange: { original: '', new: '', result: '' }
    });
  };

  return (
    <Layout title="Percentage Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What is X% of Y? */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">What is X% of Y?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-white/70">What is</span>
                <input
                  type="number"
                  value={calculations.percentOf.percent}
                  onChange={(e) => setCalculations(prev => ({
                    ...prev,
                    percentOf: { ...prev.percentOf, percent: e.target.value }
                  }))}
                  placeholder="25"
                  className="w-20 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <span className="text-white/70">% of</span>
                <input
                  type="number"
                  value={calculations.percentOf.number}
                  onChange={(e) => setCalculations(prev => ({
                    ...prev,
                    percentOf: { ...prev.percentOf, number: e.target.value }
                  }))}
                  placeholder="200"
                  className="w-24 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <span className="text-white/70">?</span>
              </div>
              <button
                onClick={calculatePercentOf}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Calculate
              </button>
              {calculations.percentOf.result && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">{calculations.percentOf.result}</div>
                </div>
              )}
            </div>
          </div>

          {/* X is what percent of Y? */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">X is what percent of Y?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={calculations.whatPercent.part}
                  onChange={(e) => setCalculations(prev => ({
                    ...prev,
                    whatPercent: { ...prev.whatPercent, part: e.target.value }
                  }))}
                  placeholder="50"
                  className="w-20 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <span className="text-white/70">is what % of</span>
                <input
                  type="number"
                  value={calculations.whatPercent.whole}
                  onChange={(e) => setCalculations(prev => ({
                    ...prev,
                    whatPercent: { ...prev.whatPercent, whole: e.target.value }
                  }))}
                  placeholder="200"
                  className="w-24 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <span className="text-white/70">?</span>
              </div>
              <button
                onClick={calculateWhatPercent}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Calculate
              </button>
              {calculations.whatPercent.result && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">{calculations.whatPercent.result}%</div>
                </div>
              )}
            </div>
          </div>

          {/* Percentage Increase/Decrease */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Increase/Decrease by %</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={calculations.percentageIncrease.original}
                  onChange={(e) => setCalculations(prev => ({
                    ...prev,
                    percentageIncrease: { ...prev.percentageIncrease, original: e.target.value }
                  }))}
                  placeholder="100"
                  className="w-24 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <span className="text-white/70">±</span>
                <input
                  type="number"
                  value={calculations.percentageIncrease.percentage}
                  onChange={(e) => setCalculations(prev => ({
                    ...prev,
                    percentageIncrease: { ...prev.percentageIncrease, percentage: e.target.value }
                  }))}
                  placeholder="20"
                  className="w-20 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <span className="text-white/70">%</span>
              </div>
              <button
                onClick={calculatePercentageIncrease}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Calculate
              </button>
              {calculations.percentageIncrease.result && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">{calculations.percentageIncrease.result}</div>
                </div>
              )}
            </div>
          </div>

          {/* Percentage Change */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Percentage Change</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/70 w-16">From:</span>
                  <input
                    type="number"
                    value={calculations.percentageChange.original}
                    onChange={(e) => setCalculations(prev => ({
                      ...prev,
                      percentageChange: { ...prev.percentageChange, original: e.target.value }
                    }))}
                    placeholder="100"
                    className="flex-1 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/70 w-16">To:</span>
                  <input
                    type="number"
                    value={calculations.percentageChange.new}
                    onChange={(e) => setCalculations(prev => ({
                      ...prev,
                      percentageChange: { ...prev.percentageChange, new: e.target.value }
                    }))}
                    placeholder="120"
                    className="flex-1 p-2 backdrop-blur-md bg-black/20 border border-glass rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
              </div>
              <button
                onClick={calculatePercentageChange}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Calculate
              </button>
              {calculations.percentageChange.result && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">
                    {parseFloat(calculations.percentageChange.result) >= 0 ? '+' : ''}{calculations.percentageChange.result}%
                  </div>
                  <div className="text-white/70 text-sm">
                    {parseFloat(calculations.percentageChange.result) >= 0 ? 'Increase' : 'Decrease'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PercentageCalculator;