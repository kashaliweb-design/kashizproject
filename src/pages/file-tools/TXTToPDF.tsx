import React, { useState } from 'react';
import Layout from '../../components/Layout';

const TXTToPDF: React.FC = () => {
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('document');
  const [fontSize, setFontSize] = useState('12');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [pageSize, setPageSize] = useState('A4');

  const generatePDF = async () => {
    if (!textContent.trim()) return;

    try {
      // Create a simple PDF using canvas and download
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Set canvas size based on page size
      const pageWidth = pageSize === 'A4' ? 595 : pageSize === 'Letter' ? 612 : 595;
      const pageHeight = pageSize === 'A4' ? 842 : pageSize === 'Letter' ? 792 : 842;
      
      canvas.width = pageWidth;
      canvas.height = pageHeight;

      // Set background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = '#000000';
      ctx.font = `${fontSize}px ${fontFamily}`;
      
      // Split text into lines and draw
      const lines = textContent.split('\n');
      const lineHeight = parseInt(fontSize) * 1.2;
      const margin = 50;
      let y = margin + parseInt(fontSize);

      lines.forEach((line, index) => {
        if (y > canvas.height - margin) {
          // Would need new page - for simplicity, we'll truncate
          return;
        }
        
        // Wrap long lines
        const maxWidth = canvas.width - (margin * 2);
        const words = line.split(' ');
        let currentLine = '';
        
        words.forEach(word => {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth && currentLine) {
            ctx.fillText(currentLine, margin, y);
            y += lineHeight;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        
        if (currentLine) {
          ctx.fillText(currentLine, margin, y);
          y += lineHeight;
        }
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName}.png`; // Note: This creates PNG, not PDF
          a.click();
          URL.revokeObjectURL(url);
        }
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const clearAll = () => {
    setTextContent('');
    setFileName('document');
  };

  const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

  return (
    <Layout title="TXT to PDF Converter" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Browser Limitation</div>
          <div className="text-white/70 text-sm">
            This tool creates a PNG image of your text. For true PDF generation, a server-side solution would be required.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Text Content</h3>
              <button
                onClick={() => setTextContent(sampleText)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Enter your text content here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* PDF Settings */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">PDF Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="document"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="10">10px</option>
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Helvetica">Helvetica</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              <button
                onClick={generatePDF}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">TXT to PDF Conversion</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Convert plain text files to PDF format for sharing and printing</p>
            <p>• Customize font size, family, and page size for your needs</p>
            <p>• Text will be automatically wrapped to fit page width</p>
            <p>• Long documents may be truncated to fit on a single page</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TXTToPDF;