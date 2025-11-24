import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

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

        {/* Introduction Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Percentage Calculator — Tolistaan
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Tolistaan's <strong className="text-white">Percentage Calculator</strong> is a simple, accurate, and fast tool designed to help you find percentages in seconds. Whether you need to calculate marks, increase or decrease a value, or solve money-related percentage problems, our <strong className="text-white">Online Percentage Calculator</strong> makes everything easy with step-by-step results.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            This tool is perfect for students, teachers, investors, shoppers, and anyone who needs quick <strong className="text-white">Math Easy Solutions</strong> without doing manual calculations.
          </p>
        </div>

        {/* What Does It Do Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Does the Percentage Calculator Do?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Our <strong className="text-white">Percentage Calculator</strong> helps you solve all types of percentage problems, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Percentage Increase Calculator</strong></span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Percentage Change</strong></span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Add or Subtract a Percentage</strong></span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm">Increase and Decrease Calculations</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Percentage Calculator Money</strong></span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Marks Percentage Calculator</strong></span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3 md:col-span-2">
              <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">How to calculate percentage of marks</strong></span>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            Just enter your values and get instant, accurate results.
          </p>
        </div>

        {/* Marks Calculator Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Marks Percentage Calculator — Calculate Your Grades Easily
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Students can use our <strong className="text-white">Marks Percentage Calculator</strong> to quickly find their exam scores and subject-wise percentages. Simply enter the marks obtained and total marks, and the calculator will give you the exact percentage.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            If you're wondering <strong className="text-white">how to calculate percentage of marks</strong>, our tool makes the process effortless — no formulas needed. This makes Tolistaan a reliable <strong className="text-white">Best Grades Calculator</strong> for students of all levels.
          </p>
        </div>

        {/* Increase/Decrease Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Percentage Increase & Decrease Calculator
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Need to check how much a number increases or decreases? Our <strong className="text-white">Percentage Increase Calculator</strong> and <strong className="text-white">Percentage Change</strong> tool help you:
          </p>
          <div className="space-y-3">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white/80 text-sm leading-relaxed">Find price changes</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white/80 text-sm leading-relaxed">Calculate business profits</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white/80 text-sm leading-relaxed">Identify discount percentages</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white/80 text-sm leading-relaxed">Compare old and new values</p>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            Whether you're dealing with money, shopping discounts, or financial changes, this tool provides quick answers.
          </p>
        </div>

        {/* Add/Subtract Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Add or Subtract a Percentage — Fast & Easy
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Use this feature when you want to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">+</span>
                </div>
                <h3 className="text-white font-semibold">Add tax or GST</h3>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">−</span>
                </div>
                <h3 className="text-white font-semibold">Subtract discounts</h3>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">↑</span>
                </div>
                <h3 className="text-white font-semibold">Increase a salary by a certain percent</h3>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">↓</span>
                </div>
                <h3 className="text-white font-semibold">Reduce a value by a given percentage</h3>
              </div>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            Our calculator shows how much the final value becomes after applying percentage change.
          </p>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Tolistaan's Online Percentage Calculator?
          </h2>
          <div className="space-y-3">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <p className="text-white/80 text-sm leading-relaxed">Fast & accurate results</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <p className="text-white/80 text-sm leading-relaxed">Works for marks, money, discounts, growth, and reductions</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <p className="text-white/80 text-sm leading-relaxed">No signup or installation required</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <p className="text-white/80 text-sm leading-relaxed">Mobile-friendly and easy to use</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <p className="text-white/80 text-sm leading-relaxed">Helps in solving <strong className="text-white">finding percentages using a calculator</strong></p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✓</span>
              <p className="text-white/80 text-sm leading-relaxed">Perfect for students, teachers, professionals & shoppers</p>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            Tolistaan gives you the simplest way to calculate any percentage with full accuracy.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            FAQs — Percentage Calculator
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What is a Percentage Calculator?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A <strong className="text-white">Percentage Calculator</strong> is an online tool that helps you quickly find percentages, including percentage increase, decrease, marks percentage, and money-related percentages. Tolistaan's <strong className="text-white">Online Percentage Calculator</strong> gives instant and accurate results without needing manual math.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. How can I calculate the percentage of marks?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                To calculate marks, enter the marks obtained and the total marks in the <strong className="text-white">Marks Percentage Calculator</strong>. The tool will instantly show the exact percentage, making it easy for students who want quick <strong className="text-white">Math Easy Solutions</strong> or need help with <strong className="text-white">how to calculate percentage of marks</strong>.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. What is a Percentage Increase Calculator used for?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A <strong className="text-white">Percentage Increase Calculator</strong> helps you find how much a number has increased from its original value. It is useful for tracking business growth, salary increments, price changes, and financial comparisons. Tolistaan's tool also supports <strong className="text-white">Percentage Change</strong> for both increase and decrease.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Can I add or subtract a percentage using this tool?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Tolistaan's calculator allows you to <strong className="text-white">Add or Subtract a Percentage</strong> easily. Whether you want to apply tax, calculate discounts, or increase/decrease a value, the tool shows accurate results instantly.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Is this Percentage Calculator free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely. Tolistaan offers a 100% free, fast, and easy-to-use <strong className="text-white">Percentage Calculator</strong>, including features like <strong className="text-white">Percentage Calculator Money</strong>, <strong className="text-white">Marks Percentage Calculator</strong>, and <strong className="text-white">Best Grades Calculator</strong> with unlimited access—no signup required.
              </p>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default PercentageCalculator;