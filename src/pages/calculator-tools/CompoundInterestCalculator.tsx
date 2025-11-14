import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // Monthly by default
  const [results, setResults] = useState<any>(null);

  const frequencies = [
    { value: '1', label: 'Annually', description: 'Once per year' },
    { value: '2', label: 'Semi-annually', description: 'Twice per year' },
    { value: '4', label: 'Quarterly', description: '4 times per year' },
    { value: '12', label: 'Monthly', description: '12 times per year' },
    { value: '52', label: 'Weekly', description: '52 times per year' },
    { value: '365', label: 'Daily', description: '365 times per year' }
  ];

  useEffect(() => {
    if (principal && rate && time) {
      calculateCompoundInterest();
    }
  }, [principal, rate, time, compoundFrequency]);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);
    
    if (P <= 0 || r < 0 || t <= 0 || n <= 0) return;

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const amount = P * Math.pow(1 + r / n, n * t);
    const compoundInterest = amount - P;
    
    // Simple Interest for comparison: SI = P * r * t
    const simpleInterest = P * r * t;
    const simpleAmount = P + simpleInterest;
    
    // Additional benefit from compounding
    const additionalEarnings = compoundInterest - simpleInterest;
    
    // Year-wise breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(t, 10); year++) {
      const yearAmount = P * Math.pow(1 + r / n, n * year);
      const yearInterest = yearAmount - P;
      yearlyBreakdown.push({
        year,
        amount: yearAmount,
        interest: yearInterest,
        growth: year === 1 ? 0 : yearAmount - (P * Math.pow(1 + r / n, n * (year - 1)))
      });
    }

    setResults({
      principal: P,
      finalAmount: amount,
      compoundInterest,
      simpleInterest,
      simpleAmount,
      additionalEarnings,
      yearlyBreakdown,
      effectiveRate: ((amount / P) ** (1 / t) - 1) * 100
    });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundFrequency('12');
    setResults(null);
  };

  return (
    <Layout title="Compound Interest Calculator" showBackButton>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Investment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Principal Amount ($)
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                  step="100"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="7.5"
                  step="0.1"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="10"
                  step="0.5"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Compounding Frequency
                </label>
                <div className="space-y-2">
                  {frequencies.map((freq) => (
                    <label key={freq.value} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value={freq.value}
                        checked={compoundFrequency === freq.value}
                        onChange={(e) => setCompoundFrequency(e.target.value)}
                        className="text-cyan-500"
                      />
                      <div>
                        <div className="text-white/90 text-sm font-medium">{freq.label}</div>
                        <div className="text-white/60 text-xs">{freq.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Investment Results</h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${results.finalAmount.toFixed(2)}
                  </div>
                  <div className="text-white/70">Final Amount</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      ${results.principal.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Principal</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">
                      ${results.compoundInterest.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Compound Interest</div>
                  </div>
                </div>

                {/* Compound vs Simple Interest Comparison */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Compound vs Simple Interest</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Compound Interest:</span>
                      <span className="text-green-400 font-bold">${results.compoundInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Simple Interest:</span>
                      <span className="text-white">${results.simpleInterest.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between items-center">
                      <span className="text-white font-medium">Additional Earnings:</span>
                      <span className="text-cyan-400 font-bold">${results.additionalEarnings.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {results.effectiveRate.toFixed(2)}%
                    </div>
                    <div className="text-white/70">Effective Annual Rate</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {((results.finalAmount / results.principal - 1) * 100).toFixed(1)}%
                    </div>
                    <div className="text-white/70">Total Return</div>
                  </div>
                </div>

                {/* Growth Visualization */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Growth Comparison</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/70">
                      <span>Principal</span>
                      <span>Compound Interest</span>
                    </div>
                    <div className="flex h-4 rounded-lg overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-600"
                        style={{ width: `${(results.principal / results.finalAmount) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600"
                        style={{ width: `${(results.compoundInterest / results.finalAmount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-400">
                        {((results.principal / results.finalAmount) * 100).toFixed(1)}%
                      </span>
                      <span className="text-green-400">
                        {((results.compoundInterest / results.finalAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter investment details to calculate compound interest
              </div>
            )}
          </div>
        </div>

        {/* Year-wise Growth */}
        {results && results.yearlyBreakdown && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Year-wise Growth</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass">
                    <th className="text-left text-white/70 p-2">Year</th>
                    <th className="text-right text-white/70 p-2">Amount</th>
                    <th className="text-right text-white/70 p-2">Total Interest</th>
                    <th className="text-right text-white/70 p-2">Annual Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((year: any, index: number) => (
                    <tr key={index} className="border-b border-glass/30">
                      <td className="text-white p-2">{year.year}</td>
                      <td className="text-right text-white p-2">${year.amount.toFixed(2)}</td>
                      <td className="text-right text-green-400 p-2">${year.interest.toFixed(2)}</td>
                      <td className="text-right text-blue-400 p-2">
                        {year.year === 1 ? '-' : `$${year.growth.toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Investment Scenarios */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Different Time Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[5, 10, 15, 20].map((years) => {
                const P = parseFloat(principal);
                const r = parseFloat(rate) / 100;
                const n = parseFloat(compoundFrequency);
                const amount = P * Math.pow(1 + r / n, n * years);
                const interest = amount - P;
                
                return (
                  <div key={years} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="text-white font-bold">{years} Years</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Final Amount:</span>
                        <span className="text-white">${amount.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Interest Earned:</span>
                        <span className="text-green-400">${interest.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Growth:</span>
                        <span className="text-blue-400">{((amount / P - 1) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

        <PageContent />
    </Layout>
  );
};

export default CompoundInterestCalculator;