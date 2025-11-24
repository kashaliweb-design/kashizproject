import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');

  const convertCase = (type: string) => {
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case 'sentence':
        return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
      case 'alternate':
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      case 'inverse':
        return text.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      default:
        return text;
    }
  };

  const copyToClipboard = (convertedText: string) => {
    navigator.clipboard.writeText(convertedText);
  };

  const conversions = [
    { type: 'uppercase', label: 'UPPERCASE', gradient: 'from-blue-500 to-cyan-600' },
    { type: 'lowercase', label: 'lowercase', gradient: 'from-purple-500 to-pink-600' },
    { type: 'capitalize', label: 'Capitalize Each Word', gradient: 'from-green-500 to-emerald-600' },
    { type: 'sentence', label: 'Sentence case', gradient: 'from-red-500 to-pink-600' },
    { type: 'alternate', label: 'aLtErNaTe CaSe', gradient: 'from-yellow-500 to-orange-600' },
    { type: 'inverse', label: 'iNVERSE cASE', gradient: 'from-cyan-500 to-blue-600' }
  ];

  return (
    <Layout title="Text Case Converter" showBackButton>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Enter your text:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert case..."
            className="w-full h-32 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conversions.map((conversion) => {
            const convertedText = convertCase(conversion.type);
            return (
              <div key={conversion.type} className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-medium">{conversion.label}</h3>
                  <button
                    onClick={() => copyToClipboard(convertedText)}
                    className={`px-3 py-1 bg-gradient-to-r ${conversion.gradient} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
                  >
                    Copy
                  </button>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 min-h-[80px]">
                  <p className="text-white/90 whitespace-pre-wrap">{convertedText || 'Converted text will appear here...'}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* What is Convert Case Tool Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            What is a Convert Case Tool?
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Welcome to <strong className="text-white">Tolistaan</strong>, the most accurate and <strong className="text-white">Free Online Case Converter Tool</strong> on the internet. Our Convert Case tool helps you instantly transform any text into multiple formats such as Sentence Case, Lowercase Letters, UPPERCASE, Title Case, alternated text, and many more.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Whether you're a student, writer, blogger, or professional, Tolistaan makes it easy to <strong className="text-white">Convert Uppercase to Lowercase</strong>, fix capitalization errors, or format text professionally with just one click.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            If your keyboard is stuck on CAPS LOCK, or you need a clean, readable format for your writing, our <strong className="text-white">case converter tool</strong> gives you fast, error-free results.
          </p>
        </div>

        {/* Case Conversion Options Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Text Case Conversion Options
          </h2>
          <div className="space-y-6">
            {/* Sentence Case */}
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                Sentence Case
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Our <strong className="text-white">Sentence Case Converter</strong> automatically converts your entire text into perfect sentence style. It capitalizes only the first letter of the sentence and converts the rest into lowercase. This tool is ideal for writers who want to <strong className="text-white">change to sentence case</strong> effortlessly or fix improperly typed text. Whether your text came from notes, copied content, or CAPS LOCK mistakes, the sentence case tool corrects everything instantly.
              </p>
            </div>

            {/* Lower Case */}
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                Lower Case
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Need to convert text into small letters? Tolistaan's <strong className="text-white">Lowercase letter tool</strong> instantly converts all characters into clean, simple lowercase formatting. It is also perfect for <strong className="text-white">converting capital letter to small letter</strong> or doing fast transformations like <strong className="text-white">caps to lowercase</strong> or using our <strong className="text-white">caps to lowercase converter</strong> when an accidental uppercase text appears.
              </p>
            </div>

            {/* Upper Case */}
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </span>
                Upper Case
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Want to convert all text into capital letters? The <strong className="text-white">all caps converter</strong> instantly transforms any sentence into UPPERCASE letters. Great for headings, emphasis text, formal documents, and when you need quick <strong className="text-white">Text Case Convert</strong> features that remove formatting errors.
              </p>
            </div>

            {/* Capitalized Case */}
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </span>
                Capitalized Case
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                The <strong className="text-white">Capitalized Case tool</strong> capitalizes the first letter of every word, making your text look neat, professional, and ready for branding or titles. This option is especially helpful for social media posts, names, product titles, and formatting long blocks of text.
              </p>
            </div>

            {/* Alternating Case */}
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </span>
                Alternating Case
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                If you want fun, creative, eye-catching text, the <strong className="text-white">Convert to Alternate Case</strong> tool changes your sentence into alternating upper and lowercase letters. Perfect for memes, fun messages, or unique styling.
              </p>
            </div>

            {/* Title Case */}
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Title Case
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Tolistaan's <strong className="text-white">Title Case Converter Tool</strong> uses advanced rules to format your titles professionally — just like books, articles, and headlines. Our <strong className="text-white">title capitalization converter</strong> and <strong className="text-white">title case tool</strong> fix capitalization rules for English titles, ensuring the first letter of important words is capitalized correctly.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Text Tools Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Additional Text Formatting Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Small Text Generator</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Generate stylish, tiny-font text with the <strong className="text-white">Small Text Generator</strong>. This tool converts your text into Unicode small characters, ideal for social media bios, captions, and aesthetic writing.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12m-12 5h12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Wide Text Generator</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use the <strong className="text-white">Wide Text Generator</strong> to add spacing between letters, creating a stretched-out visual effect. Great for design work and creative formatting.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Strikethrough Text Generator</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                The <strong className="text-white">Strikethrough Text Generator</strong> lets you cross out text for memes, corrections, edits, or creative writing. One click adds strikethrough formatting to any sentence.
              </p>
            </div>
          </div>
        </div>

        {/* Easy Way to Change Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            An Easy Way to Change Uppercase to Lowercase and Title Capitalization
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
            Tolistaan gives you the easiest way to <strong className="text-white">Convert Uppercase to Lowercase</strong>, fix capitalization errors, and format text into title, sentence, or capitalized style.
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            No need to manually retype your text — simply paste it, choose a case format, and get instant results.
          </p>
        </div>

        {/* Case Converter Tool Features Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Case Converter Tool to Easily Transform Any Text
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Our <strong className="text-white">Free Online Case Converter Tool</strong> helps you transform text quickly:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
              <span className="text-white/80 text-sm">Uppercase</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <span className="text-white/80 text-sm">Lowercase</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <span className="text-white/80 text-sm">Sentence Case</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600"></div>
              <span className="text-white/80 text-sm">Title Case</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <span className="text-white/80 text-sm">Alternating Case</span>
            </div>
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <span className="text-white/80 text-sm">Capitalized Case</span>
            </div>
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6">
            Tolistaan makes <strong className="text-white">Convert Case Online</strong> simple, fast, and accurate.
          </p>
        </div>

        {/* Advanced Features Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Advanced Text Conversion Features
          </h2>
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Convert to Toggle Case</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                The <strong className="text-white">Toggle Case</strong> feature flips every letter — uppercase becomes lowercase and lowercase becomes uppercase. This is perfect when text is typed incorrectly or when you need a stylistic variation.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Change Text Case to Sentence Case</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                If your text is in all caps or fully lowercase, you can <strong className="text-white">change text case to sentence case</strong> with a single click. Useful for writers and editors who need quick formatting without manual effort.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Convert Lower Case To Upper Case Letters</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Instantly transform any lowercase text into clean uppercase formatting. Perfect for headings, announcements, and bold statements.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Text Converter: Capital Letters and Small Letters</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3">
                Using our advanced <strong className="text-white">Text Case Convert tool</strong>, you can switch between capital letters and small letters flawlessly. It works better and faster than formatting in documents like Word.
              </p>
              <p className="text-white/70 text-sm leading-relaxed">This includes conversions like:</p>
              <ul className="list-disc list-inside text-white/70 text-sm leading-relaxed mt-2 space-y-1">
                <li><strong className="text-white">capital letters to small converter</strong></li>
                <li><strong className="text-white">uppercase to lowercase in Word alternative</strong></li>
                <li><strong className="text-white">caps lock converter</strong></li>
              </ul>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Tolistaan simplifies everything with one click.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Convert to Alternate Case</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Use the <strong className="text-white">Alternating Case tool</strong> to create playful and visually interesting text. It switches between uppercase and lowercase letters automatically, giving you a unique text style.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features and Benefits Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Key Features and Benefits
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Real-Time Processing</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The tool offers real-time processing that delivers instant results as you work, ensuring you don't waste time waiting. Experience lightning-fast performance with every conversion.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">User-Friendly Interface</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Features an intuitive, user-friendly interface that makes it accessible to users of all skill levels, from beginners to experts. No technical knowledge required.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fully Responsive & Mobile-Compatible</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The tool is fully responsive and mobile-compatible, working seamlessly across desktop computers, tablets, and smartphones. Convert text on any device, anywhere.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Complete Privacy & Security</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    No registration or account creation is required. All processing happens securely in your browser, ensuring complete privacy and data security. Your text never leaves your device.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">100% Free to Use</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Completely free to use with no hidden costs, limitations, or premium features locked behind paywalls. Professional-grade tools accessible to everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Optimized for Speed & Efficiency</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The tool is optimized for speed and efficiency, handling even complex tasks with ease. Supports various input formats and provides flexible output options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How to Use Case Converter
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-6">
            Using the Case Converter tool on Toolistan is incredibly simple and straightforward, designed with user experience in mind.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Navigate to the Tool</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Start by navigating to the Case Converter page on our website through the main menu or search function. Once on the page, you'll see a clean, intuitive interface with clear instructions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Enter Your Text</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Simply paste or type your text into the input area provided. The tool processes your input instantly and displays results in a clear, easy-to-read format.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Choose Your Conversion</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Select from multiple case conversion options including uppercase, lowercase, title case, sentence case, alternate case, and inverse case. Each conversion is displayed instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Copy Your Results</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  You can copy the results to your clipboard with a single click, download them in various formats, or perform additional operations as needed. No technical knowledge or expertise is required.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              The interface includes helpful tooltips and guidance to assist you through each step. The tool remembers your preferences for a better user experience while maintaining complete privacy and security.
            </p>
          </div>
        </div>

        {/* Applications and Use Cases Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Applications and Use Cases
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-6">
            The Case Converter tool serves a wide range of applications and use cases across different industries and user groups.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Writers & Editors</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Writers and editors use these tools to analyze and format text for articles, books, and documents. Perfect for ensuring consistent formatting across large documents and publications.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Students</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Students rely on them for essays and assignments with specific formatting requirements. Invaluable for academic projects, assignments, and research work with strict style guidelines.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Content Creators</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Content creators use them to optimize social media posts and blog content. Digital marketers rely on it for producing high-quality content and optimizing their online presence.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Programmers & Developers</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Programmers use them for code formatting and data processing. Developers leverage it for various technical tasks, testing purposes, and maintaining code consistency.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Professionals</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Professionals use it to streamline their daily workflows and improve efficiency in their work. Perfect for business documents, presentations, and professional communications.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Small Business Owners</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Small business owners leverage it to save time and resources on tasks that would otherwise require expensive software or services. Ideal for marketing materials and customer communications.
              </p>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
            <p className="text-white/80 text-base leading-relaxed">
              The tool's versatility makes it suitable for both personal and professional use, handling everything from simple everyday tasks to complex professional requirements. Its reliability and accuracy have made it a trusted choice for thousands of users worldwide who depend on it for their daily needs.
            </p>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default CaseConverter;