import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

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
    <Layout 
      title="BMI Calculator" 
      showBackButton
      seoTitle="BMI Calculator Online – Calculate Your Body Mass Index & Healthy Weight"
      seoDescription="Use our free BMI Calculator to easily calculate your Body Mass Index and check your healthy weight online. Quick, accurate & trusted tool!"
    >
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

        {/* Introduction Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Welcome to Toolistaan.com – Your Smart & Free BMI Calculator
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Toolistaan.com brings you an advanced and easy-to-use <strong className="text-white">BMI Calculator</strong> designed to help you understand your health status within seconds. Whether you want to <strong className="text-white">Calculate Your BMI</strong>, check your weight category, or quickly <strong className="text-white">Calculate your Body Mass Index</strong>, our tool gives you accurate and instant results.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Our <strong className="text-white">Body Mass Index Calculator</strong> works for everyone — men, women, teens, and especially those searching for a <strong className="text-white">BMI Calculator female</strong> or a <strong className="text-white">BMI calculator kg with age</strong> option.
          </p>
        </div>

        {/* What is BMI Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What is a BMI Calculator?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            A <strong className="text-white">BMI Calculator</strong> (Body Mass Index Calculator) is a tool that measures the relationship between your weight and height to determine whether you're underweight, normal, overweight, or obese.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            BMI is a globally accepted health measurement used by fitness trainers, doctors, and health organizations. It gives you a quick idea of <strong className="text-white">what's your body mass index</strong> so you can take the right steps toward a healthier lifestyle.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Using Toolistaan's <strong className="text-white">BMI Checker</strong> is extremely simple:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">1</div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">Enter your weight (kg)</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">2</div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">Enter your height (cm)</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">3</div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">(Optional) Enter age — helpful for <strong className="text-white">BMI calculator kg with age</strong></p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">4</div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">Click <strong className="text-white">Calculate Your BMI</strong></p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">5</div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">Instantly see your results along with your weight category</p>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              The tool instantly processes your input and tells you your accurate <strong className="text-white">Body Mass Index</strong>.
            </p>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Toolistaan.com?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Toolistaan.com offers a clean, fast, and reliable BMI tool built for accuracy and user comfort:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✔</span>
              <p className="text-white/80 text-sm leading-relaxed">Instant results with accurate BMI calculations</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✔</span>
              <p className="text-white/80 text-sm leading-relaxed">Works on all devices — mobile, PC, and tablets</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✔</span>
              <p className="text-white/80 text-sm leading-relaxed">Supports <strong className="text-white">BMI calculator female</strong>, adults, and teens</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✔</span>
              <p className="text-white/80 text-sm leading-relaxed">Designed for global users with easy-to-understand categories</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✔</span>
              <p className="text-white/80 text-sm leading-relaxed">100% free — no signup, no downloads</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-3">
              <span className="text-green-400 text-xl flex-shrink-0">✔</span>
              <p className="text-white/80 text-sm leading-relaxed">Perfect for fitness planning, weight tracking, dieting, and health analysis</p>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            Whether you're monitoring your weight loss journey or checking your current health range, Toolistaan makes it quick and simple.
          </p>
        </div>

        {/* Tips Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Tips for Optimal Use
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            To achieve accurate results, follow these tips:
          </p>
          <div className="space-y-3">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm leading-relaxed">Always measure weight in kilograms (kg)</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm leading-relaxed">Measure height without shoes for correct BMI</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm leading-relaxed">For children and teens, recheck values as growth changes</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm leading-relaxed">Use the calculator regularly to track your progress</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm leading-relaxed">Combine BMI with other health measurements for better clarity</p>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              While BMI is helpful, it's only one part of your health assessment. Use it as a guide — not a final diagnosis.
            </p>
          </div>
        </div>

        {/* Additional Feature Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Additional Useful Feature: Calculating Age
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Some BMI formulas consider age for more accurate prediction. Toolistaan also offers simple <strong className="text-white">Calculating Age</strong> features inside other tools, helping users quickly check <strong className="text-white">example age calculation</strong> before entering their info.
          </p>
        </div>

        {/* Privacy Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Privacy and Disclaimer
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Your privacy matters. <strong className="text-white">Toolistaan.com</strong> does not store any data you enter into the <strong className="text-white">BMI Calculator</strong>. All calculations are done instantly in your browser.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            FAQs — BMI Calculator
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What is a BMI Calculator and why is it useful?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A <strong className="text-white">BMI Calculator</strong> (Body Mass Index Calculator) helps you understand whether your weight is healthy for your height. By entering your weight and height, you can instantly <strong className="text-white">Calculate Your BMI</strong> and know if you are underweight, normal, overweight, or obese. It is useful for tracking fitness goals and understanding general health.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. How do I calculate my Body Mass Index on Toolistaan.com?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                To <strong className="text-white">Calculate your Body Mass Index</strong>, simply enter your weight in kilograms (kg) and height in centimeters. Click the "Calculate BMI" button to get instant results. Our tool supports all users, including those looking for <strong className="text-white">BMI calculator female</strong> or <strong className="text-white">BMI calculator kg with age</strong>.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Does BMI change with age?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                BMI formulas remain the same, but age can influence how BMI results are interpreted. That's why Toolistaan also supports <strong className="text-white">BMI calculator kg with age</strong> for more refined understanding. You can also use our <strong className="text-white">Calculating Age</strong> tools for quick <strong className="text-white">example age calculation</strong> when needed.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Is the BMI Calculator accurate for everyone?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                BMI is a helpful general measure, but it doesn't differentiate between muscle and fat. Athletes, bodybuilders, pregnant women, and people with medical conditions may need professional evaluation. However, for most people, the <strong className="text-white">Body Mass Index Calculator</strong> gives a quick and reliable health estimation.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Is the BMI Calculator free to use on Toolistaan.com?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Toolistaan.com offers a 100% free <strong className="text-white">BMI Calculator</strong>. You can use it anytime without sign-up, without data storage, and without limitations. Just enter your values and get your BMI instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BMICalculator;