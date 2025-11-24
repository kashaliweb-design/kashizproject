import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const TextSorter: React.FC = () => {
  const [text, setText] = useState('');
  const [sortType, setSortType] = useState('alphabetical');

  const sortOptions = [
    {
      id: 'alphabetical',
      title: 'Alphabetical (A-Z)',
      description: 'Sort lines alphabetically',
      function: (lines: string[]) => lines.sort((a, b) => a.localeCompare(b)),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'reverse-alphabetical',
      title: 'Reverse Alphabetical (Z-A)',
      description: 'Sort lines in reverse alphabetical order',
      function: (lines: string[]) => lines.sort((a, b) => b.localeCompare(a)),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'length-ascending',
      title: 'Length (Short to Long)',
      description: 'Sort by line length (ascending)',
      function: (lines: string[]) => lines.sort((a, b) => a.length - b.length),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'length-descending',
      title: 'Length (Long to Short)',
      description: 'Sort by line length (descending)',
      function: (lines: string[]) => lines.sort((a, b) => b.length - a.length),
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 'random',
      title: 'Random Shuffle',
      description: 'Randomly shuffle the lines',
      function: (lines: string[]) => {
        const shuffled = [...lines];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      },
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'reverse-order',
      title: 'Reverse Order',
      description: 'Reverse the current order of lines',
      function: (lines: string[]) => lines.reverse(),
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const getSortedText = () => {
    if (!text.trim()) return '';
    
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const selectedOption = sortOptions.find(option => option.id === sortType);
    
    if (selectedOption) {
      const sortedLines = selectedOption.function([...lines]);
      return sortedLines.join('\n');
    }
    
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getSortedText());
  };

  const clearText = () => {
    setText('');
  };

  const sortedText = getSortedText();
  const selectedOption = sortOptions.find(option => option.id === sortType);

  return (
    <Layout title="Text Sorter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Original Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text lines to sort..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            {/* Sort Type Selection */}
            <div className="mt-4">
              <h4 className="text-white/70 font-medium mb-3">Sort Type</h4>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="sortType"
                      value={option.id}
                      checked={sortType === option.id}
                      onChange={(e) => setSortType(e.target.value)}
                      className="text-cyan-500"
                    />
                    <div>
                      <div className="text-white/90 text-sm font-medium">{option.title}</div>
                      <div className="text-white/60 text-xs">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Sorted Text</h3>
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1 bg-gradient-to-r ${selectedOption?.gradient || 'from-green-500 to-emerald-600'} text-white text-sm rounded-md hover:opacity-90 transition-opacity`}
              >
                Copy
              </button>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm">
                {sortedText || 'Sorted text will appear here...'}
              </pre>
            </div>

            {/* Statistics */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {text ? text.split('\n').filter(line => line.trim() !== '').length : 0}
                </div>
                <div className="text-white/70 text-xs">Lines</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {text ? text.split(/\s+/).filter(word => word.trim() !== '').length : 0}
                </div>
                <div className="text-white/70 text-xs">Words</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{text.length}</div>
                <div className="text-white/70 text-xs">Characters</div>
              </div>
            </div>
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

        {/* Introduction Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Text Sorter — Tolistaan
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Welcome to <strong className="text-white">Tolistaan</strong>, your reliable <strong className="text-white">Text Sorter tool</strong>. Our Text Sorter allows you to quickly and easily <strong className="text-white">sort text alphabetically</strong>, numerically, or in custom order. Whether you're managing lists, data, or any written content, this tool ensures your text is clean, organized, and easy to read.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Using Tolistaan's <strong className="text-white">Text Sorter</strong> is simple:
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
                  Choose the sorting option: <strong className="text-white">A-Z, Z-A, numerical order, or custom sorting</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Click the <strong className="text-white">Sort Text</strong> button to instantly organize your content.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              Our tool works with lines, words, or paragraphs, making it perfect for students, writers, developers, and professionals who want to <strong className="text-white">sort text online</strong> efficiently.
            </p>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Tolistaan's Text Sorter?
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Sort Alphabetically or Numerically</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Sort text alphabetically</strong> or numerically with one click.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Organize Long Lists Quickly</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Organize long lists, paragraphs, or word blocks quickly.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Free Online Text Sorter Tool</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Free Online Text Sorter Tool</strong> with instant results.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Works with Multiple Formats</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Works for <strong className="text-white">text sorting in Word, Excel</strong>, or any plain text document.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Save Time</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Save time and ensure your content is neatly arranged.
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
                Paste plain text for best results. Remove formatting before sorting for optimal accuracy.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Multiple Use Cases</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use for names, addresses, product lists, or any dataset that requires organization.
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
                Combine with other Tolistaan tools to <strong className="text-white">remove duplicate lines</strong> or capitalize text for cleaner results.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Verify Output</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Check the output after sorting to ensure it matches your preferred order.
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
                    Tolistaan respects your privacy. Text processed with the <strong className="text-white">Text Sorter Online Tool</strong> is not stored on our servers.
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
                    While we strive for accuracy, users should verify critical data after sorting.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-base leading-relaxed">
              Tolistaan's <strong className="text-white">Text Sorter</strong> is a fast, free, and reliable <strong className="text-white">text sorting tool</strong> that helps you <strong className="text-white">sort text online</strong>, organize data, and make your writing more structured. Start using it today to clean and order your text instantly!
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            FAQs — Text Sorter Tool
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What is a Text Sorter?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A <strong className="text-white">Text Sorter</strong> is an online tool that helps you <strong className="text-white">sort text online</strong> alphabetically, numerically, or in a custom order. It works for words, lines, paragraphs, or lists, making your content organized and easy to read.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. How do I use Tolistaan's Text Sorter?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Paste your text into the Tolistaan <strong className="text-white">Text Sorter</strong> editor, choose your preferred sorting method (A-Z, Z-A, numeric, or custom), and click the <strong className="text-white">Sort Text</strong> button. Your text will be instantly arranged in the selected order.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Can I sort large lists or multiple paragraphs?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Tolistaan's <strong className="text-white">Text Sorter Online Tool</strong> works for any amount of text — from short lists to long paragraphs. It's perfect for documents, spreadsheets, addresses, or any content that needs organization.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Is the Text Sorter free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely! Tolistaan offers this <strong className="text-white">Free Online Text Sorter Tool</strong> with unlimited usage. No downloads, subscriptions, or sign-ups are required.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Is my text safe while using this tool?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes. All text processed using Tolistaan's <strong className="text-white">Text Sorter Online Tool</strong> remains private and is not stored on our servers. You can safely sort your text without worrying about data privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default TextSorter;