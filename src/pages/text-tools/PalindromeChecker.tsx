import React, { useState } from 'react';
import Layout from '../../components/Layout';

const PalindromeChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any>(null);

  const checkPalindrome = (str: string) => {
    if (!str.trim()) return null;

    // Original text
    const original = str;
    
    // Clean text (remove spaces, punctuation, convert to lowercase)
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Reverse the cleaned text
    const reversed = cleaned.split('').reverse().join('');
    
    // Check if palindrome
    const isPalindrome = cleaned === reversed;
    
    // Word-level palindrome check
    const words = str.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const reversedWords = [...words].reverse();
    const isWordPalindrome = words.join(' ') === reversedWords.join(' ');
    
    return {
      original,
      cleaned,
      reversed,
      isPalindrome,
      isWordPalindrome,
      length: cleaned.length
    };
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setResults(checkPalindrome(value));
  };

  const clearText = () => {
    setText('');
    setResults(null);
  };

  const palindromeExamples = [
    'racecar',
    'A man a plan a canal Panama',
    'race a car',
    'hello',
    'Madam',
    'Was it a car or a cat I saw?',
    '12321',
    'No x in Nixon'
  ];

  return (
    <Layout title="Palindrome Checker" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Enter Text to Check</h3>
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter text to check if it's a palindrome..."
              className="w-full h-32 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            <div className="mt-4">
              <h4 className="text-white/70 font-medium mb-3">Try These Examples</h4>
              <div className="grid grid-cols-2 gap-2">
                {palindromeExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleTextChange(example)}
                    className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm text-left"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Palindrome Results</h3>
            
            {results ? (
              <div className="space-y-4">
                {/* Main Result */}
                <div className={`backdrop-blur-md border rounded-lg p-4 text-center ${
                  results.isPalindrome 
                    ? 'bg-green-500/20 border-green-500/30' 
                    : 'bg-red-500/20 border-red-500/30'
                }`}>
                  <div className="text-2xl font-bold text-white mb-2">
                    {results.isPalindrome ? '✅ Yes!' : '❌ No'}
                  </div>
                  <div className="text-white/70">
                    {results.isPalindrome ? 'This is a palindrome' : 'This is not a palindrome'}
                  </div>
                </div>

                {/* Word Palindrome Check */}
                <div className={`backdrop-blur-md border rounded-lg p-4 text-center ${
                  results.isWordPalindrome 
                    ? 'bg-blue-500/20 border-blue-500/30' 
                    : 'bg-gray-500/20 border-gray-500/30'
                }`}>
                  <div className="text-lg font-bold text-white mb-2">
                    {results.isWordPalindrome ? '🔄 Word Palindrome' : '🔄 Not Word Palindrome'}
                  </div>
                  <div className="text-white/70 text-sm">
                    {results.isWordPalindrome ? 'Words read the same forwards and backwards' : 'Words do not form a palindrome'}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Original Text:</div>
                    <div className="text-white font-mono">{results.original}</div>
                  </div>
                  
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Cleaned Text:</div>
                    <div className="text-white font-mono">{results.cleaned}</div>
                  </div>
                  
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Reversed:</div>
                    <div className="text-white font-mono">{results.reversed}</div>
                  </div>

                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="text-white/70 text-sm mb-1">Length:</div>
                    <div className="text-white">{results.length} characters</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                Enter text above to check if it's a palindrome
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearText}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">What is a Palindrome?</h3>
          <div className="space-y-2 text-white/70 text-sm">
            <p>• A palindrome is a word, phrase, number, or sequence that reads the same forwards and backwards</p>
            <p>• Character palindromes ignore spaces, punctuation, and capitalization</p>
            <p>• Word palindromes check if the sequence of words is the same when reversed</p>
            <p>• Examples: "racecar", "A man a plan a canal Panama", "12321"</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PalindromeChecker;