import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [calculationType, setCalculationType] = useState('exclusive'); // exclusive or inclusive
  const [results, setResults] = useState<any>(null);

  const gstRates = [
    { rate: '0', label: '0% - Essential items' },
    { rate: '5', label: '5% - Basic necessities' },
    { rate: '12', label: '12% - Standard items' },
    { rate: '18', label: '18% - Most goods & services' },
    { rate: '28', label: '28% - Luxury items' }
  ];

  useEffect(() => {
    if (amount && gstRate) {
      calculateGST();
    }
  }, [amount, gstRate, calculationType]);

  const calculateGST = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate);
    
    if (baseAmount <= 0 || rate < 0) return;

    let netAmount, gstAmount, totalAmount;

    if (calculationType === 'exclusive') {
      // Amount is without GST
      netAmount = baseAmount;
      gstAmount = (netAmount * rate) / 100;
      totalAmount = netAmount + gstAmount;
    } else {
      // Amount is with GST
      totalAmount = baseAmount;
      netAmount = totalAmount / (1 + rate / 100);
      gstAmount = totalAmount - netAmount;
    }

    // Calculate CGST and SGST (for intra-state) or IGST (for inter-state)
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const igst = gstAmount;

    setResults({
      netAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
      igst,
      rate
    });
  };

  const reset = () => {
    setAmount('');
    setGstRate('18');
    setCalculationType('exclusive');
    setResults(null);
  };

  return (
    <Layout title="GST Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">GST Calculation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10000"
                  step="0.01"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Calculation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalculationType('exclusive')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      calculationType === 'exclusive'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                        : 'backdrop-blur-md bg-black/20 border border-glass text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Exclusive
                  </button>
                  <button
                    onClick={() => setCalculationType('inclusive')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      calculationType === 'inclusive'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                        : 'backdrop-blur-md bg-black/20 border border-glass text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Inclusive
                  </button>
                </div>
                <p className="text-white/50 text-xs mt-1">
                  {calculationType === 'exclusive' 
                    ? 'Amount is without GST (GST will be added)'
                    : 'Amount includes GST (GST will be calculated from total)'
                  }
                </p>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  GST Rate
                </label>
                <div className="space-y-2">
                  {gstRates.map((rate) => (
                    <label key={rate.rate} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="gstRate"
                        value={rate.rate}
                        checked={gstRate === rate.rate}
                        onChange={(e) => setGstRate(e.target.value)}
                        className="text-cyan-500"
                      />
                      <div>
                        <div className="text-white/90 text-sm font-medium">{rate.rate}%</div>
                        <div className="text-white/60 text-xs">{rate.label}</div>
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
            <h3 className="text-xl font-semibold text-white mb-4">GST Breakdown</h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ₹{results.totalAmount.toFixed(2)}
                  </div>
                  <div className="text-white/70">Total Amount (Including GST)</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      ₹{results.netAmount.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Net Amount</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">
                      ₹{results.gstAmount.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">GST ({results.rate}%)</div>
                  </div>
                </div>

                {/* GST Components */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">GST Components</h4>
                  
                  <div className="space-y-3">
                    <div className="border border-glass rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-2">For Intra-State Supply (Within Same State)</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-white font-bold">₹{results.cgst.toFixed(2)}</div>
                          <div className="text-white/70 text-xs">CGST ({results.rate/2}%)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold">₹{results.sgst.toFixed(2)}</div>
                          <div className="text-white/70 text-xs">SGST ({results.rate/2}%)</div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-glass rounded-lg p-3">
                      <div className="text-white/70 text-sm mb-2">For Inter-State Supply (Different States)</div>
                      <div className="text-center">
                        <div className="text-white font-bold">₹{results.igst.toFixed(2)}</div>
                        <div className="text-white/70 text-xs">IGST ({results.rate}%)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Calculation Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Base Amount:</span>
                      <span>₹{results.netAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-blue-400">
                      <span>GST ({results.rate}%):</span>
                      <span>₹{results.gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-white font-medium">
                      <span>Total Amount:</span>
                      <span>₹{results.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter amount to calculate GST
              </div>
            )}
          </div>
        </div>

        {/* GST Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">GST Rate Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">0% GST</div>
              <div className="text-white/70 text-sm">
                <div>• Fresh fruits & vegetables</div>
                <div>• Milk & dairy products</div>
                <div>• Cereals & grains</div>
                <div>• Educational services</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">5% GST</div>
              <div className="text-white/70 text-sm">
                <div>• Packaged food items</div>
                <div>• Coal & lignite</div>
                <div>• Medicines</div>
                <div>• Transport services</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">12% GST</div>
              <div className="text-white/70 text-sm">
                <div>• Computers & laptops</div>
                <div>• Mobile phones</div>
                <div>• Processed food</div>
                <div>• Business class air travel</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">18% GST</div>
              <div className="text-white/70 text-sm">
                <div>• Most goods & services</div>
                <div>• Restaurant services</div>
                <div>• Financial services</div>
                <div>• Telecom services</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">28% GST</div>
              <div className="text-white/70 text-sm">
                <div>• Luxury cars</div>
                <div>• Tobacco products</div>
                <div>• Aerated drinks</div>
                <div>• High-end appliances</div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
              <div className="text-white font-medium mb-2">GST Components</div>
              <div className="text-white/70 text-sm">
                <div>• CGST: Central GST</div>
                <div>• SGST: State GST</div>
                <div>• IGST: Integrated GST</div>
                <div>• UTGST: UT GST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Items Calculator */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bulk Calculation</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 5, 10, 25, 100].map((quantity) => {
                const totalNet = results.netAmount * quantity;
                const totalGST = results.gstAmount * quantity;
                const totalAmount = results.totalAmount * quantity;
                
                return (
                  <div key={quantity} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-medium mb-1">{quantity} Item{quantity > 1 ? 's' : ''}</div>
                    <div className="text-green-400 font-bold">₹{totalAmount.toFixed(2)}</div>
                    <div className="text-white/60 text-sm">GST: ₹{totalGST.toFixed(2)}</div>
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

export default GSTCalculator;