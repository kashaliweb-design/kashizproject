import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Text Tools
import WordCounter from './pages/text-tools/WordCounter';
import CharacterCounter from './pages/text-tools/CharacterCounter';
import SentenceCounter from './pages/text-tools/SentenceCounter';
import ParagraphCounter from './pages/text-tools/ParagraphCounter';
import CaseConverter from './pages/text-tools/CaseConverter';
import TextToBinary from './pages/text-tools/TextToBinary';
import TextToASCII from './pages/text-tools/TextToASCII';
import ReverseText from './pages/text-tools/ReverseText';
import RemoveDuplicates from './pages/text-tools/RemoveDuplicates';
import RemoveExtraSpaces from './pages/text-tools/RemoveExtraSpaces';
import AlphabeticalOrder from './pages/text-tools/AlphabeticalOrder';
import TextSorter from './pages/text-tools/TextSorter';
import PalindromeChecker from './pages/text-tools/PalindromeChecker';
import TextEncryptor from './pages/text-tools/TextEncryptor';
import ROT13Encoder from './pages/text-tools/ROT13Encoder';
import TextToMorse from './pages/text-tools/TextToMorse';
import TextToHex from './pages/text-tools/TextToHex';
import TextToOctal from './pages/text-tools/TextToOctal';

// SEO Tools
import MetaTagGenerator from './pages/seo-tools/MetaTagGenerator';
import KeywordDensityChecker from './pages/seo-tools/KeywordDensityChecker';
import URLSlugGenerator from './pages/seo-tools/URLSlugGenerator';
import SitemapGenerator from './pages/seo-tools/SitemapGenerator';
import RobotsGenerator from './pages/seo-tools/RobotsGenerator';
import HeadingAnalyzer from './pages/seo-tools/HeadingAnalyzer';
import OpenGraphGenerator from './pages/seo-tools/OpenGraphGenerator';
import SchemaMarkupGenerator from './pages/seo-tools/SchemaMarkupGenerator';
import SEOAnalyzer from './pages/seo-tools/SEOAnalyzer';
import PageSpeedAnalyzer from './pages/seo-tools/PageSpeedAnalyzer';
import BacklinkChecker from './pages/seo-tools/BacklinkChecker';
import GoogleIndexChecker from './pages/seo-tools/GoogleIndexChecker';
import LinkAnalyzer from './pages/seo-tools/LinkAnalyzer';
import ImageSEOAnalyzer from './pages/seo-tools/ImageSEOAnalyzer';
import SocialMediaPreview from './pages/seo-tools/SocialMediaPreview';
import CanonicalTagGenerator from './pages/seo-tools/CanonicalTagGenerator';

// Calculator Tools
import BasicCalculator from './pages/calculator-tools/BasicCalculator';
import BMICalculator from './pages/calculator-tools/BMICalculator';
import AgeCalculator from './pages/calculator-tools/AgeCalculator';
import PercentageCalculator from './pages/calculator-tools/PercentageCalculator';
import DiscountCalculator from './pages/calculator-tools/DiscountCalculator';
import LoanCalculator from './pages/calculator-tools/LoanCalculator';
import EMICalculator from './pages/calculator-tools/EMICalculator';
import TipCalculator from './pages/calculator-tools/TipCalculator';
import DateDifferenceCalculator from './pages/calculator-tools/DateDifferenceCalculator';
import GSTCalculator from './pages/calculator-tools/GSTCalculator';
import CompoundInterestCalculator from './pages/calculator-tools/CompoundInterestCalculator';
import SimpleInterestCalculator from './pages/calculator-tools/SimpleInterestCalculator';
import AreaCalculator from './pages/calculator-tools/AreaCalculator';
import VolumeCalculator from './pages/calculator-tools/VolumeCalculator';
import LoveCalculator from './pages/calculator-tools/LoveCalculator';

// Unit Converters
import TemperatureConverter from './pages/unit-converters/TemperatureConverter';
import LengthConverter from './pages/unit-converters/LengthConverter';
import WeightConverter from './pages/unit-converters/WeightConverter';
import SpeedConverter from './pages/unit-converters/SpeedConverter';
import TimeConverter from './pages/unit-converters/TimeConverter';
import AreaConverter from './pages/unit-converters/AreaConverter';
import VolumeConverter from './pages/unit-converters/VolumeConverter';
import PressureConverter from './pages/unit-converters/PressureConverter';
import EnergyConverter from './pages/unit-converters/EnergyConverter';
import DataStorageConverter from './pages/unit-converters/DataStorageConverter';
import PowerConverter from './pages/unit-converters/PowerConverter';
import CurrencyConverter from './pages/unit-converters/CurrencyConverter';

// Color Tools
import ColorPicker from './pages/color-tools/ColorPicker';
import ColorConverter from './pages/color-tools/ColorConverter';
import GradientGenerator from './pages/color-tools/GradientGenerator';
import ColorPaletteGenerator from './pages/color-tools/ColorPaletteGenerator';
import RandomColorGenerator from './pages/color-tools/RandomColorGenerator';
import ColorContrastChecker from './pages/color-tools/ColorContrastChecker';

// File Tools
import CSVToJSON from './pages/file-tools/CSVToJSON';
import JSONToCSV from './pages/file-tools/JSONToCSV';
import TXTToPDF from './pages/file-tools/TXTToPDF';
import ZIPExtractor from './pages/file-tools/ZIPExtractor';

// Audio Tools
import MP3Cutter from './pages/audio-tools/MP3Cutter';
import AudioConverter from './pages/audio-tools/AudioConverter';

// Video Tools
import VideoCutter from './pages/video-tools/VideoCutter';

// Additional Color Tools
import HexToRGB from './pages/color-tools/HexToRGB';
import RGBToHex from './pages/color-tools/RGBToHex';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-gradient font-poppins">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Text Tools Routes */}
          <Route path="/text-tools/word-counter" element={<WordCounter />} />
          <Route path="/text-tools/character-counter" element={<CharacterCounter />} />
          <Route path="/text-tools/sentence-counter" element={<SentenceCounter />} />
          <Route path="/text-tools/paragraph-counter" element={<ParagraphCounter />} />
          <Route path="/text-tools/case-converter" element={<CaseConverter />} />
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
      </div>
    </Router>
  );
}

export default App;