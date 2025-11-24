import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result = 0;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = currentValue / inputValue;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    performOperation('=');
    setOperation(null);
    setPreviousValue(null);
    setWaitingForOperand(true);
  };

  const Button: React.FC<{ onClick: () => void; className?: string; children: React.ReactNode }> = ({ 
    onClick, 
    className = '', 
    children 
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <Layout title="Basic Calculator" showBackButton>
      <div className="max-w-md mx-auto">
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          {/* Display */}
          <div className="mb-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 text-right">
              <div className="text-3xl font-mono text-white break-all">{display}</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <Button
              onClick={clear}
              className="col-span-2 bg-gradient-to-r from-red-500 to-pink-600"
            >
              Clear
            </Button>
            <Button
              onClick={() => performOperation('/')}
              className="bg-gradient-to-r from-purple-500 to-pink-600"
            >
              ÷
            </Button>
            <Button
              onClick={() => performOperation('*')}
              className="bg-gradient-to-r from-purple-500 to-pink-600"
            >
              ×
            </Button>

            <Button
              onClick={() => inputNumber('7')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber('8')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber('9')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              9
            </Button>
            <Button
              onClick={() => performOperation('-')}
              className="bg-gradient-to-r from-purple-500 to-pink-600"
            >
              -
            </Button>

            <Button
              onClick={() => inputNumber('4')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber('5')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber('6')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              6
            </Button>
            <Button
              onClick={() => performOperation('+')}
              className="bg-gradient-to-r from-purple-500 to-pink-600"
            >
              +
            </Button>

            <Button
              onClick={() => inputNumber('1')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber('2')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber('3')}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              3
            </Button>
            <Button
              onClick={calculate}
              className="row-span-2 bg-gradient-to-r from-blue-500 to-cyan-600"
            >
              =
            </Button>

            <Button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-gradient-to-r from-gray-600 to-gray-700"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-gradient-to-r from-gray-600 to-gray-700"
            >
              .
            </Button>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Online Calculators – Fast, Accurate & Easy-to-Use Tools for Everyone
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Welcome to <strong className="text-white">Toolistaan.com</strong>, your one-stop destination for smart, reliable, and <strong className="text-white">Free Online Calculators</strong> designed to make daily calculations easier than ever. Whether you're a student, business owner, accountant, or someone who needs quick answers, our <strong className="text-white">Online Calculators</strong> provide instant accuracy without installing any software.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Our platform offers every essential tool—from a <strong className="text-white">Basic Calculator</strong> for simple math to advanced utilities like a <strong className="text-white">free payroll calculator</strong>. With clean UI, instant results, and user-friendly design, <strong className="text-white">The Online Calculator</strong> experience at Toolistaan.com is built for everyone.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Using our calculators is extremely easy:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Choose the calculator you need—<strong className="text-white">Simple Calculator</strong>, <strong className="text-white">Basic Calculator</strong>, or any other.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Enter your numbers in the input fields.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Get instant, accurate results.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                4
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Recalculate as many times as you want—completely free!
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              Our <strong className="text-white">Free Online Calculators</strong> work on all devices, including mobile, desktop, and tablets, ensuring smooth calculations anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Toolistaan.com?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Here's why Toolistaan.com is the best place for <strong className="text-white">The Online Calculator</strong> experience:
          </p>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✔ Fast & Accurate Calculations</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our tools eliminate human errors and give precise results instantly.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✔ Free Forever</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Every tool—including <strong className="text-white">Simple Calculator</strong>, <strong className="text-white">Free Online Calculator</strong>, and <strong className="text-white">free payroll calculator</strong>—is completely free to use.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✔ No Downloads Required</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Access any calculator directly in your browser with zero installations.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✔ User-Friendly Interface</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Designed for smooth usage, even for beginners.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✔ Multiple Calculator Categories</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  We offer a wide range of <strong className="text-white">Online Calculators</strong> so you can solve any type of calculation problem effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Tips for Optimal Use
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            To get the best from our <strong className="text-white">Free Online Calculators</strong>, follow these suggestions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Double-Check Inputs</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Double-check your inputs for error-free results.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Use Right Calculator</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use the <strong className="text-white">Simple Calculator</strong> for quick math and the <strong className="text-white">Basic Calculator</strong> for standard everyday calculations.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Bookmark the Page</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Bookmark the page for faster access to <strong className="text-white">The Online Calculator</strong>.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Business Calculations</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use the <strong className="text-white">free payroll calculator</strong> for business salary computations.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6 md:col-span-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Clear Previous Data</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Clear previous data before starting a new calculation to avoid confusion.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy and Disclaimer Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Privacy & Disclaimer
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Privacy Matters</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    At Toolistaan.com, your privacy is our priority. We do not store any numbers, data, or calculations you enter in our tools. Everything works in real time within your device.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Disclaimer</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Our <strong className="text-white">Online Calculators</strong> are developed for accuracy, but results may vary in specific financial or technical scenarios. Users should verify calculations if used for official purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            5 FAQs About Online Calculators
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What are Online Calculators?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                <strong className="text-white">Online Calculators</strong> are web-based tools that help you perform mathematical or financial calculations instantly without downloading software.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. Is the Simple Calculator free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! The <strong className="text-white">Simple Calculator</strong> and all other tools on Toolistaan.com are 100% free.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Can I use the Free Online Calculator on mobile?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely. All <strong className="text-white">Free Online Calculators</strong> are mobile-friendly and work on any device.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. What is a free payroll calculator?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                It is an online tool that helps businesses calculate employee salaries, deductions, and net pay easily.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Do I need to create an account?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                No, you can use <strong className="text-white">The Online Calculator</strong> tools instantly without any login or registration.
              </p>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default BasicCalculator;