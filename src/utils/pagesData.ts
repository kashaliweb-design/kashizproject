export interface ContentSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  pageId: string;
  order: number;
}

export interface PageData {
  id: string;
  name: string;
  path: string;
  category: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
  };
  contentSections?: ContentSection[];
  faqs?: FAQ[];
}

export const getDefaultSEO = (pageName: string) => ({
  title: `${pageName} - Free Online Tool`,
  description: `Use our free ${pageName} tool online. Fast, easy, and secure.`,
  keywords: `${pageName.toLowerCase()}, online tool, free tool`,
  ogImage: '',
  ogTitle: `${pageName} - Free Online Tool`,
  ogDescription: `Use our free ${pageName} tool online. Fast, easy, and secure.`
});

export const initialPagesData: PageData[] = [
  // Text Tools
  { id: 'word-counter', name: 'Word Counter', path: '/text-tools/word-counter', category: 'Text Tools', seo: getDefaultSEO('Word Counter') },
  { id: 'character-counter', name: 'Character Counter', path: '/text-tools/character-counter', category: 'Text Tools', seo: getDefaultSEO('Character Counter') },
  { id: 'sentence-counter', name: 'Sentence Counter', path: '/text-tools/sentence-counter', category: 'Text Tools', seo: getDefaultSEO('Sentence Counter') },
  { id: 'paragraph-counter', name: 'Paragraph Counter', path: '/text-tools/paragraph-counter', category: 'Text Tools', seo: getDefaultSEO('Paragraph Counter') },
  { id: 'case-converter', name: 'Case Converter', path: '/text-tools/online-text-case-converter', category: 'Text Tools', seo: getDefaultSEO('Case Converter') },
  { id: 'text-to-binary', name: 'Text to Binary', path: '/text-tools/text-to-binary', category: 'Text Tools', seo: getDefaultSEO('Text to Binary') },
  { id: 'text-to-ascii', name: 'Text to ASCII', path: '/text-tools/text-to-ascii', category: 'Text Tools', seo: getDefaultSEO('Text to ASCII') },
  { id: 'reverse-text', name: 'Reverse Text', path: '/text-tools/reverse-text', category: 'Text Tools', seo: getDefaultSEO('Reverse Text') },
  { id: 'remove-duplicates', name: 'Remove Duplicates', path: '/text-tools/remove-duplicates', category: 'Text Tools', seo: getDefaultSEO('Remove Duplicates') },
  { id: 'remove-extra-spaces', name: 'Remove Extra Spaces', path: '/text-tools/remove-extra-spaces', category: 'Text Tools', seo: getDefaultSEO('Remove Extra Spaces') },
  { id: 'alphabetical-order', name: 'Alphabetical Order', path: '/text-tools/alphabetical-order', category: 'Text Tools', seo: getDefaultSEO('Alphabetical Order') },
  { id: 'text-sorter', name: 'Text Sorter', path: '/text-tools/text-sorter', category: 'Text Tools', seo: getDefaultSEO('Text Sorter') },
  { id: 'palindrome-checker', name: 'Palindrome Checker', path: '/text-tools/palindrome-checker', category: 'Text Tools', seo: getDefaultSEO('Palindrome Checker') },
  { id: 'text-encryptor', name: 'Text Encryptor', path: '/text-tools/text-encryptor', category: 'Text Tools', seo: getDefaultSEO('Text Encryptor') },
  { id: 'rot13-encoder', name: 'ROT13 Encoder', path: '/text-tools/rot13-encoder', category: 'Text Tools', seo: getDefaultSEO('ROT13 Encoder') },
  { id: 'text-to-morse', name: 'Text to Morse', path: '/text-tools/text-to-morse', category: 'Text Tools', seo: getDefaultSEO('Text to Morse') },
  { id: 'text-to-hex', name: 'Text to Hex', path: '/text-tools/text-to-hex', category: 'Text Tools', seo: getDefaultSEO('Text to Hex') },
  { id: 'text-to-octal', name: 'Text to Octal', path: '/text-tools/text-to-octal', category: 'Text Tools', seo: getDefaultSEO('Text to Octal') },
  
  // SEO Tools
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', path: '/seo-tools/meta-tag-generator', category: 'SEO Tools', seo: getDefaultSEO('Meta Tag Generator') },
  { id: 'keyword-density-checker', name: 'Keyword Density Checker', path: '/seo-tools/keyword-density-checker', category: 'SEO Tools', seo: getDefaultSEO('Keyword Density Checker') },
  { id: 'url-slug-generator', name: 'URL Slug Generator', path: '/seo-tools/url-slug-generator', category: 'SEO Tools', seo: getDefaultSEO('URL Slug Generator') },
  { id: 'sitemap-generator', name: 'Sitemap Generator', path: '/seo-tools/sitemap-generator', category: 'SEO Tools', seo: getDefaultSEO('Sitemap Generator') },
  { id: 'robots-generator', name: 'Robots.txt Generator', path: '/seo-tools/robots-generator', category: 'SEO Tools', seo: getDefaultSEO('Robots.txt Generator') },
  { id: 'heading-analyzer', name: 'Heading Analyzer', path: '/seo-tools/heading-analyzer', category: 'SEO Tools', seo: getDefaultSEO('Heading Analyzer') },
  { id: 'opengraph-generator', name: 'Open Graph Generator', path: '/seo-tools/open-graph-generator', category: 'SEO Tools', seo: getDefaultSEO('Open Graph Generator') },
  { id: 'schema-markup-generator', name: 'Schema Markup Generator', path: '/seo-tools/schema-markup-generator', category: 'SEO Tools', seo: getDefaultSEO('Schema Markup Generator') },
  { id: 'seo-analyzer', name: 'SEO Analyzer', path: '/seo-tools/seo-analyzer', category: 'SEO Tools', seo: getDefaultSEO('SEO Analyzer') },
  { id: 'pagespeed-analyzer', name: 'Page Speed Analyzer', path: '/seo-tools/page-speed-analyzer', category: 'SEO Tools', seo: getDefaultSEO('Page Speed Analyzer') },
  { id: 'backlink-checker', name: 'Backlink Checker', path: '/seo-tools/backlink-checker', category: 'SEO Tools', seo: getDefaultSEO('Backlink Checker') },
  { id: 'google-index-checker', name: 'Google Index Checker', path: '/seo-tools/google-index-checker', category: 'SEO Tools', seo: getDefaultSEO('Google Index Checker') },
  { id: 'link-analyzer', name: 'Link Analyzer', path: '/seo-tools/link-analyzer', category: 'SEO Tools', seo: getDefaultSEO('Link Analyzer') },
  { id: 'image-seo-analyzer', name: 'Image SEO Analyzer', path: '/seo-tools/image-seo-analyzer', category: 'SEO Tools', seo: getDefaultSEO('Image SEO Analyzer') },
  { id: 'social-media-preview', name: 'Social Media Preview', path: '/seo-tools/social-media-preview', category: 'SEO Tools', seo: getDefaultSEO('Social Media Preview') },
  { id: 'canonical-tag-generator', name: 'Canonical Tag Generator', path: '/seo-tools/canonical-tag-generator', category: 'SEO Tools', seo: getDefaultSEO('Canonical Tag Generator') },
  
  // Calculator Tools
  { id: 'basic-calculator', name: 'Basic Calculator', path: '/calculator-tools/basic-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Basic Calculator') },
  { id: 'bmi-calculator', name: 'BMI Calculator', path: '/calculator-tools/bmi-calculator', category: 'Calculator Tools', seo: getDefaultSEO('BMI Calculator') },
  { id: 'age-calculator', name: 'Age Calculator', path: '/calculator-tools/age-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Age Calculator') },
  { id: 'percentage-calculator', name: 'Percentage Calculator', path: '/calculator-tools/percentage-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Percentage Calculator') },
  { id: 'discount-calculator', name: 'Discount Calculator', path: '/calculator-tools/discount-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Discount Calculator') },
  { id: 'loan-calculator', name: 'Loan Calculator', path: '/calculator-tools/loan-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Loan Calculator') },
  { id: 'emi-calculator', name: 'EMI Calculator', path: '/calculator-tools/emi-calculator', category: 'Calculator Tools', seo: getDefaultSEO('EMI Calculator') },
  { id: 'tip-calculator', name: 'Tip Calculator', path: '/calculator-tools/tip-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Tip Calculator') },
  { id: 'date-difference-calculator', name: 'Date Difference Calculator', path: '/calculator-tools/date-difference', category: 'Calculator Tools', seo: getDefaultSEO('Date Difference Calculator') },
  { id: 'gst-calculator', name: 'GST Calculator', path: '/calculator-tools/gst-calculator', category: 'Calculator Tools', seo: getDefaultSEO('GST Calculator') },
  { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', path: '/calculator-tools/compound-interest', category: 'Calculator Tools', seo: getDefaultSEO('Compound Interest Calculator') },
  { id: 'simple-interest-calculator', name: 'Simple Interest Calculator', path: '/calculator-tools/simple-interest', category: 'Calculator Tools', seo: getDefaultSEO('Simple Interest Calculator') },
  { id: 'area-calculator', name: 'Area Calculator', path: '/calculator-tools/area-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Area Calculator') },
  { id: 'volume-calculator', name: 'Volume Calculator', path: '/calculator-tools/volume-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Volume Calculator') },
  { id: 'love-calculator', name: 'Love Calculator', path: '/calculator-tools/love-calculator', category: 'Calculator Tools', seo: getDefaultSEO('Love Calculator') },
  
  // Unit Converters
  { id: 'temperature-converter', name: 'Temperature Converter', path: '/unit-converters/temperature-converter', category: 'Unit Converters', seo: getDefaultSEO('Temperature Converter') },
  { id: 'length-converter', name: 'Length Converter', path: '/unit-converters/length-converter', category: 'Unit Converters', seo: getDefaultSEO('Length Converter') },
  { id: 'weight-converter', name: 'Weight Converter', path: '/unit-converters/weight-converter', category: 'Unit Converters', seo: getDefaultSEO('Weight Converter') },
  { id: 'speed-converter', name: 'Speed Converter', path: '/unit-converters/speed-converter', category: 'Unit Converters', seo: getDefaultSEO('Speed Converter') },
  { id: 'time-converter', name: 'Time Converter', path: '/unit-converters/time-converter', category: 'Unit Converters', seo: getDefaultSEO('Time Converter') },
  { id: 'area-converter', name: 'Area Converter', path: '/unit-converters/area-converter', category: 'Unit Converters', seo: getDefaultSEO('Area Converter') },
  { id: 'volume-converter', name: 'Volume Converter', path: '/unit-converters/volume-converter', category: 'Unit Converters', seo: getDefaultSEO('Volume Converter') },
  { id: 'pressure-converter', name: 'Pressure Converter', path: '/unit-converters/pressure-converter', category: 'Unit Converters', seo: getDefaultSEO('Pressure Converter') },
  { id: 'energy-converter', name: 'Energy Converter', path: '/unit-converters/energy-converter', category: 'Unit Converters', seo: getDefaultSEO('Energy Converter') },
  { id: 'data-storage-converter', name: 'Data Storage Converter', path: '/unit-converters/data-storage-converter', category: 'Unit Converters', seo: getDefaultSEO('Data Storage Converter') },
  { id: 'power-converter', name: 'Power Converter', path: '/unit-converters/power-converter', category: 'Unit Converters', seo: getDefaultSEO('Power Converter') },
  { id: 'currency-converter', name: 'Currency Converter', path: '/unit-converters/currency-converter', category: 'Unit Converters', seo: getDefaultSEO('Currency Converter') },
  
  // Color Tools
  { id: 'color-picker', name: 'Color Picker', path: '/color-tools/color-picker', category: 'Color Tools', seo: getDefaultSEO('Color Picker') },
  { id: 'color-converter', name: 'Color Converter', path: '/color-tools/color-converter', category: 'Color Tools', seo: getDefaultSEO('Color Converter') },
  { id: 'gradient-generator', name: 'Gradient Generator', path: '/color-tools/gradient-generator', category: 'Color Tools', seo: getDefaultSEO('Gradient Generator') },
  { id: 'color-palette-generator', name: 'Color Palette Generator', path: '/color-tools/color-palette-generator', category: 'Color Tools', seo: getDefaultSEO('Color Palette Generator') },
  { id: 'random-color-generator', name: 'Random Color Generator', path: '/color-tools/random-color-generator', category: 'Color Tools', seo: getDefaultSEO('Random Color Generator') },
  { id: 'color-contrast-checker', name: 'Color Contrast Checker', path: '/color-tools/color-contrast-checker', category: 'Color Tools', seo: getDefaultSEO('Color Contrast Checker') },
  { id: 'hex-to-rgb', name: 'Hex to RGB', path: '/color-tools/hex-to-rgb', category: 'Color Tools', seo: getDefaultSEO('Hex to RGB') },
  { id: 'rgb-to-hex', name: 'RGB to Hex', path: '/color-tools/rgb-to-hex', category: 'Color Tools', seo: getDefaultSEO('RGB to Hex') },
  
  // File Tools
  { id: 'csv-to-json', name: 'CSV to JSON', path: '/file-tools/csv-to-json', category: 'File Tools', seo: getDefaultSEO('CSV to JSON') },
  { id: 'json-to-csv', name: 'JSON to CSV', path: '/file-tools/json-to-csv', category: 'File Tools', seo: getDefaultSEO('JSON to CSV') },
  { id: 'txt-to-pdf', name: 'TXT to PDF', path: '/file-tools/txt-to-pdf', category: 'File Tools', seo: getDefaultSEO('TXT to PDF') },
  { id: 'zip-extractor', name: 'ZIP Extractor', path: '/file-tools/zip-extractor', category: 'File Tools', seo: getDefaultSEO('ZIP Extractor') },
  
  // Audio Tools
  { id: 'mp3-cutter', name: 'MP3 Cutter', path: '/audio-tools/mp3-cutter', category: 'Audio Tools', seo: getDefaultSEO('MP3 Cutter') },
  { id: 'audio-converter', name: 'Audio Converter', path: '/audio-tools/audio-converter', category: 'Audio Tools', seo: getDefaultSEO('Audio Converter') },
  
  // Video Tools
  { id: 'video-cutter', name: 'Video Cutter', path: '/video-tools/video-cutter', category: 'Video Tools', seo: getDefaultSEO('Video Cutter') },
];
