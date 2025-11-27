import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializePageContent } from './utils/initializeContent';
import { initialPagesData } from './utils/pagesData';

// Eager load Home page for better initial experience
import Home from './pages/Home';

// Lazy load all other pages
// Text Tools
const WordCounter = lazy(() => import('./pages/text-tools/WordCounter'));
const CharacterCounter = lazy(() => import('./pages/text-tools/CharacterCounter'));
const SentenceCounter = lazy(() => import('./pages/text-tools/SentenceCounter'));
const ParagraphCounter = lazy(() => import('./pages/text-tools/ParagraphCounter'));
const CaseConverter = lazy(() => import('./pages/text-tools/CaseConverter'));
const TextToBinary = lazy(() => import('./pages/text-tools/TextToBinary'));
const TextToASCII = lazy(() => import('./pages/text-tools/TextToASCII'));
const ReverseText = lazy(() => import('./pages/text-tools/ReverseText'));
const RemoveDuplicates = lazy(() => import('./pages/text-tools/RemoveDuplicates'));
const RemoveExtraSpaces = lazy(() => import('./pages/text-tools/RemoveExtraSpaces'));
const AlphabeticalOrder = lazy(() => import('./pages/text-tools/AlphabeticalOrder'));
const TextSorter = lazy(() => import('./pages/text-tools/TextSorter'));
const PalindromeChecker = lazy(() => import('./pages/text-tools/PalindromeChecker'));
const TextEncryptor = lazy(() => import('./pages/text-tools/TextEncryptor'));
const ROT13Encoder = lazy(() => import('./pages/text-tools/ROT13Encoder'));
const TextToMorse = lazy(() => import('./pages/text-tools/TextToMorse'));
const TextToHex = lazy(() => import('./pages/text-tools/TextToHex'));
const TextToOctal = lazy(() => import('./pages/text-tools/TextToOctal'));

// SEO Tools
const MetaTagGenerator = lazy(() => import('./pages/seo-tools/MetaTagGenerator'));
const KeywordDensityChecker = lazy(() => import('./pages/seo-tools/KeywordDensityChecker'));
const URLSlugGenerator = lazy(() => import('./pages/seo-tools/URLSlugGenerator'));
const SitemapGenerator = lazy(() => import('./pages/seo-tools/SitemapGenerator'));
const RobotsGenerator = lazy(() => import('./pages/seo-tools/RobotsGenerator'));
const HeadingAnalyzer = lazy(() => import('./pages/seo-tools/HeadingAnalyzer'));
const OpenGraphGenerator = lazy(() => import('./pages/seo-tools/OpenGraphGenerator'));
const SchemaMarkupGenerator = lazy(() => import('./pages/seo-tools/SchemaMarkupGenerator'));
const SEOAnalyzer = lazy(() => import('./pages/seo-tools/SEOAnalyzer'));
const PageSpeedAnalyzer = lazy(() => import('./pages/seo-tools/PageSpeedAnalyzer'));
const BacklinkChecker = lazy(() => import('./pages/seo-tools/BacklinkChecker'));
const GoogleIndexChecker = lazy(() => import('./pages/seo-tools/GoogleIndexChecker'));
const LinkAnalyzer = lazy(() => import('./pages/seo-tools/LinkAnalyzer'));
const ImageSEOAnalyzer = lazy(() => import('./pages/seo-tools/ImageSEOAnalyzer'));
const SocialMediaPreview = lazy(() => import('./pages/seo-tools/SocialMediaPreview'));
const CanonicalTagGenerator = lazy(() => import('./pages/seo-tools/CanonicalTagGenerator'));

// Calculator Tools
const BasicCalculator = lazy(() => import('./pages/calculator-tools/BasicCalculator'));
const BMICalculator = lazy(() => import('./pages/calculator-tools/BMICalculator'));
const AgeCalculator = lazy(() => import('./pages/calculator-tools/AgeCalculator'));
const PercentageCalculator = lazy(() => import('./pages/calculator-tools/PercentageCalculator'));
const DiscountCalculator = lazy(() => import('./pages/calculator-tools/DiscountCalculator'));
const LoanCalculator = lazy(() => import('./pages/calculator-tools/LoanCalculator'));
const EMICalculator = lazy(() => import('./pages/calculator-tools/EMICalculator'));
const TipCalculator = lazy(() => import('./pages/calculator-tools/TipCalculator'));
const DateDifferenceCalculator = lazy(() => import('./pages/calculator-tools/DateDifferenceCalculator'));
const GSTCalculator = lazy(() => import('./pages/calculator-tools/GSTCalculator'));
const CompoundInterestCalculator = lazy(() => import('./pages/calculator-tools/CompoundInterestCalculator'));
const SimpleInterestCalculator = lazy(() => import('./pages/calculator-tools/SimpleInterestCalculator'));
const AreaCalculator = lazy(() => import('./pages/calculator-tools/AreaCalculator'));
const VolumeCalculator = lazy(() => import('./pages/calculator-tools/VolumeCalculator'));
const LoveCalculator = lazy(() => import('./pages/calculator-tools/LoveCalculator'));

// Unit Converters
const TemperatureConverter = lazy(() => import('./pages/unit-converters/TemperatureConverter'));
const LengthConverter = lazy(() => import('./pages/unit-converters/LengthConverter'));
const WeightConverter = lazy(() => import('./pages/unit-converters/WeightConverter'));
const SpeedConverter = lazy(() => import('./pages/unit-converters/SpeedConverter'));
const TimeConverter = lazy(() => import('./pages/unit-converters/TimeConverter'));
const AreaConverter = lazy(() => import('./pages/unit-converters/AreaConverter'));
const VolumeConverter = lazy(() => import('./pages/unit-converters/VolumeConverter'));
const PressureConverter = lazy(() => import('./pages/unit-converters/PressureConverter'));
const EnergyConverter = lazy(() => import('./pages/unit-converters/EnergyConverter'));
const DataStorageConverter = lazy(() => import('./pages/unit-converters/DataStorageConverter'));
const PowerConverter = lazy(() => import('./pages/unit-converters/PowerConverter'));
const CurrencyConverter = lazy(() => import('./pages/unit-converters/CurrencyConverter'));

// Color Tools
const ColorPicker = lazy(() => import('./pages/color-tools/ColorPicker'));
const ColorConverter = lazy(() => import('./pages/color-tools/ColorConverter'));
const GradientGenerator = lazy(() => import('./pages/color-tools/GradientGenerator'));
const ColorPaletteGenerator = lazy(() => import('./pages/color-tools/ColorPaletteGenerator'));
const RandomColorGenerator = lazy(() => import('./pages/color-tools/RandomColorGenerator'));
const ColorContrastChecker = lazy(() => import('./pages/color-tools/ColorContrastChecker'));
const HexToRGB = lazy(() => import('./pages/color-tools/HexToRGB'));
const RGBToHex = lazy(() => import('./pages/color-tools/RGBToHex'));

// File Tools
const CSVToJSON = lazy(() => import('./pages/file-tools/CSVToJSON'));
const JSONToCSV = lazy(() => import('./pages/file-tools/JSONToCSV'));
const TXTToPDF = lazy(() => import('./pages/file-tools/TXTToPDF'));
const ZIPExtractor = lazy(() => import('./pages/file-tools/ZIPExtractor'));

// Audio Tools
const MP3Cutter = lazy(() => import('./pages/audio-tools/MP3Cutter'));
const AudioConverter = lazy(() => import('./pages/audio-tools/AudioConverter'));

// Video Tools
const VideoCutter = lazy(() => import('./pages/video-tools/VideoCutter'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

function App() {
  useEffect(() => {
    // Initialize pages data if not exists
    const savedData = localStorage.getItem('pagesData');
    if (!savedData) {
      localStorage.setItem('pagesData', JSON.stringify(initialPagesData));
    }
    
    // Initialize content for all pages
    initializePageContent();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-dark-gradient font-poppins">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              <p className="mt-4 text-white/70">Loading...</p>
            </div>
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Text Tools Routes */}
          <Route path="/text-tools/word-counter" element={<WordCounter />} />
          <Route path="/text-tools/character-counter" element={<CharacterCounter />} />
          <Route path="/text-tools/sentence-counter" element={<SentenceCounter />} />
          <Route path="/text-tools/paragraph-counter" element={<ParagraphCounter />} />
          <Route path="/text-tools/online-text-case-converter" element={<CaseConverter />} />
          <Route path="/text-tools/remove-duplicates" element={<RemoveDuplicates />} />
          <Route path="/text-tools/reverse-text" element={<ReverseText />} />
          <Route path="/text-tools/text-to-binary" element={<TextToBinary />} />
          <Route path="/text-tools/text-to-ascii" element={<TextToASCII />} />
          <Route path="/text-tools/remove-extra-spaces" element={<RemoveExtraSpaces />} />
          <Route path="/text-tools/alphabetical-order" element={<AlphabeticalOrder />} />
          <Route path="/text-tools/text-sorter" element={<TextSorter />} />
          <Route path="/text-tools/palindrome-checker" element={<PalindromeChecker />} />
          <Route path="/text-tools/text-encryptor" element={<TextEncryptor />} />
          <Route path="/text-tools/rot13-encoder" element={<ROT13Encoder />} />
          <Route path="/text-tools/text-to-morse" element={<TextToMorse />} />
          <Route path="/text-tools/text-to-hex" element={<TextToHex />} />
          <Route path="/text-tools/text-to-octal" element={<TextToOctal />} />
          
          {/* SEO Tools Routes */}
          <Route path="/seo-tools/meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="/seo-tools/keyword-density-checker" element={<KeywordDensityChecker />} />
          <Route path="/seo-tools/url-slug-generator" element={<URLSlugGenerator />} />
          <Route path="/seo-tools/sitemap-generator" element={<SitemapGenerator />} />
          <Route path="/seo-tools/robots-generator" element={<RobotsGenerator />} />
          <Route path="/seo-tools/heading-analyzer" element={<HeadingAnalyzer />} />
          <Route path="/seo-tools/open-graph-generator" element={<OpenGraphGenerator />} />
          <Route path="/seo-tools/schema-markup-generator" element={<SchemaMarkupGenerator />} />
          <Route path="/seo-tools/seo-analyzer" element={<SEOAnalyzer />} />
          <Route path="/seo-tools/page-speed-analyzer" element={<PageSpeedAnalyzer />} />
          <Route path="/seo-tools/backlink-checker" element={<BacklinkChecker />} />
          <Route path="/seo-tools/google-index-checker" element={<GoogleIndexChecker />} />
          <Route path="/seo-tools/link-analyzer" element={<LinkAnalyzer />} />
          <Route path="/seo-tools/image-seo-analyzer" element={<ImageSEOAnalyzer />} />
          <Route path="/seo-tools/social-media-preview" element={<SocialMediaPreview />} />
          <Route path="/seo-tools/canonical-tag-generator" element={<CanonicalTagGenerator />} />
          
          {/* Calculator Tools Routes */}
          <Route path="/calculator-tools/basic-calculator" element={<BasicCalculator />} />
          <Route path="/calculator-tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/calculator-tools/bmi-calculator" element={<BMICalculator />} />
          <Route path="/calculator-tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/calculator-tools/discount-calculator" element={<DiscountCalculator />} />
          <Route path="/calculator-tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="/calculator-tools/emi-calculator" element={<EMICalculator />} />
          <Route path="/calculator-tools/tip-calculator" element={<TipCalculator />} />
          <Route path="/calculator-tools/date-difference" element={<DateDifferenceCalculator />} />
          <Route path="/calculator-tools/gst-calculator" element={<GSTCalculator />} />
          <Route path="/calculator-tools/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/calculator-tools/simple-interest" element={<SimpleInterestCalculator />} />
          <Route path="/calculator-tools/area-calculator" element={<AreaCalculator />} />
          <Route path="/calculator-tools/volume-calculator" element={<VolumeCalculator />} />
          <Route path="/calculator-tools/love-calculator" element={<LoveCalculator />} />
          
          {/* Unit Converter Routes */}
          <Route path="/unit-converters/length-converter" element={<LengthConverter />} />
          <Route path="/unit-converters/weight-converter" element={<WeightConverter />} />
          <Route path="/unit-converters/temperature-converter" element={<TemperatureConverter />} />
          <Route path="/unit-converters/speed-converter" element={<SpeedConverter />} />
          <Route path="/unit-converters/time-converter" element={<TimeConverter />} />
          <Route path="/unit-converters/area-converter" element={<AreaConverter />} />
          <Route path="/unit-converters/volume-converter" element={<VolumeConverter />} />
          <Route path="/unit-converters/pressure-converter" element={<PressureConverter />} />
          <Route path="/unit-converters/energy-converter" element={<EnergyConverter />} />
          <Route path="/unit-converters/data-storage-converter" element={<DataStorageConverter />} />
          <Route path="/unit-converters/power-converter" element={<PowerConverter />} />
          <Route path="/unit-converters/currency-converter" element={<CurrencyConverter />} />
          
          {/* Color Tools Routes */}
          <Route path="/color-tools/color-picker" element={<ColorPicker />} />
          <Route path="/color-tools/color-converter" element={<ColorConverter />} />
          <Route path="/color-tools/gradient-generator" element={<GradientGenerator />} />
          <Route path="/color-tools/color-palette-generator" element={<ColorPaletteGenerator />} />
          <Route path="/color-tools/random-color-generator" element={<RandomColorGenerator />} />
          <Route path="/color-tools/color-contrast-checker" element={<ColorContrastChecker />} />
          <Route path="/color-tools/hex-to-rgb" element={<HexToRGB />} />
          <Route path="/color-tools/rgb-to-hex" element={<RGBToHex />} />
          
          {/* File Tools Routes */}
          <Route path="/file-tools/csv-to-json" element={<CSVToJSON />} />
          <Route path="/file-tools/json-to-csv" element={<JSONToCSV />} />
          <Route path="/file-tools/txt-to-pdf" element={<TXTToPDF />} />
          <Route path="/file-tools/zip-extractor" element={<ZIPExtractor />} />
          
          {/* Audio Tools Routes */}
          <Route path="/audio-tools/mp3-cutter" element={<MP3Cutter />} />
          <Route path="/audio-tools/audio-converter" element={<AudioConverter />} />
          
          {/* Video Tools Routes */}
          <Route path="/video-tools/video-cutter" element={<VideoCutter />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;