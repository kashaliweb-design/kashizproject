import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const RemoveDuplicates: React.FC = () => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    caseSensitive: true,
    keepFirst: true,
    trimWhitespace: true
  });

  const removeDuplicateLines = (inputText: string) => {
    if (!inputText.trim()) return '';

    let lines = inputText.split('\n');
    
    if (options.trimWhitespace) {
      lines = lines.map(line => line.trim());
    }

    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const compareKey = options.caseSensitive ? line : line.toLowerCase();
      
      if (!seen.has(compareKey)) {
        seen.add(compareKey);
        result.push(line);
      } else if (!options.keepFirst) {
        // If not keeping first occurrence, remove previous and add current
        const index = result.findIndex(l => 
          options.caseSensitive ? l === line : l.toLowerCase() === line.toLowerCase()
        );
        if (index !== -1) {
          result.splice(index, 1);
        }
        result.push(line);
      }
    }

    return result.join('\n');
  };

  const getStats = () => {
    const originalLines = text.split('\n').filter(line => line.trim() !== '');
    const processedLines = removeDuplicateLines(text).split('\n').filter(line => line.trim() !== '');
    const duplicatesRemoved = originalLines.length - processedLines.length;

    return {
      original: originalLines.length,
      processed: processedLines.length,
      removed: duplicatesRemoved
    };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(removeDuplicateLines(text));
  };

  const clearText = () => {
    setText('');
  };

  const stats = getStats();
  const processedText = removeDuplicateLines(text);

  return (
    <Layout title="Remove Duplicate Lines" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Original Text</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text with duplicate lines..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            
            {/* Options */}
            <div className="mt-4 space-y-3">
              <h4 className="text-white/70 font-medium">Options</h4>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.caseSensitive}
                  onChange={(e) => setOptions({...options, caseSensitive: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Case sensitive</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.keepFirst}
                  onChange={(e) => setOptions({...options, keepFirst: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Keep first occurrence</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.trimWhitespace}
                  onChange={(e) => setOptions({...options, trimWhitespace: e.target.checked})}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Trim whitespace</span>
              </label>
            </div>
          </div>

          {/* Output Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Processed Text</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm">
                {processedText || 'Processed text will appear here...'}
              </pre>
            </div>

            {/* Statistics */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats.original}</div>
                <div className="text-white/70 text-xs">Original Lines</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{stats.processed}</div>
                <div className="text-white/70 text-xs">Unique Lines</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-400">{stats.removed}</div>
                <div className="text-white/70 text-xs">Duplicates Removed</div>
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
            Remove Duplicates Lines — Tolistaan
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Welcome to <strong className="text-white">Tolistaan.com</strong>, your go-to <strong className="text-white">duplicate line remover online</strong>. Our Remove Duplicates Lines tool allows you to quickly and easily <strong className="text-white">remove duplicate lines online</strong> from any text, document, or code. Whether you are working with lists, paragraphs, or large datasets, this tool ensures your content is clean, organized, and error-free.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Using the Tolistaan <strong className="text-white">Remove Duplicate Lines Online</strong> tool is simple:
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
                  Click the <strong className="text-white">Remove Duplicate Lines</strong> button.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Instantly get your text with all duplicate lines removed.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-sm leading-relaxed">
              You can also <strong className="text-white">find duplicate lines</strong> before removing them to check which content repeats. This tool is perfect for writers, developers, students, and professionals who need to <strong className="text-white">delete duplicate lines</strong> quickly.
            </p>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why Use Tolistaan.com?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Our <strong className="text-white">Remove Duplicate Lines</strong> tool is designed for efficiency and accuracy:
          </p>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Remove All Duplicate Lines from Text</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Remove All Duplicate Lines from Text</strong> with one click.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">No Software Download Required</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Delete Duplicate Lines Online</strong> without downloading software.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Check Duplicate Lines</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Check Duplicate Lines</strong> to ensure your text is unique and organized.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Works for All Text Types</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Works for duplicate sentences, long lists, or repetitive code blocks.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast, Reliable, and Free</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Fast, reliable, and completely free to use.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
            <p className="text-white/80 text-base leading-relaxed">
              Tolistaan's tool saves time, prevents errors, and helps maintain clean, professional text.
            </p>
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
                Paste plain text for best results. Remove formatting before processing for optimal accuracy.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Review Output</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Review the output after using the <strong className="text-white">duplicate line finder</strong> to ensure accuracy.
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
                Combine with other Tolistaan tools to <strong className="text-white">remove duplicate sentences</strong> or improve writing quality.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Multiple Use Cases</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use for coding, data lists, articles, or any document with repeated lines.
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
                    Tolistaan respects your privacy. All text processed in the <strong className="text-white">Remove Duplicate Lines Online</strong> tool remains private and is not stored on our servers.
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
                    We strive to ensure the tool is accurate, but users should double-check critical documents before final use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            FAQs — Remove Duplicates Lines Tool
          </h2>
          <div className="space-y-4">
            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. What is the Remove Duplicates Lines tool?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                The <strong className="text-white">Remove Duplicates Lines tool</strong> is an online utility that helps you <strong className="text-white">remove duplicate lines online</strong> from any text, document, or list. It ensures your text is clean, organized, and free of repeated lines or sentences.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. How do I remove duplicate lines using Tolistaan?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Simply paste your text into the Tolistaan editor and click the <strong className="text-white">Remove Duplicate Lines</strong> button. The tool will instantly <strong className="text-white">delete duplicate lines online</strong>, leaving you with a clean, unique version of your text.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Can this tool find duplicate sentences as well?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes! Tolistaan's tool can <strong className="text-white">check duplicate lines</strong> and <strong className="text-white">remove duplicate sentences</strong>, making it perfect for articles, reports, code, or any text with repeating content.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Is Tolistaan's duplicate line remover free to use?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Absolutely! The <strong className="text-white">duplicate line remover online</strong> is completely free with no downloads, subscriptions, or sign-ups required. You can <strong className="text-white">remove all duplicate lines from text</strong> instantly.
              </p>
            </div>

            <div className="backdrop-blur-md bg-black/30 border border-glass rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                5. Is my text safe when using this tool?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Yes. Tolistaan respects your privacy. Text processed with the <strong className="text-white">Remove Duplicate Lines Online</strong> tool is not stored on our servers. You can safely clean your text without worrying about data leaks.
              </p>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default RemoveDuplicates;