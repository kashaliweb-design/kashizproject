import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

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

        {/* Introduction Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Character Checker — Tolistaan
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Welcome to <strong className="text-white">Tolistaan</strong>, your ultimate <strong className="text-white">Character Checker</strong> and <strong className="text-white">Online Character Count Tool</strong>. Our tool allows you to <strong className="text-white">calculate character count</strong> quickly and accurately for any text. Whether you're a writer, student, developer, or content creator, this tool ensures your content meets character limits for documents, social media, essays, or coding projects.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Using Tolistaan's <strong className="text-white">Character Checker Online</strong> is simple:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Paste your text into the editor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Instantly see your <strong className="text-white">character count online</strong> — including spaces, letters, and special characters.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Track the <strong className="text-white">character length count</strong> for paragraphs, essays, social media posts, or professional writing.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              This <strong className="text-white">Free Online Character Counter</strong> works with multiple languages, including English and Arabic, making it a versatile <strong className="text-white">Arabic letter counter</strong> and <strong className="text-white">alphabet letter counter</strong> tool.
            </p>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Tolistaan's Character Checker?
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Free Character Counter</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Free character counter</strong> with unlimited usage.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Character Count Word Online</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Character count word online</strong> feature to see both word and character counts.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Calculate Character Count Instantly</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Calculate character count</strong> for any text instantly.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">The Best Character Counter</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Works as <strong className="text-white">The Best Character Counter</strong> for social media, documents, essays, and professional writing.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast and Accurate</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Fast, accurate, and easy-to-use <strong className="text-white">Character Count Tool</strong>.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Multi-Language Support</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Compatible with multiple languages, including support for <strong className="text-white">Arabic letter counter</strong>.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Use Plain Text</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Paste plain text for accurate <strong className="text-white">character count online free</strong> results.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Multiple Use Cases</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use this <strong className="text-white">Online Character Count Tool</strong> for essays, emails, captions, tweets, and documents.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Combine with Other Tools</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Combine with other Tolistaan tools like Text Sorter or Remove Duplicate Lines for cleaner content.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Monitor Letter Usage</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use the <strong className="text-white">alphabet letter counter</strong> feature to monitor specific letter usage or optimize content.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy and Disclaimer Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Privacy and Disclaimer
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
                    Tolistaan values your privacy. Text processed in the <strong className="text-white">Free Online Character Counter</strong> is not stored on our servers.
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
                    While the tool is highly accurate, users should double-check critical documents for final submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            FAQs – Character Checker
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What is a Character Checker?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A <strong className="text-white">Character Checker</strong> is an online tool that helps you <strong className="text-white">calculate character count</strong> in any text. It instantly shows the number of letters, spaces, and symbols so you can meet writing limits for documents, posts, or assignments.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. How do I use the Character Count Online tool?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Simply paste your text into the box, and the <strong className="text-white">character count online</strong> display will update automatically. The tool works as a <strong className="text-white">free character counter</strong> and also shows word count.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Does this tool support Arabic text?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Tolistaan includes an <strong className="text-white">Arabic letter counter</strong> feature. You can check Arabic characters, words, and symbols with full accuracy.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Is the Character Checker Online free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely. Our <strong className="text-white">Online Character Count Tool</strong> is 100% free. You can use the <strong className="text-white">character count online free</strong> feature without limits or registration.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Can I count words and characters together?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes. This <strong className="text-white">Character Count Tool</strong> works as both a character checker and a <strong className="text-white">character count word online</strong> tool, giving you total <strong className="text-white">character length count</strong> and word count instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default CharacterCounter;