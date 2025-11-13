import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const ParagraphCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    paragraphs: 0,
    sentences: 0,
    words: 0,
    characters: 0,
    averageSentencesPerParagraph: 0,
    averageWordsPerParagraph: 0
  });

  useEffect(() => {
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const averageSentencesPerParagraph = paragraphs > 0 ? Math.round((sentences / paragraphs) * 10) / 10 : 0;
    const averageWordsPerParagraph = paragraphs > 0 ? Math.round((words / paragraphs) * 10) / 10 : 0;

    setStats({
      paragraphs,
      sentences,
      words,
      characters,
      averageSentencesPerParagraph,
      averageWordsPerParagraph
    });
  }, [text]);

  const clearText = () => {
    setText('');
  };

  return (
    <Layout title="Paragraph Counter" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text (separate paragraphs with blank lines):
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here... Use blank lines to separate paragraphs."
            className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Paragraph Statistics</h3>
          <button
            onClick={clearText}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear Text
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.paragraphs}</div>
            <div className="text-white/70 text-sm">Paragraphs</div>
          </div>
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
            <div className="text-2xl font-bold text-white">{stats.averageSentencesPerParagraph}</div>
            <div className="text-white/70 text-sm">Avg Sentences/Paragraph</div>
          </div>
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.averageWordsPerParagraph}</div>
            <div className="text-white/70 text-sm">Avg Words/Paragraph</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParagraphCounter;