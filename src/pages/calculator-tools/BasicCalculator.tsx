import React, { useState } from 'react';
import Layout from '../../components/Layout';

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
      </div>
    </Layout>
  );
};

export default BasicCalculator;