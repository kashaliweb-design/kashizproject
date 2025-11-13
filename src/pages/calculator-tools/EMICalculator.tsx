import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('years');
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (principal && interestRate && tenure) {
      calculateEMI();
    }
  }, [principal, interestRate, tenure, tenureType]);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const N = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Total months
    
    if (P <= 0 || R < 0 || N <= 0) return;

    let EMI;
    if (R === 0) {
      EMI = P / N;
    } else {
      EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    }

    const totalAmount = EMI * N;
    const totalInterest = totalAmount - P;

    // Calculate year-wise breakdown
    const yearlyBreakdown = [];
    let remainingPrincipal = P;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    const totalYears = Math.ceil(N / 12);
    
    for (let year = 1; year <= totalYears; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      const monthsInYear = year === totalYears ? N % 12 || 12 : 12;
      const startMonth = (year - 1) * 12 + 1;
      const endMonth = Math.min(startMonth + monthsInYear - 1, N);

      for (let month = startMonth; month <= endMonth; month++) {
        const interestPayment = remainingPrincipal * R;
        const principalPayment = EMI - interestPayment;
        
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        remainingPrincipal -= principalPayment;
      }

      cumulativeInterest += yearlyInterest;
      cumulativePrincipal += yearlyPrincipal;

      yearlyBreakdown.push({
        year,
        emi: EMI * monthsInYear,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, remainingPrincipal)
      });
    }

    setResults({
      emi: EMI,
      totalAmount,
      totalInterest,
      tenure: N,
      yearlyBreakdown
    });
  };

  const reset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setResults(null);
  };

  return (
    <Layout title="EMI Calculator" showBackButton>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">EMI Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="500000"
                  step="10000"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="8.5"
                  step="0.01"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Loan Tenure
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="20"
                    className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value)}
                    className="px-3 py-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
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
            <h3 className="text-xl font-semibold text-white mb-4">EMI Summary</h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ₹{results.emi.toFixed(0)}
                  </div>
                  <div className="text-white/70">Monthly EMI</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      ₹{results.totalAmount.toFixed(0)}
                    </div>
                    <div className="text-white/70 text-sm">Total Payment</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-red-400">
                      ₹{results.totalInterest.toFixed(0)}
                    </div>
                    <div className="text-white/70 text-sm">Total Interest</div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Payment Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Principal Amount:</span>
                      <span>₹{parseFloat(principal).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>Total Interest:</span>
                      <span>₹{results.totalInterest.toFixed(0)}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-white font-medium">
                      <span>Total Amount:</span>
                      <span>₹{results.totalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{results.tenure}</div>
                    <div className="text-white/70">Total Months</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {((results.totalInterest / parseFloat(principal)) * 100).toFixed(1)}%
                    </div>
                    <div className="text-white/70">Interest Ratio</div>
                  </div>
                </div>

                {/* EMI Chart Representation */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Principal vs Interest</h4>
                  <div className="flex h-4 rounded-lg overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600"
                      style={{ width: `${(parseFloat(principal) / results.totalAmount) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-600"
                      style={{ width: `${(results.totalInterest / results.totalAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-green-400">Principal ({((parseFloat(principal) / results.totalAmount) * 100).toFixed(1)}%)</span>
                    <span className="text-red-400">Interest ({((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter loan details to calculate EMI
              </div>
            )}
          </div>
        </div>

        {/* Year-wise Breakdown */}
        {results && results.yearlyBreakdown && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Year-wise Payment Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass">
                    <th className="text-left text-white/70 p-2">Year</th>
                    <th className="text-right text-white/70 p-2">EMI Paid</th>
                    <th className="text-right text-white/70 p-2">Principal</th>
                    <th className="text-right text-white/70 p-2">Interest</th>
                    <th className="text-right text-white/70 p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((year: any, index: number) => (
                    <tr key={index} className="border-b border-glass/30">
                      <td className="text-white p-2">{year.year}</td>
                      <td className="text-right text-white p-2">₹{year.emi.toFixed(0)}</td>
                      <td className="text-right text-green-400 p-2">₹{year.principal.toFixed(0)}</td>
                      <td className="text-right text-red-400 p-2">₹{year.interest.toFixed(0)}</td>
                      <td className="text-right text-white p-2">₹{year.balance.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EMI Comparison */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Compare Different Tenures</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[15, 20, 25].map((years) => {
                const N = years * 12;
                const P = parseFloat(principal);
                const R = parseFloat(interestRate) / 100 / 12;
                
                let EMI;
                if (R === 0) {
                  EMI = P / N;
                } else {
                  EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
                }
                
                const totalAmount = EMI * N;
                const totalInterest = totalAmount - P;
                
                return (
                  <div key={years} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="text-white font-bold">{years} Years</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Monthly EMI:</span>
                        <span className="text-white">₹{EMI.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Interest:</span>
                        <span className="text-red-400">₹{totalInterest.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Payment:</span>
                        <span className="text-white">₹{totalAmount.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EMICalculator;