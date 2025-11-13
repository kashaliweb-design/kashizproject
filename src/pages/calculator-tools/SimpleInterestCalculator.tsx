import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (principal && rate && time) {
      calculateSimpleInterest();
    }
  }, [principal, rate, time, timeUnit]);

  const calculateSimpleInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    let T = parseFloat(time);
    
    if (P <= 0 || R < 0 || T <= 0) return;

    // Convert time to years if needed
    if (timeUnit === 'months') {
      T = T / 12;
    } else if (timeUnit === 'days') {
      T = T / 365;
    }

    // Simple Interest Formula: SI = (P * R * T) / 100
    const simpleInterest = (P * R * T) / 100;
    const totalAmount = P + simpleInterest;
    
    // Monthly breakdown if time is more than 1 year
    const monthlyBreakdown = [];
    if (T >= 1) {
      const monthlyInterest = simpleInterest / (T * 12);
      for (let month = 1; month <= Math.min(T * 12, 24); month++) {
        const accumulatedInterest = monthlyInterest * month;
        const currentAmount = P + accumulatedInterest;
        monthlyBreakdown.push({
          month,
          interest: accumulatedInterest,
          amount: currentAmount
        });
      }
    }

    setResults({
      principal: P,
      rate: R,
      time: T,
      timeUnit,
      simpleInterest,
      totalAmount,
      monthlyInterest: simpleInterest / (T * 12),
      dailyInterest: simpleInterest / (T * 365),
      monthlyBreakdown
    });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setTimeUnit('years');
    setResults(null);
  };

  return (
    <Layout title="Simple Interest Calculator" showBackButton>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Loan/Investment Details</h3>
            
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
                  placeholder="5.5"
                  step="0.1"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Time Period
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="5"
                    step="0.1"
                    className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="px-3 py-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                    <option value="days">Days</option>
                  </select>
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
            <h3 className="text-xl font-semibold text-white mb-4">Interest Calculation</h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${results.totalAmount.toFixed(2)}
                  </div>
                  <div className="text-white/70">Total Amount</div>
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
                      ${results.simpleInterest.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Simple Interest</div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Interest Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Principal (P):</span>
                      <span>${results.principal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Rate (R):</span>
                      <span>{results.rate}% per annum</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Time (T):</span>
                      <span>{results.time} {results.time === 1 ? 'year' : 'years'}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-blue-400">
                      <span>Interest (P×R×T/100):</span>
                      <span>${results.simpleInterest.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-white font-medium">
                      <span>Total Amount:</span>
                      <span>${results.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Interest Per Period */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      ${results.monthlyInterest.toFixed(2)}
                    </div>
                    <div className="text-white/70">Monthly Interest</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      ${results.dailyInterest.toFixed(2)}
                    </div>
                    <div className="text-white/70">Daily Interest</div>
                  </div>
                </div>

                {/* Interest Growth Visualization */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Principal vs Interest</h4>
                  <div className="flex h-4 rounded-lg overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-600"
                      style={{ width: `${(results.principal / results.totalAmount) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600"
                      style={{ width: `${(results.simpleInterest / results.totalAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-blue-400">
                      Principal ({((results.principal / results.totalAmount) * 100).toFixed(1)}%)
                    </span>
                    <span className="text-green-400">
                      Interest ({((results.simpleInterest / results.totalAmount) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter loan/investment details to calculate simple interest
              </div>
            )}
          </div>
        </div>

        {/* Monthly Breakdown */}
        {results && results.monthlyBreakdown && results.monthlyBreakdown.length > 0 && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Interest Accumulation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass">
                    <th className="text-left text-white/70 p-2">Month</th>
                    <th className="text-right text-white/70 p-2">Accumulated Interest</th>
                    <th className="text-right text-white/70 p-2">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {results.monthlyBreakdown.map((month: any, index: number) => (
                    <tr key={index} className="border-b border-glass/30">
                      <td className="text-white p-2">{month.month}</td>
                      <td className="text-right text-green-400 p-2">${month.interest.toFixed(2)}</td>
                      <td className="text-right text-white p-2">${month.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comparison with Different Rates */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Interest Rate Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[3, 5, 7, 10].map((interestRate) => {
                const P = parseFloat(principal);
                const T = results.time;
                const interest = (P * interestRate * T) / 100;
                const total = P + interest;
                
                return (
                  <div key={interestRate} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="text-white font-bold">{interestRate}% Rate</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Interest:</span>
                        <span className="text-green-400">${interest.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total:</span>
                        <span className="text-white">${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Difference:</span>
                        <span className={`${interest > results.simpleInterest ? 'text-red-400' : interest < results.simpleInterest ? 'text-green-400' : 'text-white'}`}>
                          ${Math.abs(interest - results.simpleInterest).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Formula Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Simple Interest Formula</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Formula</h4>
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="text-center text-white font-mono text-lg mb-2">
                  SI = (P × R × T) / 100
                </div>
                <div className="text-center text-white font-mono text-lg">
                  A = P + SI
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Where</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>SI:</span>
                  <span>Simple Interest</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>P:</span>
                  <span>Principal Amount</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>R:</span>
                  <span>Rate of Interest (% per annum)</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>T:</span>
                  <span>Time Period (in years)</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>A:</span>
                  <span>Total Amount</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleInterestCalculator;