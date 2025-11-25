import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const ReverseText: React.FC = () => {
  const [text, setText] = useState('');

  const reverseOptions = [
    {
      title: 'Reverse Text',
      description: 'Reverse the entire text character by character',
      function: (str: string) => str.split('').reverse().join(''),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Reverse Words',
      description: 'Reverse the order of words',
      function: (str: string) => str.split(' ').reverse().join(' '),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Reverse Lines',
      description: 'Reverse the order of lines',
      function: (str: string) => str.split('\n').reverse().join('\n'),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Reverse Each Word',
      description: 'Reverse characters in each word separately',
      function: (str: string) => str.split(' ').map(word => word.split('').reverse().join('')).join(' '),
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: 'Reverse Sentences',
      description: 'Reverse the order of sentences',
      function: (str: string) => str.split(/([.!?]+)/).filter(s => s.trim()).reverse().join(''),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Flip Text',
      description: 'Flip text upside down using Unicode',
      function: (str: string) => {
        const flipMap: { [key: string]: string } = {
          'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
          'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
          'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
          'y': 'ʎ', 'z': 'z', '?': '¿', '!': '¡', '.': '˙', ',': "'", "'": ',', '"': '„',
          '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0'
        };
        return str.toLowerCase().split('').map(char => flipMap[char] || char).reverse().join('');
      },
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <Layout 
      title="Reverse Text" 
      showBackButton
      seoTitle="Text Reverser – Reverse Text Online | Free Backwards Generator"
      seoDescription="Use Toolistaan's Text Reverser to instantly reverse text online. Free, fast, and easy backwards text generator for fun or work. Try it now"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to reverse..."
            className="w-full h-32 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={clearText}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reverseOptions.map((option, index) => {
            const reversedText = text ? option.function(text) : '';
            return (
              <div key={index} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium">{option.title}</h3>
                    <p className="text-white/60 text-sm">{option.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(reversedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${option.gradient} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[80px]">
                  <p className="text-white/90 whitespace-pre-wrap break-all">
                    {reversedText || 'Reversed text will appear here...'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Introduction Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Reverse Text Generator — Tolistaan
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Welcome to <strong className="text-white">Tolistaan</strong>, your ultimate <strong className="text-white">Text Reverser</strong> and <strong className="text-white">Backwards Text Generator</strong>. Our Reverse Text Generator is designed to help you flip, invert, or reverse any text, letters, or sentences instantly. Whether you want to have fun, create unique messages, or experiment with text formatting, this <strong className="text-white">Backwards Text Generator</strong> makes it fast and easy.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            With our <strong className="text-white">Reverse String tool</strong>, you can reverse text, reverse words, or even reverse entire paragraphs. It's perfect for creative writing, coding, puzzles, games, or simply surprising your friends with something unusual.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Tolistaan's Reverse Text Generator Works
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Our <strong className="text-white">Text Reverse Tool</strong> provides multiple options to reverse and transform your text:
          </p>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Reverse Text</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Flip the order of characters in your text instantly.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Reverse Wording</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Reverse each word while keeping the word order intact.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Flip Text</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Turn your text upside down or mirror it with fun backward fonts.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Reverse Word's Lettering</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Reverse letters of each word individually for creative effect.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              It works for names, sentences, paragraphs, or even code. For example, spelling <strong className="text-white">"Liam"</strong> backwards gives <strong className="text-white">"Mail,"</strong> which can make text fun or surprising.
            </p>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use a Backwards Text Generator?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            You may wonder why you'd want to reverse text. Here are some practical and fun uses for our <strong className="text-white">Backwards Text Generator</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Creative Messaging</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Send reversed messages to friends, e.g., <strong className="text-white">"I love you"</strong> becomes <strong className="text-white">"uoy evol I."</strong>
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Fun & Humor</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Create funny phrases or strange words by reversing letters.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Palindrome Detection</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Check words or phrases that remain the same when reversed, e.g., <strong className="text-white">"racecar"</strong> or <strong className="text-white">"madam."</strong>
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Games & Puzzles</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use reversed text for brain teasers or coding exercises.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Professional Applications</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Reverse FEN strings in chess, DNA sequences in biology, or sort email lists by domain name.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Right-to-Left Languages</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Convert Hebrew or Arabic text with our <strong className="text-white">backward text generator</strong> and <strong className="text-white">backward letter font</strong> tools.
              </p>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Examples of Reversed Text
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Try reversing these famous phrases with our <strong className="text-white">Backward Text Converter</strong>:
          </p>
          <div className="space-y-3">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4">
              <p className="text-white/80 text-sm sm:text-base">"was it a car or a cat i saw"</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4">
              <p className="text-white/80 text-sm sm:text-base">"a man a plan a canal panama"</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4">
              <p className="text-white/80 text-sm sm:text-base">"rats live on no evil star"</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4">
              <p className="text-white/80 text-sm sm:text-base">"deny a pioneer free beer?"</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4">
              <p className="text-white/80 text-sm sm:text-base">"go hang a salami im a lasagna hog"</p>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4">
              <p className="text-white/80 text-sm sm:text-base">Names like "Bob," "Anna," and "Hannah"</p>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            With Tolistaan, the possibilities are endless — your creativity is the limit.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Key Features of Tolistaan's Text Reverser
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Backwards Text Generator</strong> for words, sentences, or paragraphs</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Reverse String tool</strong> for coding and fun text manipulation</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Sentence Reverser</strong> to reorder words in a sentence</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Backward Font & Letter Font</strong> for creative designs</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Backward Text Converter</strong> for multiple languages, including Arabic and Hebrew</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Backwards Generator</strong> for easy and instant results</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3 sm:col-span-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-red-600"></div>
              <span className="text-white/80 text-sm"><strong className="text-white">Copy & Paste Ready:</strong> Use reversed text in Google Docs, Word, social media, or anywhere</span>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How to Use the Reverse Text Tool
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Paste your text into the Tolistaan <strong className="text-white">Reverse Text Generator</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Choose the desired option: <strong className="text-white">Reverse Text, Reverse Words, Flip Text, or Reverse Letters</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Get instant reversed text that's ready to copy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                4
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Share it, save it, or use it in your document.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              It's that simple, no downloads, no installations, just a <strong className="text-white">Free Online Text Reverse Tool</strong>.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            FAQs — Reverse Text Generator Tool
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What is a Reverse Text Generator?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A <strong className="text-white">Reverse Text Generator</strong> is an online tool that flips your text, letters, or sentences backward. It allows you to create backwards text, reversed words, or mirrored text for fun, creative messages, coding, games, and more.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. How do I use the Text Reverser on Tolistaan?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Simply paste your text into the Tolistaan <strong className="text-white">Text Reverse Tool</strong>, select your preferred option (Reverse Text, Reverse Wording, Flip Text, or Reverse Letters), and click the button. Your text will instantly appear in reversed form, ready to copy and use anywhere.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Can I reverse sentences and paragraphs?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Tolistaan's <strong className="text-white">Backwards Text Generator</strong> works for single words, sentences, or entire paragraphs. You can also reverse letters of each word individually or flip the word order in a sentence using our sentence reverser feature.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Can I use this tool for languages like Arabic or Hebrew?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely! Our <strong className="text-white">Backward Text Converter</strong> supports right-to-left languages such as Arabic and Hebrew. You can reverse and format text correctly without affecting the original structure.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Is the Reverse Text Generator free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Tolistaan offers this <strong className="text-white">Free Online Backwards Text Generator Tool</strong> with unlimited usage. No downloads, sign-ups, or subscriptions are required — just paste your text and reverse it instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default ReverseText;