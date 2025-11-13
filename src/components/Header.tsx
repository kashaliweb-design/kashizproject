import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Calculator, Type, ArrowRightLeft, ChevronDown, Palette, FileText, Music, Video, Globe, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toolCategories = {
    'text-tools': {
      title: 'Text Tools',
      icon: Type,
      color: 'text-blue-400',
      tools: [
        { name: 'Word Counter', path: '/text-tools/word-counter' },
        { name: 'Character Counter', path: '/text-tools/character-counter' },
        { name: 'Sentence Counter', path: '/text-tools/sentence-counter' },
        { name: 'Paragraph Counter', path: '/text-tools/paragraph-counter' },
        { name: 'Case Converter', path: '/text-tools/case-converter' },
        { name: 'Remove Duplicates', path: '/text-tools/remove-duplicates' },
        { name: 'Reverse Text', path: '/text-tools/reverse-text' },
        { name: 'Text to Binary', path: '/text-tools/text-to-binary' },
        { name: 'Text to ASCII', path: '/text-tools/text-to-ascii' },
        { name: 'Remove Extra Spaces', path: '/text-tools/remove-extra-spaces' },
        { name: 'Alphabetical Order', path: '/text-tools/alphabetical-order' },
        { name: 'Text Sorter', path: '/text-tools/text-sorter' },
        { name: 'Palindrome Checker', path: '/text-tools/palindrome-checker' },
        { name: 'Text Encryptor', path: '/text-tools/text-encryptor' },
        { name: 'ROT13 Encoder', path: '/text-tools/rot13-encoder' },
        { name: 'Text to Morse', path: '/text-tools/text-to-morse' },
        { name: 'Text to Hex', path: '/text-tools/text-to-hex' },
        { name: 'Text to Octal', path: '/text-tools/text-to-octal' }
      ]
    },
    'calculator-tools': {
      title: 'Calculator Tools',
      icon: Calculator,
      color: 'text-green-400',
      tools: [
        { name: 'Basic Calculator', path: '/calculator-tools/basic-calculator' },
        { name: 'Age Calculator', path: '/calculator-tools/age-calculator' },
        { name: 'BMI Calculator', path: '/calculator-tools/bmi-calculator' },
        { name: 'Percentage Calculator', path: '/calculator-tools/percentage-calculator' },
        { name: 'Discount Calculator', path: '/calculator-tools/discount-calculator' },
        { name: 'Loan Calculator', path: '/calculator-tools/loan-calculator' },
        { name: 'EMI Calculator', path: '/calculator-tools/emi-calculator' },
        { name: 'Tip Calculator', path: '/calculator-tools/tip-calculator' },
        { name: 'Date Difference', path: '/calculator-tools/date-difference' },
        { name: 'GST Calculator', path: '/calculator-tools/gst-calculator' },
        { name: 'Compound Interest', path: '/calculator-tools/compound-interest' },
        { name: 'Simple Interest', path: '/calculator-tools/simple-interest' },
        { name: 'Area Calculator', path: '/calculator-tools/area-calculator' },
        { name: 'Volume Calculator', path: '/calculator-tools/volume-calculator' },
        { name: 'Love Calculator', path: '/calculator-tools/love-calculator' }
      ]
    },
    'unit-converters': {
      title: 'Unit Converters',
      icon: ArrowRightLeft,
      color: 'text-purple-400',
      tools: [
        { name: 'Length Converter', path: '/unit-converters/length-converter' },
        { name: 'Weight Converter', path: '/unit-converters/weight-converter' },
        { name: 'Temperature Converter', path: '/unit-converters/temperature-converter' },
        { name: 'Speed Converter', path: '/unit-converters/speed-converter' },
        { name: 'Time Converter', path: '/unit-converters/time-converter' },
        { name: 'Area Converter', path: '/unit-converters/area-converter' },
        { name: 'Volume Converter', path: '/unit-converters/volume-converter' },
        { name: 'Pressure Converter', path: '/unit-converters/pressure-converter' },
        { name: 'Energy Converter', path: '/unit-converters/energy-converter' },
        { name: 'Data Storage Converter', path: '/unit-converters/data-storage-converter' },
        { name: 'Power Converter', path: '/unit-converters/power-converter' },
        { name: 'Currency Converter', path: '/unit-converters/currency-converter' }
      ]
    },
    'color-tools': {
      title: 'Color Tools',
      icon: Palette,
      color: 'text-pink-400',
      tools: [
        { name: 'Color Picker', path: '/color-tools/color-picker' },
        { name: 'Color Converter', path: '/color-tools/color-converter' },
        { name: 'Gradient Generator', path: '/color-tools/gradient-generator' },
        { name: 'Color Palette Generator', path: '/color-tools/color-palette-generator' },
        { name: 'Random Color Generator', path: '/color-tools/random-color-generator' },
        { name: 'Color Contrast Checker', path: '/color-tools/color-contrast-checker' },
        { name: 'Hex to RGB', path: '/color-tools/hex-to-rgb' },
        { name: 'RGB to Hex', path: '/color-tools/rgb-to-hex' }
      ]
    },
    'seo-tools': {
      title: 'SEO Tools',
      icon: Search,
      color: 'text-emerald-400',
      tools: [
        { name: 'Meta Tag Generator', path: '/seo-tools/meta-tag-generator' },
        { name: 'Keyword Density Checker', path: '/seo-tools/keyword-density-checker' },
        { name: 'URL Slug Generator', path: '/seo-tools/url-slug-generator' },
        { name: 'Sitemap Generator', path: '/seo-tools/sitemap-generator' },
        { name: 'Robots.txt Generator', path: '/seo-tools/robots-generator' },
        { name: 'Heading Analyzer', path: '/seo-tools/heading-analyzer' },
        { name: 'Open Graph Generator', path: '/seo-tools/open-graph-generator' },
        { name: 'Schema Markup Generator', path: '/seo-tools/schema-markup-generator' },
        { name: 'SEO Analyzer', path: '/seo-tools/seo-analyzer' },
        { name: 'Page Speed Analyzer', path: '/seo-tools/page-speed-analyzer' },
        { name: 'Backlink Checker', path: '/seo-tools/backlink-checker' },
        { name: 'Google Index Checker', path: '/seo-tools/google-index-checker' },
        { name: 'Link Analyzer', path: '/seo-tools/link-analyzer' },
        { name: 'Image SEO Analyzer', path: '/seo-tools/image-seo-analyzer' },
        { name: 'Social Media Preview', path: '/seo-tools/social-media-preview' },
        { name: 'Canonical Tag Generator', path: '/seo-tools/canonical-tag-generator' }
      ]
    },
    'web-tools': {
      title: 'Web Tools',
      icon: Globe,
      color: 'text-cyan-400',
      tools: [
        { name: 'QR Code Generator', path: '/web-tools/qr-code-generator' },
        { name: 'Password Generator', path: '/web-tools/password-generator' },
        { name: 'URL Shortener', path: '/web-tools/url-shortener' },
        { name: 'Base64 Encoder', path: '/web-tools/base64-encoder' },
        { name: 'JSON Formatter', path: '/web-tools/json-formatter' },
        { name: 'HTML Minifier', path: '/web-tools/html-minifier' },
        { name: 'CSS Minifier', path: '/web-tools/css-minifier' },
        { name: 'JS Minifier', path: '/web-tools/js-minifier' },
        { name: 'HTML Validator', path: '/web-tools/html-validator' },
        { name: 'CSS Validator', path: '/web-tools/css-validator' },
        { name: 'Lorem Ipsum Generator', path: '/web-tools/lorem-ipsum-generator' },
        { name: 'URL Encoder', path: '/web-tools/url-encoder' },
        { name: 'Hash Generator', path: '/web-tools/hash-generator' },
        { name: 'Regex Tester', path: '/web-tools/regex-tester' },
        { name: 'IP Lookup', path: '/web-tools/ip-lookup' },
        { name: 'User Agent Parser', path: '/web-tools/user-agent-parser' },
        { name: 'WHOIS Lookup', path: '/web-tools/whois-lookup' },
        { name: 'DNS Lookup', path: '/web-tools/dns-lookup' },
        { name: 'SSL Checker', path: '/web-tools/ssl-checker' },
        { name: 'Website Screenshot', path: '/web-tools/website-screenshot' },
        { name: 'Ping Tester', path: '/web-tools/ping-tester' },
        { name: 'Port Scanner', path: '/web-tools/port-scanner' },
        { name: 'HTTP Header Checker', path: '/web-tools/http-header-checker' },
        { name: 'Website Analyzer', path: '/web-tools/website-analyzer' },
        { name: 'Meta Tag Extractor', path: '/web-tools/meta-tag-extractor' },
        { name: 'CORS Checker', path: '/web-tools/cors-checker' },
        { name: 'Redirect Checker', path: '/web-tools/redirect-checker' },
        { name: 'Robots.txt Validator', path: '/web-tools/robots-txt-validator' },
        { name: 'Sitemap Validator', path: '/web-tools/sitemap-validator' },
        { name: 'Web Page Word Counter', path: '/web-tools/web-page-word-counter' },
        { name: 'Broken Link Checker', path: '/web-tools/broken-link-checker' },
        { name: 'HTTP Status Checker', path: '/web-tools/http-status-checker' },
        { name: 'Domain Age Checker', path: '/web-tools/domain-age-checker' },
        { name: 'Website Speed Test', path: '/web-tools/website-speed-test' }
      ]
    },
    'file-tools': {
      title: 'File Tools',
      icon: FileText,
      color: 'text-orange-400',
      tools: [
        { name: 'CSV to JSON', path: '/file-tools/csv-to-json' },
        { name: 'JSON to CSV', path: '/file-tools/json-to-csv' },
        { name: 'TXT to PDF', path: '/file-tools/txt-to-pdf' },
        { name: 'ZIP Extractor', path: '/file-tools/zip-extractor' }
      ]
    },
    'audio-tools': {
      title: 'Audio Tools',
      icon: Music,
      color: 'text-purple-400',
      tools: [
        { name: 'MP3 Cutter', path: '/audio-tools/mp3-cutter' },
        { name: 'Audio Converter', path: '/audio-tools/audio-converter' }
      ]
    },
    'video-tools': {
      title: 'Video Tools',
      icon: Video,
      color: 'text-red-400',
      tools: [
        { name: 'Video Cutter', path: '/video-tools/video-cutter' }
      ]
    }
  };

  return (
    <header className="backdrop-blur-md bg-black/30 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg">
              <Menu className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Toolify</h1>
              <p className="text-white/60 text-xs">All-in-One Tool Collection</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
              <Home size={18} />
              <span>Home</span>
            </Link>

            {/* All Tools Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('all-tools')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
                <Menu size={18} />
                <span>All Tools</span>
                <ChevronDown size={14} />
              </button>

              {/* All Tools Mega Menu Dropdown */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 z-50 ${
                activeMegaMenu === 'all-tools' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <div className="backdrop-blur-md bg-black/95 border border-white/10 rounded-xl shadow-2xl p-4 sm:p-6 w-[95vw] sm:w-[90vw] max-w-6xl max-h-[85vh] overflow-y-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Menu size={20} className="text-cyan-400 sm:w-6 sm:h-6" />
                      <h3 className="text-white font-semibold text-lg sm:text-xl">All Tools</h3>
                      <span className="text-white/50 text-xs sm:text-sm">({Object.values(toolCategories).reduce((acc, cat) => acc + cat.tools.length, 0)} tools)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {Object.entries(toolCategories).map(([key, category]) => {
                      const IconComponent = category.icon;
                      return (
                        <div key={key} className="backdrop-blur-sm bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
                          <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-2 border-b border-white/10">
                            <IconComponent size={18} className={category.color} />
                            <h4 className="text-white font-semibold text-sm sm:text-base">{category.title}</h4>
                            <span className="text-white/40 text-xs ml-auto">({category.tools.length})</span>
                          </div>
                          <div className="space-y-0.5 sm:space-y-1">
                            {category.tools.map((tool, index) => (
                              <Link
                                key={index}
                                to={tool.path}
                                className="block px-2 sm:px-3 py-1 sm:py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-all text-xs sm:text-sm rounded"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                {tool.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - All Tools */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] z-40 bg-black/90 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Menu size={20} className="text-cyan-400" />
                    <h3 className="text-white font-semibold text-lg">All Tools</h3>
                    <span className="text-white/50 text-xs">({Object.values(toolCategories).reduce((acc, cat) => acc + cat.tools.length, 0)})</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                {/* Home Link */}
                <Link
                  to="/"
                  className="flex items-center gap-3 py-2.5 px-3 mb-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} />
                  <span className="text-sm font-medium">Home</span>
                </Link>

                {/* Categories */}
                <div className="space-y-3">
                  {Object.entries(toolCategories).map(([key, category]) => {
                    const IconComponent = category.icon;
                    const [isExpanded, setIsExpanded] = useState(false);
                    return (
                      <div key={key} className="backdrop-blur-sm bg-white/5 rounded-lg p-3 border border-white/10">
                        <button
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="w-full flex items-center justify-between gap-2 text-white font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent size={18} className={category.color} />
                            <span className="text-sm">{category.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/50 text-xs">({category.tools.length})</span>
                            <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="mt-2 pt-2 border-t border-white/10 space-y-0.5">
                            {category.tools.map((tool, index) => (
                              <Link
                                key={index}
                                to={tool.path}
                                className="block py-1.5 px-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors text-xs"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {tool.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;