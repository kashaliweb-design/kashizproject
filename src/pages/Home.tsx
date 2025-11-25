import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { Calculator, Type, Palette, FileText, Music, Video, Search, Wrench, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const textTools = [
    { title: "Word Counter", description: "Count words, characters, and paragraphs", icon: Type, link: "/text-tools/word-counter", gradient: "from-blue-500 to-purple-600" },
    { title: "Case Converter", description: "Convert text to different cases", icon: Type, link: "/text-tools/online-text-case-converter", gradient: "from-green-500 to-blue-600" },
    { title: "Text Reverser", description: "Reverse your text instantly", icon: Type, link: "/text-tools/reverse-text", gradient: "from-purple-500 to-pink-600" },
    { title: "Remove Duplicates", description: "Remove duplicate lines from text", icon: Type, link: "/text-tools/remove-duplicates", gradient: "from-red-500 to-orange-600" },
    { title: "Text Sorter", description: "Sort text lines alphabetically", icon: Type, link: "/text-tools/text-sorter", gradient: "from-teal-500 to-green-600" },
    { title: "Character Counter", description: "Count characters with/without spaces", icon: Type, link: "/text-tools/character-counter", gradient: "from-indigo-500 to-blue-600" }
  ];

  const calculatorTools = [
    { title: "Basic Calculator", description: "Perform basic arithmetic operations", icon: Calculator, link: "/calculator-tools/basic-calculator", gradient: "from-blue-500 to-indigo-600" },
    { title: "Age Calculator", description: "Calculate your exact age", icon: Calculator, link: "/calculator-tools/age-calculator", gradient: "from-green-500 to-teal-600" },
    { title: "BMI Calculator", description: "Calculate your Body Mass Index", icon: Calculator, link: "/calculator-tools/bmi-calculator", gradient: "from-purple-500 to-pink-600" },
    { title: "Percentage Calculator", description: "Calculate percentages easily", icon: Calculator, link: "/calculator-tools/percentage-calculator", gradient: "from-red-500 to-pink-600" },
    { title: "Tip Calculator", description: "Calculate tips and split bills", icon: Calculator, link: "/calculator-tools/tip-calculator", gradient: "from-yellow-500 to-orange-600" },
    { title: "Loan Calculator", description: "Calculate loan payments and interest", icon: Calculator, link: "/calculator-tools/loan-calculator", gradient: "from-cyan-500 to-blue-600" }
  ];

  const colorTools = [
    { title: "Color Picker", description: "Pick colors from images or palette", icon: Palette, link: "/color-tools/color-picker", gradient: "from-pink-500 to-rose-600" },
    { title: "Gradient Generator", description: "Create beautiful CSS gradients", icon: Palette, link: "/color-tools/gradient-generator", gradient: "from-purple-500 to-indigo-600" },
    { title: "Color Palette Generator", description: "Generate harmonious color palettes", icon: Palette, link: "/color-tools/color-palette-generator", gradient: "from-green-500 to-emerald-600" },
    { title: "Random Color Generator", description: "Generate random colors by type", icon: Palette, link: "/color-tools/random-color-generator", gradient: "from-yellow-500 to-orange-600" },
    { title: "Color Contrast Checker", description: "Check WCAG accessibility compliance", icon: Palette, link: "/color-tools/color-contrast-checker", gradient: "from-cyan-500 to-blue-600" },
    { title: "Hex to RGB", description: "Convert hex colors to RGB format", icon: Palette, link: "/color-tools/hex-to-rgb", gradient: "from-indigo-500 to-purple-600" },
    { title: "RGB to Hex", description: "Convert RGB colors to hex format", icon: Palette, link: "/color-tools/rgb-to-hex", gradient: "from-rose-500 to-pink-600" }
  ];

  const fileTools = [
    { title: "CSV to JSON", description: "Convert CSV files to JSON format", icon: FileText, link: "/file-tools/csv-to-json", gradient: "from-blue-500 to-cyan-600" },
    { title: "JSON to CSV", description: "Convert JSON data to CSV format", icon: FileText, link: "/file-tools/json-to-csv", gradient: "from-green-500 to-teal-600" },
    { title: "TXT to PDF", description: "Convert text files to PDF", icon: FileText, link: "/file-tools/txt-to-pdf", gradient: "from-purple-500 to-violet-600" },
    { title: "ZIP Extractor", description: "Extract files from ZIP archives", icon: FileText, link: "/file-tools/zip-extractor", gradient: "from-orange-500 to-red-600" }
  ];

  const audioTools = [
    { title: "MP3 Cutter", description: "Cut and trim MP3 audio files", icon: Music, link: "/audio-tools/mp3-cutter", gradient: "from-pink-500 to-purple-600" },
    { title: "Audio Converter", description: "Convert between audio formats", icon: Music, link: "/audio-tools/audio-converter", gradient: "from-blue-500 to-indigo-600" }
  ];

  const videoTools = [
    { title: "Video Cutter", description: "Cut and trim video files", icon: Video, link: "/video-tools/video-cutter", gradient: "from-red-500 to-pink-600" }
  ];

  const seoTools = [
    { title: "Meta Tag Generator", description: "Generate SEO meta tags", icon: Search, link: "/seo-tools/meta-tag-generator", gradient: "from-emerald-500 to-teal-600" },
    { title: "Keyword Density Checker", description: "Analyze keyword density", icon: Search, link: "/seo-tools/keyword-density-checker", gradient: "from-blue-500 to-cyan-600" },
    { title: "URL Slug Generator", description: "Create SEO-friendly URLs", icon: Search, link: "/seo-tools/url-slug-generator", gradient: "from-purple-500 to-pink-600" },
    { title: "Sitemap Generator", description: "Generate XML sitemaps", icon: Search, link: "/seo-tools/sitemap-generator", gradient: "from-green-500 to-emerald-600" },
    { title: "Robots.txt Generator", description: "Create robots.txt files", icon: Search, link: "/seo-tools/robots-generator", gradient: "from-orange-500 to-red-600" },
    { title: "SEO Analyzer", description: "Comprehensive SEO analysis", icon: Search, link: "/seo-tools/seo-analyzer", gradient: "from-indigo-500 to-purple-600" }
  ];

  return (
    <Layout title="Toolistan - Free Online Tools">
      <div className="min-h-screen">
        {/* Admin Button - Fixed Position */}
        <button
          onClick={() => navigate('/admin/login')}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
          title="Admin Dashboard"
        >
          <Settings className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Admin Dashboard
          </span>
        </button>

        {/* Hero Section */}
        <section className="text-center py-10 sm:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Toolistan
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 leading-relaxed px-2">
              Your ultimate collection of free online tools for productivity, creativity, and development
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-white/60 text-sm sm:text-base">
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                70+ Tools
              </span>
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                Always Free
              </span>
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4 sm:w-5 sm:h-5" />
                No Registration
              </span>
            </div>
          </div>
        </section>

        {/* Tools Sections */}
        <div className="max-w-7xl mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
          {/* Text Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <Type className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-400" />
              Text Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {textTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>

          {/* Calculator Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <Calculator className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-green-400" />
              Calculator Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {calculatorTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>

          {/* Color Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <Palette className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-pink-400" />
              Color Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {colorTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>

          {/* SEO Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <Search className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-emerald-400" />
              SEO Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {seoTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>

          {/* File Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <FileText className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-cyan-400" />
              File Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {fileTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>

          {/* Audio Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <Music className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-400" />
              Audio Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {audioTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>

          {/* Video Tools */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              <Video className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-red-400" />
              Video Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videoTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Home;