import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (billAmount) {
      calculateTip();
    }
  }, [billAmount, tipPercent, numberOfPeople, customTip]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = customTip ? parseFloat(customTip) : parseFloat(tipPercent);
    const people = parseInt(numberOfPeople) || 1;
    
    if (bill <= 0 || tip < 0 || people <= 0) return;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonBill = bill / people;
    const perPersonTip = tipAmount / people;
    const perPersonTotal = totalAmount / people;

    setResults({
      tipAmount,
      totalAmount,
      perPersonBill,
      perPersonTip,
      perPersonTotal,
      tipPercent: tip
    });
  };

  const reset = () => {
    setBillAmount('');
    setTipPercent('15');
    setNumberOfPeople('1');
    setCustomTip('');
    setResults(null);
  };

  const commonTips = [10, 15, 18, 20, 25];

  return (
    <Layout 
      title="Tip Calculator" 
      showBackButton
      seoTitle="Tip Calculator – Calculate Tips Instantly with Toolistaan"
      seoDescription="Free online tip calculator to calculate tips, split bills, and add tax. Perfect for restaurants, delivery, taxis & more. Fast, accurate & easy to use!"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Bill Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Bill Amount ($)
                </label>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="50.00"
                  step="0.01"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Tip Percentage
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {commonTips.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => {
                        setTipPercent(tip.toString());
                        setCustomTip('');
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        tipPercent === tip.toString() && !customTip
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                          : 'backdrop-blur-md bg-black/20 border border-glass text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(e.target.value);
                    setTipPercent('');
                  }}
                  placeholder="Custom tip %"
                  step="0.1"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Number of People
                </label>
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  placeholder="1"
                  min="1"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
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

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Tip Calculation</h3>
            
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
                      ${parseFloat(billAmount).toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Bill Amount</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">
                      ${results.tipAmount.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Tip ({results.tipPercent}%)</div>
                  </div>
                </div>

                {parseInt(numberOfPeople) > 1 && (
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3 text-center">Per Person</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          ${results.perPersonBill.toFixed(2)}
                        </div>
                        <div className="text-white/70 text-xs">Bill</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">
                          ${results.perPersonTip.toFixed(2)}
                        </div>
                        <div className="text-white/70 text-xs">Tip</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">
                          ${results.perPersonTotal.toFixed(2)}
                        </div>
                        <div className="text-white/70 text-xs">Total</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Bill Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal:</span>
                      <span>${parseFloat(billAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-blue-400">
                      <span>Tip ({results.tipPercent}%):</span>
                      <span>${results.tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-white font-medium">
                      <span>Total:</span>
                      <span>${results.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter bill amount to calculate tip
              </div>
            )}
          </div>
        </div>

        {/* Tip Guide */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tipping Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Restaurant</div>
              <div className="text-white/70 text-sm">
                <div>• Excellent service: 20-25%</div>
                <div>• Good service: 15-20%</div>
                <div>• Average service: 10-15%</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Delivery</div>
              <div className="text-white/70 text-sm">
                <div>• Food delivery: 15-20%</div>
                <div>• Minimum: $3-5</div>
                <div>• Bad weather: +$2-3</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Bar/Drinks</div>
              <div className="text-white/70 text-sm">
                <div>• Per drink: $1-2</div>
                <div>• Tab: 15-20%</div>
                <div>• Cocktails: 18-25%</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">Other Services</div>
              <div className="text-white/70 text-sm">
                <div>• Taxi/Uber: 10-15%</div>
                <div>• Hair salon: 15-20%</div>
                <div>• Hotel staff: $2-5</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Calculations */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Tip Amounts</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[10, 15, 18, 20, 25].map((tipRate) => {
                const tipAmount = (parseFloat(billAmount) * tipRate) / 100;
                const total = parseFloat(billAmount) + tipAmount;
                
                return (
                  <div key={tipRate} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{tipRate}%</div>
                    <div className="text-blue-400 text-sm">${tipAmount.toFixed(2)}</div>
                    <div className="text-white/70 text-xs">Total: ${total.toFixed(2)}</div>
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

export default TipCalculator;