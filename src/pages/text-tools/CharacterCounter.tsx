import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersWithoutSpaces: 0,
    charactersWithoutSpacesAndPunctuation: 0,
    spaces: 0,
    punctuation: 0,
    numbers: 0,
    letters: 0
  });

  useEffect(() => {
    const characters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    const charactersWithoutSpacesAndPunctuation = text.replace(/[^\w]/g, '').length;
    const spaces = (text.match(/\s/g) || []).length;
    const punctuation = (text.match(/[^\w\s]/g) || []).length;
    const numbers = (text.match(/\d/g) || []).length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;

    setStats({
      characters,
      charactersWithoutSpaces,
      charactersWithoutSpacesAndPunctuation,
      spaces,
      punctuation,
      numbers,
      letters
    });
  }, [text]);

  const clearText = () => {
    setText('');
  };

  return (
    <Layout title="Character Counter" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Character Statistics</h3>
          <button
            onClick={clearText}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear Text
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.characters}</div>
            <div className="text-white/70 text-sm">Total Characters</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.charactersWithoutSpaces}</div>
            <div className="text-white/70 text-sm">Without Spaces</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.letters}</div>
            <div className="text-white/70 text-sm">Letters</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.numbers}</div>
            <div className="text-white/70 text-sm">Numbers</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.spaces}</div>
            <div className="text-white/70 text-sm">Spaces</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.punctuation}</div>
            <div className="text-white/70 text-sm">Punctuation</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.charactersWithoutSpacesAndPunctuation}</div>
            <div className="text-white/70 text-sm">Alphanumeric</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{text.split('\n').length}</div>
            <div className="text-white/70 text-sm">Lines</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CharacterCounter;