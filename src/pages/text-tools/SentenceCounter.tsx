import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const SentenceCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    sentences: 0,
    words: 0,
    characters: 0,
    averageWordsPerSentence: 0,
    averageCharactersPerSentence: 0
  });

  useEffect(() => {
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const averageWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0;
    const averageCharactersPerSentence = sentences > 0 ? Math.round((characters / sentences) * 10) / 10 : 0;

    setStats({
      sentences,
      words,
      characters,
      averageWordsPerSentence,
      averageCharactersPerSentence
    });
  }, [text]);

  const clearText = () => {
    setText('');
  };

  return (
    <Layout title="Sentence Counter" showBackButton>
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
          <h3 className="text-xl font-semibold text-white">Sentence Statistics</h3>
          <button
            onClick={clearText}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear Text
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.sentences}</div>
            <div className="text-white/70 text-sm">Sentences</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.words}</div>
            <div className="text-white/70 text-sm">Words</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.characters}</div>
            <div className="text-white/70 text-sm">Characters</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.averageWordsPerSentence}</div>
            <div className="text-white/70 text-sm">Avg Words/Sentence</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.averageCharactersPerSentence}</div>
            <div className="text-white/70 text-sm">Avg Chars/Sentence</div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default SentenceCounter;