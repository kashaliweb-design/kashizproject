import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Heart, Sparkles } from 'lucide-react';

const LoveCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;

    // Simple algorithm for fun - not scientifically accurate!
    const combinedNames = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let score = 0;
    
    // Count matching letters
    const name1Letters = name1.toLowerCase().split('');
    const name2Letters = name2.toLowerCase().split('');
    
    for (const letter of name1Letters) {
      if (name2Letters.includes(letter)) {
        score += 5;
      }
    }
    
    // Add some randomness based on name lengths and characters
    const lengthFactor = Math.abs(name1.length - name2.length);
    score += (20 - lengthFactor * 2);
    
    // Add character code sum influence
    const charSum = combinedNames.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    score += (charSum % 30);
    
    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    
    // Add some fun randomness
    const randomFactor = Math.floor(Math.random() * 21) - 10; // -10 to +10
    score = Math.max(0, Math.min(100, score + randomFactor));

    let message = '';
    let color = '';
    let emoji = '';

    if (score >= 90) {
      message = "Perfect match! You two are meant to be together! 💕";
      color = 'text-pink-400';
      emoji = '💕';
    } else if (score >= 80) {
      message = "Excellent compatibility! Your love is strong! ❤️";
      color = 'text-red-400';
      emoji = '❤️';
    } else if (score >= 70) {
      message = "Great match! You have wonderful chemistry! 💖";
      color = 'text-pink-300';
      emoji = '💖';
    } else if (score >= 60) {
      message = "Good compatibility! There's definitely potential! 💗";
      color = 'text-purple-400';
      emoji = '💗';
    } else if (score >= 50) {
      message = "Moderate match. Love can grow with effort! 💙";
      color = 'text-blue-400';
      emoji = '💙';
    } else if (score >= 30) {
      message = "Some challenges ahead, but love conquers all! 💚";
      color = 'text-green-400';
      emoji = '💚';
    } else {
      message = "Opposites attract! Sometimes differences make it interesting! 💛";
      color = 'text-yellow-400';
      emoji = '💛';
    }

    setResult({
      score,
      message,
      color,
      emoji,
      name1: name1.trim(),
      name2: name2.trim()
    });
  };

  const reset = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  const famousCouples = [
    { name1: 'Romeo', name2: 'Juliet' },
    { name1: 'Jack', name2: 'Rose' },
    { name1: 'Noah', name2: 'Allie' },
    { name1: 'Elizabeth', name2: 'Darcy' },
    { name1: 'Bella', name2: 'Edward' },
    { name1: 'Ariel', name2: 'Eric' }
  ];

  return (
    <Layout title="Love Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="text-pink-400" size={32} />
            <Sparkles className="text-yellow-400" size={24} />
            <Heart className="text-red-400" size={32} />
          </div>
          <p className="text-white/70">
            Calculate the love compatibility between two people! This is just for fun and entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Enter Names</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  First Person's Name
                </label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter first name..."
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>

              <div className="text-center">
                <Heart className="text-pink-400 mx-auto" size={24} />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Second Person's Name
                </label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter second name..."
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={calculateLove}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Calculate Love
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Famous Couples Examples */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Try Famous Couples</h4>
              <div className="grid grid-cols-2 gap-2">
                {famousCouples.map((couple, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setName1(couple.name1);
                      setName2(couple.name2);
                    }}
                    className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                  >
                    {couple.name1} & {couple.name2}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Love Compatibility</h3>
            
            {result ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-6 text-center">
                  <div className="text-6xl font-bold text-white mb-4">
                    {result.score}%
                  </div>
                  <div className="text-2xl mb-4">{result.emoji}</div>
                  <div className={`text-lg font-medium ${result.color}`}>
                    {result.message}
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 text-center">
                    {result.name1} + {result.name2}
                  </h4>
                  
                  {/* Love Meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/70">
                      <span>Love Meter</span>
                      <span>{result.score}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-1000 ease-out"
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{result.name1.length}</div>
                    <div className="text-white/70 text-sm">Letters in {result.name1}</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{result.name2.length}</div>
                    <div className="text-white/70 text-sm">Letters in {result.name2}</div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Fun Love Facts</h4>
                  <div className="space-y-1 text-sm text-white/70">
                    <div>• Combined name length: {result.name1.length + result.name2.length} letters</div>
                    <div>• Love calculation based on name compatibility</div>
                    <div>• Remember: True love isn't determined by calculations! 💝</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                <Heart className="mx-auto mb-4 text-white/30" size={48} />
                <p>Enter two names to calculate love compatibility</p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Important Note</h3>
          <div className="space-y-2 text-white/70 text-sm">
            <p>• This love calculator is purely for entertainment purposes</p>
            <p>• Real love compatibility depends on many factors like shared values, communication, trust, and mutual respect</p>
            <p>• The algorithm uses name-based calculations and random factors for fun results</p>
            <p>• Don't make important relationship decisions based on this calculator!</p>
            <p>• True love is about understanding, caring, and supporting each other 💕</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoveCalculator;