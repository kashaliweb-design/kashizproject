import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersWithoutSpaces: 0,
    sentences: 0,
    paragraphs: 0
  });

  useEffect(() => {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    setStats({
      words,
      characters,
      charactersWithoutSpaces,
      sentences,
      paragraphs
    });
  }, [text]);

  const clearText = () => {
    setText('');
  };

  return (
    <Layout title="Word Counter" showBackButton>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-48 sm:h-64 p-3 sm:p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Statistics</h3>
          <button
            onClick={clearText}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear Text
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.words}</div>
            <div className="text-white/70 text-xs sm:text-sm">Words</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.characters}</div>
            <div className="text-white/70 text-xs sm:text-sm">Characters</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.charactersWithoutSpaces}</div>
            <div className="text-white/70 text-xs sm:text-sm">No Spaces</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.sentences}</div>
            <div className="text-white/70 text-xs sm:text-sm">Sentences</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.paragraphs}</div>
            <div className="text-white/70 text-xs sm:text-sm">Paragraphs</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WordCounter;