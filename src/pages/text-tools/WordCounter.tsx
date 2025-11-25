import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

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
    <Layout 
      title="Word Counter" 
      showBackButton
      seoTitle="Free Online Word Counter | Fast Word & Character Counter"
      seoDescription="Use our free online Word Counter tool to count words, characters, sentences, and readability instantly. Accurate, fast, and perfect for writers, students, and SEO."
    >
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

        {/* What is WordCounter Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            What is WordCounter? — Tolistaan's Free Online Word Count Tool
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Tolistaan's WordCounter is a smart, fast, and user-friendly <strong className="text-white">Free Online Word Counter Tool</strong> designed to help you count words, improve your writing, and get instant results. Whether you are a student, blogger, content creator, or professional writer, our word counter website makes writing easier, cleaner, and more accurate.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Simply paste your text or start typing in the editor, and the tool will automatically count words and characters in real time. Every edit, delete, or update instantly adjusts the results, ensuring you always stay within your required word or character limits.
          </p>
        </div>

        {/* Why Use Tolistaan's WordCounter Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Tolistaan's WordCounter?
          </h2>
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                Count Words & Characters Instantly
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Our advanced <strong className="text-white">Character Counter</strong> and <strong className="text-white">Word Counter</strong> give you instant results, showing your total words, characters (with and without spaces), sentences, and paragraphs. It also works as a reliable <strong className="text-white">paragraph counter</strong> for longer content.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold">2</span>
                Improve Your Writing Style
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                The tool is designed not only to <strong className="text-white">Count Words</strong> but also to help you <strong className="text-white">Correct Writing</strong>. You can refine your tone, eliminate unnecessary wording, and produce more clear and engaging content.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-sm font-bold">3</span>
                Keyword Insights for Better SEO
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Tolistaan's editor shows your top keywords and keyword density, ensuring you avoid over-optimization. This helps content creators maintain a natural flow while improving ranking opportunities.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-sm font-bold">4</span>
                Reading Level & Engagement Score
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Our built-in <strong className="text-white">Reading Level</strong> feature tells you how easy or difficult your text is to understand. This ensures your content matches your audience's reading capability.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-sm font-bold">5</span>
                Auto-Save Feature
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                No need to worry about losing your work. The text editor auto-saves your content so you can return anytime.
              </p>
            </div>
          </div>
        </div>

        {/* How Tool Helps Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Tolistaan's Free Word Count Tool Helps You
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Knowing the word count of your text is essential, especially for:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
              <span className="text-white/80">Articles & blog posts</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <span className="text-white/80">Essays & academic assignments</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <span className="text-white/80">Reports and books</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600"></div>
              <span className="text-white/80">Business documents</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <span className="text-white/80">Creative writing</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <span className="text-white/80">Social media captions</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-red-600"></div>
              <span className="text-white/80">SEO-optimized content</span>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Tolistaan's <strong className="text-white">Free Online Word Counter</strong>, <strong className="text-white">Free Word Count Tool</strong>, and all-in-one <strong className="text-white">Writing Tools</strong> help you meet your required word limits while improving clarity and structure.
          </p>
        </div>

        {/* Features Packed Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Features Packed in One Powerful Counting Tool
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Free Online Word Counter</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Count Words and Characters</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Character Counter</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Paragraph Counter</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Reading Level Checker</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Correct Writing Suggestions</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Keyword Analysis</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Writing Tools for SEO & Clarity</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Instant Results</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Auto-Save (No Data Loss!)</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3 sm:col-span-2">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/80 text-sm">Clean, fast, mobile-friendly interface</span>
            </div>
          </div>
          <p className="text-white/80 text-base leading-relaxed mt-6">
            Everything inside Tolistaan is built to <strong className="text-white">Help WordCounter</strong> users write better, faster, and smarter.
          </p>
        </div>

        {/* Why Tolistaan is Best Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Tolistaan Is the Best Word Counting Tool Online
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Tolistaan gives you accuracy, reliability, and a smooth writing experience. Whether you want to check your word limit, improve readability, or analyze keyword frequency, our <strong className="text-white">counting tool</strong> provides everything in one place.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            We aim to make writing easier for everyone — from beginners to professionals — with tools that are simple, powerful, and <strong className="text-white">100% free</strong>.
          </p>
        </div>

        {/* Features Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Powerful Word Counter Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Real-Time Counting</h3>
                  <p className="text-white/70 text-sm">
                    Get instant word, character, sentence, and paragraph counts as you type. No need to click any buttons - the statistics update automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Character Count Options</h3>
                  <p className="text-white/70 text-sm">
                    View both total characters and characters without spaces. Perfect for social media posts, essays, and content with character limits.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sentence & Paragraph Analysis</h3>
                  <p className="text-white/70 text-sm">
                    Track the number of sentences and paragraphs in your text. Useful for analyzing document structure and readability.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
                  <p className="text-white/70 text-sm">
                    All text processing happens in your browser. Your content never leaves your device, ensuring complete privacy and security.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Free & Unlimited</h3>
                  <p className="text-white/70 text-sm">
                    No registration required, no limits on usage. Count as many words as you need, whenever you need, completely free.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mobile Friendly</h3>
                  <p className="text-white/70 text-sm">
                    Fully responsive design works perfectly on all devices - desktop, tablet, and mobile. Count words on the go.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Who Uses Our Word Counter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Students & Academics</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Perfect for essays, research papers, and assignments with specific word count requirements. Ensure your academic work meets length guidelines and track your writing progress.
              </p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Writers & Bloggers</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Track article length, monitor blog post word counts, and optimize content for SEO. Maintain consistency across your writing projects and meet editorial guidelines.
              </p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Content Marketers</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Create social media posts within character limits, optimize meta descriptions, and ensure content meets platform requirements. Perfect for Twitter, LinkedIn, and Facebook posts.
              </p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Legal Professionals</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Draft legal documents, contracts, and briefs with precise word counts. Meet court filing requirements and ensure compliance with document length restrictions.
              </p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Journalists & Editors</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Write articles within publication word limits, edit content to fit space constraints, and maintain consistent article lengths across different sections.
              </p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Translators</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Calculate translation costs based on word count, ensure translated text matches source length requirements, and track project progress efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                How accurate is the word counter?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our word counter uses advanced algorithms to accurately count words, characters, sentences, and paragraphs. It follows standard word counting conventions used by most word processors and is highly accurate for all types of text content.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Does the word counter work offline?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Once the page is loaded, all counting happens in your browser using JavaScript. You don't need an internet connection for the word counter to work. Your text is processed locally on your device.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is there a limit to how much text I can count?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                No, there's no limit! You can paste and count as much text as you want. The tool can handle everything from short tweets to full-length novels without any restrictions.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is my text saved or stored anywhere?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                No, your text is never saved, stored, or transmitted to any server. All processing happens locally in your browser, and your content remains completely private. When you close the page, your text is gone.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                What's the difference between characters and characters without spaces?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                "Characters" counts every single character including spaces, punctuation, and line breaks. "Characters without spaces" only counts letters, numbers, and punctuation marks, excluding all whitespace. This is useful for platforms with character limits that don't count spaces.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                How does the sentence counter work?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                The sentence counter identifies sentences by looking for punctuation marks like periods (.), exclamation marks (!), and question marks (?). It intelligently handles abbreviations and multiple punctuation marks to provide accurate sentence counts.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I use this for SEO content optimization?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely! Many SEO professionals use word counters to ensure their content meets optimal length requirements. Blog posts typically perform best between 1,500-2,500 words, and our tool helps you track this easily.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Does it work with languages other than English?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Our word counter works with all languages and character sets, including non-Latin scripts like Arabic, Chinese, Japanese, Korean, Cyrillic, and more. It accurately counts words and characters regardless of the language.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I copy and paste from Microsoft Word or Google Docs?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes, you can easily copy text from any source including Microsoft Word, Google Docs, PDFs, websites, or any other text editor and paste it directly into our word counter. Formatting will be removed, but all text will be counted accurately.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is this tool free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes, our word counter is 100% free with no hidden costs, no registration required, and no usage limits. We believe everyone should have access to quality writing tools without barriers.
              </p>
            </div>
          </div>
        </div>

        <PageContent />
      </div>
    </Layout>
  );
};

export default WordCounter;