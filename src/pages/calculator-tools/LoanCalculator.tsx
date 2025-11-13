import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [termUnit, setTermUnit] = useState('years'); // years or months
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      calculateLoan();
    }
  }, [loanAmount, interestRate, loanTerm, termUnit]);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termInMonths = termUnit === 'years' ? parseFloat(loanTerm) * 12 : parseFloat(loanTerm);
    
    if (principal <= 0 || annualRate < 0 || termInMonths <= 0) return;

    const monthlyRate = annualRate / 12;
    
    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = principal / termInMonths;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) / 
                     (Math.pow(1 + monthlyRate, termInMonths) - 1);
    }

    const totalPayment = monthlyPayment * termInMonths;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule (first 12 months)
    const schedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= Math.min(12, termInMonths); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      termInMonths,
      schedule
    });
  };

  const reset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
  };

  return (
    <Layout title="Loan Calculator" showBackButton>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Loan Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Loan Amount ($)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="250000"
                  step="1000"
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
                  placeholder="4.5"
                  step="0.01"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Loan Term
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="30"
                    className="flex-1 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <select
                    value={termUnit}
                    onChange={(e) => setTermUnit(e.target.value)}
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
            <h3 className="text-xl font-semibold text-white mb-4">Loan Summary</h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${results.monthlyPayment.toFixed(2)}
                  </div>
                  <div className="text-white/70">Monthly Payment</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      ${results.totalPayment.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Total Payment</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-red-400">
                      ${results.totalInterest.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Total Interest</div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Payment Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Principal Amount:</span>
                      <span>${parseFloat(loanAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>Total Interest:</span>
                      <span>${results.totalInterest.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-white font-medium">
                      <span>Total Amount:</span>
                      <span>${results.totalPayment.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{results.termInMonths}</div>
                    <div className="text-white/70">Total Payments</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {((results.totalInterest / parseFloat(loanAmount)) * 100).toFixed(1)}%
                    </div>
                    <div className="text-white/70">Interest Ratio</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter loan details to see payment calculations
              </div>
            )}
          </div>
        </div>

        {/* Amortization Schedule */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Amortization Schedule (First 12 Months)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass">
                    <th className="text-left text-white/70 p-2">Month</th>
                    <th className="text-right text-white/70 p-2">Payment</th>
                    <th className="text-right text-white/70 p-2">Principal</th>
                    <th className="text-right text-white/70 p-2">Interest</th>
                    <th className="text-right text-white/70 p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((payment: any, index: number) => (
                    <tr key={index} className="border-b border-glass/30">
                      <td className="text-white p-2">{payment.month}</td>
                      <td className="text-right text-white p-2">${payment.payment.toFixed(2)}</td>
                      <td className="text-right text-green-400 p-2">${payment.principal.toFixed(2)}</td>
                      <td className="text-right text-red-400 p-2">${payment.interest.toFixed(2)}</td>
                      <td className="text-right text-white p-2">${payment.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Loan Comparison */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Compare Different Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[15, 20, 30].map((years) => {
                const termMonths = years * 12;
                const monthlyRate = parseFloat(interestRate) / 100 / 12;
                const principal = parseFloat(loanAmount);
                
                let monthlyPayment;
                if (monthlyRate === 0) {
                  monthlyPayment = principal / termMonths;
                } else {
                  monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                                 (Math.pow(1 + monthlyRate, termMonths) - 1);
                }
                
                const totalPayment = monthlyPayment * termMonths;
                const totalInterest = totalPayment - principal;
                
                return (
                  <div key={years} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="text-white font-bold">{years} Year Loan</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Monthly:</span>
                        <span className="text-white">${monthlyPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Interest:</span>
                        <span className="text-red-400">${totalInterest.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Payment:</span>
                        <span className="text-white">${totalPayment.toFixed(2)}</span>
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

export default LoanCalculator;