import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TextToMorse: React.FC = () => {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');

  const morseCode: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/', '.': '.-.-.-', ',': '--..--',
    '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
    ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
    '@': '.--.-.'
  };

  const reverseMorseCode: { [key: string]: string } = {};
  Object.keys(morseCode).forEach(key => {
    reverseMorseCode[morseCode[key]] = key;
  });

  const textToMorse = (str: string) => {
    return str.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
  };

  const morseToText = (morseStr: string) => {
    try {
      return morseStr.split(' ').map(code => {
        if (code === '/') return ' ';
        return reverseMorseCode[code] || code;
      }).join('');
    } catch (error) {
      return 'Invalid Morse code format';
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setMorse(textToMorse(value));
  };

  const handleMorseChange = (value: string) => {
    setMorse(value);
    setText(morseToText(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearAll = () => {
    setText('');
    setMorse('');
  };

  const playMorse = () => {
    if (!morse) return;
    
    // Simple audio feedback for morse code
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dotDuration = 100; // milliseconds
    const dashDuration = 300;
    const pauseDuration = 100;
    
    let currentTime = audioContext.currentTime;
    
    morse.split('').forEach(char => {
      if (char === '.') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, currentTime);
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + dotDuration / 1000);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration / 1000);
        
        currentTime += (dotDuration + pauseDuration) / 1000;
      } else if (char === '-') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, currentTime);
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + dashDuration / 1000);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dashDuration / 1000);
        
        currentTime += (dashDuration + pauseDuration) / 1000;
      } else if (char === ' ') {
        currentTime += pauseDuration * 2 / 1000;
      }
    });
  };

  return (
    <Layout title="Text to Morse Code Converter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Text</h3>
              <button
                onClick={() => copyToClipboard(text)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter text to convert to Morse code..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Morse Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Morse Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={playMorse}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Play
                </button>
                <button
                  onClick={() => copyToClipboard(morse)}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
              </div>
            </div>
            <textarea
              value={morse}
              onChange={(e) => handleMorseChange(e.target.value)}
              placeholder="Morse code will appear here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-lg"
            />
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

        {/* Morse Code Reference */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Morse Code Reference</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            {Object.entries(morseCode).map(([letter, code]) => (
              <div key={letter} className="backdrop-blur-md bg-black/10 border border-glass rounded p-2 text-center">
                <div className="text-white font-bold">{letter}</div>
                <div className="text-white/70 font-mono">{code}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-white/70 text-sm">
            <h4 className="text-white font-medium">How to use:</h4>
            <p>• Dots (.) represent short signals, dashes (-) represent long signals</p>
            <p>• Spaces separate letters, forward slashes (/) separate words</p>
            <p>• You can type in either text or Morse code - conversion works both ways</p>
            <p>• Click "Play" to hear the Morse code audio (requires browser audio support)</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToMorse;