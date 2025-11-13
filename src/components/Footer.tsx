import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Mail, Menu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="backdrop-blur-md bg-black/20 border-t border-glass mt-8 sm:mt-12 lg:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg">
                <Menu className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Toolify</h3>
                <p className="text-white/60 text-sm">All-in-One Tools</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Your comprehensive collection of utility tools for text processing, calculations, and unit conversions. All tools are free and work directly in your browser.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Text Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">📝 Text Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/text-tools/word-counter" className="text-white/70 hover:text-white transition-colors text-sm">Word Counter</Link></li>
              <li><Link to="/text-tools/character-counter" className="text-white/70 hover:text-white transition-colors text-sm">Character Counter</Link></li>
              <li><Link to="/text-tools/case-converter" className="text-white/70 hover:text-white transition-colors text-sm">Case Converter</Link></li>
              <li><Link to="/text-tools/text-to-binary" className="text-white/70 hover:text-white transition-colors text-sm">Text to Binary</Link></li>
              <li><Link to="/text-tools/reverse-text" className="text-white/70 hover:text-white transition-colors text-sm">Reverse Text</Link></li>
              <li><Link to="/text-tools/remove-duplicates" className="text-white/70 hover:text-white transition-colors text-sm">Remove Duplicates</Link></li>
            </ul>
          </div>

          {/* Calculator Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">🧮 Calculators</h4>
            <ul className="space-y-2">
              <li><Link to="/calculator-tools/basic-calculator" className="text-white/70 hover:text-white transition-colors text-sm">Basic Calculator</Link></li>
              <li><Link to="/calculator-tools/bmi-calculator" className="text-white/70 hover:text-white transition-colors text-sm">BMI Calculator</Link></li>
              <li><Link to="/calculator-tools/age-calculator" className="text-white/70 hover:text-white transition-colors text-sm">Age Calculator</Link></li>
              <li><Link to="/calculator-tools/percentage-calculator" className="text-white/70 hover:text-white transition-colors text-sm">Percentage Calculator</Link></li>
              <li><Link to="/calculator-tools/loan-calculator" className="text-white/70 hover:text-white transition-colors text-sm">Loan Calculator</Link></li>
              <li><Link to="/calculator-tools/tip-calculator" className="text-white/70 hover:text-white transition-colors text-sm">Tip Calculator</Link></li>
            </ul>
          </div>

          {/* Color Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">🎨 Color Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/color-tools/color-picker" className="text-white/70 hover:text-white transition-colors text-sm">Color Picker</Link></li>
              <li><Link to="/color-tools/color-converter" className="text-white/70 hover:text-white transition-colors text-sm">Color Converter</Link></li>
              <li><Link to="/color-tools/gradient-generator" className="text-white/70 hover:text-white transition-colors text-sm">Gradient Generator</Link></li>
              <li><Link to="/color-tools/color-palette-generator" className="text-white/70 hover:text-white transition-colors text-sm">Palette Generator</Link></li>
              <li><Link to="/color-tools/random-color-generator" className="text-white/70 hover:text-white transition-colors text-sm">Random Colors</Link></li>
              <li><Link to="/color-tools/color-contrast-checker" className="text-white/70 hover:text-white transition-colors text-sm">Contrast Checker</Link></li>
              <li><Link to="/color-tools/hex-to-rgb" className="text-white/70 hover:text-white transition-colors text-sm">Hex to RGB</Link></li>
              <li><Link to="/color-tools/rgb-to-hex" className="text-white/70 hover:text-white transition-colors text-sm">RGB to Hex</Link></li>
            </ul>
          </div>

          {/* Unit Converters */}
          <div>
            <h4 className="text-white font-semibold mb-4">🔄 Converters</h4>
            <div className="grid grid-cols-1 gap-4">
              <ul className="space-y-2">
                <li><Link to="/unit-converters/temperature-converter" className="text-white/70 hover:text-white transition-colors text-sm">Temperature</Link></li>
                <li><Link to="/unit-converters/length-converter" className="text-white/70 hover:text-white transition-colors text-sm">Length</Link></li>
                <li><Link to="/unit-converters/weight-converter" className="text-white/70 hover:text-white transition-colors text-sm">Weight</Link></li>
                <li><Link to="/unit-converters/currency-converter" className="text-white/70 hover:text-white transition-colors text-sm">Currency</Link></li>
                <li><Link to="/unit-converters/speed-converter" className="text-white/70 hover:text-white transition-colors text-sm">Speed</Link></li>
                <li><Link to="/unit-converters/area-converter" className="text-white/70 hover:text-white transition-colors text-sm">Area</Link></li>
              </ul>
            </div>
          </div>

          {/* File Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">📁 File Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/file-tools/csv-to-json" className="text-white/70 hover:text-white transition-colors text-sm">CSV to JSON</Link></li>
              <li><Link to="/file-tools/json-to-csv" className="text-white/70 hover:text-white transition-colors text-sm">JSON to CSV</Link></li>
              <li><Link to="/file-tools/txt-to-pdf" className="text-white/70 hover:text-white transition-colors text-sm">TXT to PDF</Link></li>
              <li><Link to="/file-tools/zip-extractor" className="text-white/70 hover:text-white transition-colors text-sm">ZIP Extractor</Link></li>
            </ul>
          </div>

          {/* Audio Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">🔍 SEO Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/seo-tools/meta-tag-generator" className="text-white/70 hover:text-white transition-colors text-sm">Meta Tag Generator</Link></li>
              <li><Link to="/seo-tools/keyword-density-checker" className="text-white/70 hover:text-white transition-colors text-sm">Keyword Density</Link></li>
              <li><Link to="/seo-tools/seo-analyzer" className="text-white/70 hover:text-white transition-colors text-sm">SEO Analyzer</Link></li>
              <li><Link to="/seo-tools/sitemap-generator" className="text-white/70 hover:text-white transition-colors text-sm">Sitemap Generator</Link></li>
              <li><Link to="/seo-tools/robots-generator" className="text-white/70 hover:text-white transition-colors text-sm">Robots.txt Generator</Link></li>
              <li><Link to="/seo-tools/open-graph-generator" className="text-white/70 hover:text-white transition-colors text-sm">Open Graph Generator</Link></li>
            </ul>
          </div>

          {/* Additional Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">🎵 Audio Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/audio-tools/mp3-cutter" className="text-white/70 hover:text-white transition-colors text-sm">MP3 Cutter</Link></li>
              <li><Link to="/audio-tools/audio-converter" className="text-white/70 hover:text-white transition-colors text-sm">Audio Converter</Link></li>
            </ul>
          </div>

          {/* Video Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">🎬 Video Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/video-tools/video-cutter" className="text-white/70 hover:text-white transition-colors text-sm">Video Cutter</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-glass mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span>Made with</span>
              <Heart className="text-red-500 fill-current" size={16} />
              <span>by Toolify Team</span>
            </div>
            <div className="text-white/60 text-sm text-center">
              © 2025 Toolify. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;