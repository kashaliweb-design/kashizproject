import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [savings, setSavings] = useState('');

  useEffect(() => {
    if (originalPrice && discountPercent) {
      const original = parseFloat(originalPrice);
      const percent = parseFloat(discountPercent);
      
      if (!isNaN(original) && !isNaN(percent)) {
        const discountAmt = (original * percent) / 100;
        const final = original - discountAmt;
        
        setDiscountAmount(discountAmt.toFixed(2));
        setFinalPrice(final.toFixed(2));
        setSavings(discountAmt.toFixed(2));
      }
    } else if (originalPrice && discountAmount) {
      const original = parseFloat(originalPrice);
      const discount = parseFloat(discountAmount);
      
      if (!isNaN(original) && !isNaN(discount)) {
        const percent = (discount / original) * 100;
        const final = original - discount;
        
        setDiscountPercent(percent.toFixed(2));
        setFinalPrice(final.toFixed(2));
        setSavings(discount.toFixed(2));
      }
    }
  }, [originalPrice, discountPercent, discountAmount]);

  const reset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setDiscountAmount('');
    setFinalPrice('');
    setSavings('');
  };

  const commonDiscounts = [
    { label: '10% Off', percent: 10 },
    { label: '15% Off', percent: 15 },
    { label: '20% Off', percent: 20 },
    { label: '25% Off', percent: 25 },
    { label: '30% Off', percent: 30 },
    { label: '50% Off', percent: 50 }
  ];

  return (
    <Layout title="Discount Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Calculate Discount</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="100.00"
                  step="0.01"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => {
                      setDiscountPercent(e.target.value);
                      setDiscountAmount(''); // Clear amount when percent changes
                    }}
                    placeholder="20"
                    step="0.01"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Discount Amount ($)
                  </label>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => {
                      setDiscountAmount(e.target.value);
                      setDiscountPercent(''); // Clear percent when amount changes
                    }}
                    placeholder="20.00"
                    step="0.01"
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Reset
              </button>
            </div>

            {/* Quick Discount Buttons */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Quick Discounts</h4>
              <div className="grid grid-cols-3 gap-2">
                {commonDiscounts.map((discount, index) => (
                  <button
                    key={index}
                    onClick={() => setDiscountPercent(discount.percent.toString())}
                    className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                  >
                    {discount.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Discount Results</h3>
            
            {originalPrice && (discountPercent || discountAmount) ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${finalPrice}
                  </div>
                  <div className="text-white/70">Final Price</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">${originalPrice}</div>
                    <div className="text-white/70 text-sm">Original Price</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-red-400">${savings}</div>
                    <div className="text-white/70 text-sm">You Save</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      {discountPercent || ((parseFloat(discountAmount) / parseFloat(originalPrice)) * 100).toFixed(2)}%
                    </div>
                    <div className="text-white/70 text-sm">Discount Rate</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">
                      ${discountAmount || ((parseFloat(originalPrice) * parseFloat(discountPercent)) / 100).toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">Discount Amount</div>
                  </div>
                </div>

                {/* Savings Breakdown */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Savings Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Original Price:</span>
                      <span>${originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>Discount ({discountPercent || ((parseFloat(discountAmount) / parseFloat(originalPrice)) * 100).toFixed(2)}%):</span>
                      <span>-${savings}</span>
                    </div>
                    <div className="border-t border-glass pt-2 flex justify-between text-white font-medium">
                      <span>Final Price:</span>
                      <span>${finalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                Enter original price and discount to see results
              </div>
            )}
          </div>
        </div>

        {/* Multiple Items Calculator */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Multiple Items Calculator</h3>
          {originalPrice && discountPercent && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 5, 10].map((quantity) => {
                const totalOriginal = parseFloat(originalPrice) * quantity;
                const totalDiscount = (totalOriginal * parseFloat(discountPercent)) / 100;
                const totalFinal = totalOriginal - totalDiscount;
                
                return (
                  <div key={quantity} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-medium mb-1">{quantity} Item{quantity > 1 ? 's' : ''}</div>
                    <div className="text-green-400 font-bold">${totalFinal.toFixed(2)}</div>
                    <div className="text-white/60 text-sm">Save ${totalDiscount.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default DiscountCalculator;