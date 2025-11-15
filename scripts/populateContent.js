// Script to populate all pages with SEO content
const fs = require('fs');
const path = require('path');

// Read the current pagesData from localStorage simulation
const populateAllPages = () => {
  const pages = [
    // Text Tools (18 pages)
    { id: 'word-counter', name: 'Word Counter', category: 'Text Tools' },
    { id: 'character-counter', name: 'Character Counter', category: 'Text Tools' },
    { id: 'sentence-counter', name: 'Sentence Counter', category: 'Text Tools' },
    { id: 'paragraph-counter', name: 'Paragraph Counter', category: 'Text Tools' },
    { id: 'case-converter', name: 'Case Converter', category: 'Text Tools' },
    { id: 'text-to-binary', name: 'Text to Binary', category: 'Text Tools' },
    { id: 'text-to-ascii', name: 'Text to ASCII', category: 'Text Tools' },
    { id: 'reverse-text', name: 'Reverse Text', category: 'Text Tools' },
    { id: 'remove-duplicates', name: 'Remove Duplicates', category: 'Text Tools' },
    { id: 'remove-extra-spaces', name: 'Remove Extra Spaces', category: 'Text Tools' },
    { id: 'alphabetical-order', name: 'Alphabetical Order', category: 'Text Tools' },
    { id: 'text-sorter', name: 'Text Sorter', category: 'Text Tools' },
    { id: 'palindrome-checker', name: 'Palindrome Checker', category: 'Text Tools' },
    { id: 'text-encryptor', name: 'Text Encryptor', category: 'Text Tools' },
    { id: 'rot13-encoder', name: 'ROT13 Encoder', category: 'Text Tools' },
    { id: 'text-to-morse', name: 'Text to Morse', category: 'Text Tools' },
    { id: 'text-to-hex', name: 'Text to Hex', category: 'Text Tools' },
    { id: 'text-to-octal', name: 'Text to Octal', category: 'Text Tools' },
    
    // SEO Tools (16 pages)
    { id: 'meta-tag-generator', name: 'Meta Tag Generator', category: 'SEO Tools' },
    { id: 'keyword-density-checker', name: 'Keyword Density Checker', category: 'SEO Tools' },
    { id: 'url-slug-generator', name: 'URL Slug Generator', category: 'SEO Tools' },
    { id: 'sitemap-generator', name: 'Sitemap Generator', category: 'SEO Tools' },
    { id: 'robots-generator', name: 'Robots.txt Generator', category: 'SEO Tools' },
    { id: 'heading-analyzer', name: 'Heading Analyzer', category: 'SEO Tools' },
    { id: 'opengraph-generator', name: 'Open Graph Generator', category: 'SEO Tools' },
    { id: 'schema-markup-generator', name: 'Schema Markup Generator', category: 'SEO Tools' },
    { id: 'seo-analyzer', name: 'SEO Analyzer', category: 'SEO Tools' },
    { id: 'pagespeed-analyzer', name: 'Page Speed Analyzer', category: 'SEO Tools' },
    { id: 'backlink-checker', name: 'Backlink Checker', category: 'SEO Tools' },
    { id: 'google-index-checker', name: 'Google Index Checker', category: 'SEO Tools' },
    { id: 'link-analyzer', name: 'Link Analyzer', category: 'SEO Tools' },
    { id: 'image-seo-analyzer', name: 'Image SEO Analyzer', category: 'SEO Tools' },
    { id: 'social-media-preview', name: 'Social Media Preview', category: 'SEO Tools' },
    { id: 'canonical-tag-generator', name: 'Canonical Tag Generator', category: 'SEO Tools' },
    
    // Calculator Tools (15 pages)
    { id: 'basic-calculator', name: 'Basic Calculator', category: 'Calculator Tools' },
    { id: 'bmi-calculator', name: 'BMI Calculator', category: 'Calculator Tools' },
    { id: 'age-calculator', name: 'Age Calculator', category: 'Calculator Tools' },
    { id: 'percentage-calculator', name: 'Percentage Calculator', category: 'Calculator Tools' },
    { id: 'discount-calculator', name: 'Discount Calculator', category: 'Calculator Tools' },
    { id: 'loan-calculator', name: 'Loan Calculator', category: 'Calculator Tools' },
    { id: 'emi-calculator', name: 'EMI Calculator', category: 'Calculator Tools' },
    { id: 'tip-calculator', name: 'Tip Calculator', category: 'Calculator Tools' },
    { id: 'date-difference-calculator', name: 'Date Difference Calculator', category: 'Calculator Tools' },
    { id: 'gst-calculator', name: 'GST Calculator', category: 'Calculator Tools' },
    { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', category: 'Calculator Tools' },
    { id: 'simple-interest-calculator', name: 'Simple Interest Calculator', category: 'Calculator Tools' },
    { id: 'area-calculator', name: 'Area Calculator', category: 'Calculator Tools' },
    { id: 'volume-calculator', name: 'Volume Calculator', category: 'Calculator Tools' },
    { id: 'love-calculator', name: 'Love Calculator', category: 'Calculator Tools' },
    
    // Unit Converters (12 pages)
    { id: 'temperature-converter', name: 'Temperature Converter', category: 'Unit Converters' },
    { id: 'length-converter', name: 'Length Converter', category: 'Unit Converters' },
    { id: 'weight-converter', name: 'Weight Converter', category: 'Unit Converters' },
    { id: 'speed-converter', name: 'Speed Converter', category: 'Unit Converters' },
    { id: 'time-converter', name: 'Time Converter', category: 'Unit Converters' },
    { id: 'area-converter', name: 'Area Converter', category: 'Unit Converters' },
    { id: 'volume-converter', name: 'Volume Converter', category: 'Unit Converters' },
    { id: 'pressure-converter', name: 'Pressure Converter', category: 'Unit Converters' },
    { id: 'energy-converter', name: 'Energy Converter', category: 'Unit Converters' },
    { id: 'data-storage-converter', name: 'Data Storage Converter', category: 'Unit Converters' },
    { id: 'power-converter', name: 'Power Converter', category: 'Unit Converters' },
    { id: 'currency-converter', name: 'Currency Converter', category: 'Unit Converters' },
    
    // Color Tools (8 pages)
    { id: 'color-picker', name: 'Color Picker', category: 'Color Tools' },
    { id: 'color-converter', name: 'Color Converter', category: 'Color Tools' },
    { id: 'gradient-generator', name: 'Gradient Generator', category: 'Color Tools' },
    { id: 'color-palette-generator', name: 'Color Palette Generator', category: 'Color Tools' },
    { id: 'random-color-generator', name: 'Random Color Generator', category: 'Color Tools' },
    { id: 'color-contrast-checker', name: 'Color Contrast Checker', category: 'Color Tools' },
    { id: 'hex-to-rgb', name: 'Hex to RGB', category: 'Color Tools' },
    { id: 'rgb-to-hex', name: 'RGB to Hex', category: 'Color Tools' },
    
    // File Tools (4 pages)
    { id: 'csv-to-json', name: 'CSV to JSON', category: 'File Tools' },
    { id: 'json-to-csv', name: 'JSON to CSV', category: 'File Tools' },
    { id: 'txt-to-pdf', name: 'TXT to PDF', category: 'File Tools' },
    { id: 'zip-extractor', name: 'ZIP Extractor', category: 'File Tools' },
    
    // Audio Tools (2 pages)
    { id: 'mp3-cutter', name: 'MP3 Cutter', category: 'Audio Tools' },
    { id: 'audio-converter', name: 'Audio Converter', category: 'Audio Tools' },
    
    // Video Tools (1 page)
    { id: 'video-cutter', name: 'Video Cutter', category: 'Video Tools' },
  ];

  console.log(`Total pages to populate: ${pages.length}`);
  console.log('\nContent will be added through the admin dashboard.');
  console.log('Please use the admin panel to add content for each page.\n');
  
  // Generate a summary
  const summary = {};
  pages.forEach(page => {
    if (!summary[page.category]) {
      summary[page.category] = 0;
    }
    summary[page.category]++;
  });
  
  console.log('Pages by category:');
  Object.entries(summary).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} pages`);
  });
};

populateAllPages();
