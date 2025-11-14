import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const JSONToCSV: React.FC = () => {
  const [jsonData, setJsonData] = useState('');
  const [csvData, setCsvData] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);

  const jsonToCsv = (json: string) => {
    if (!json.trim()) return '';

    try {
      const data = JSON.parse(json);
      
      if (!Array.isArray(data) || data.length === 0) {
        return 'JSON must be an array of objects';
      }

      // Get all unique keys from all objects
      const allKeys = new Set<string>();
      data.forEach(obj => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => allKeys.add(key));
        }
      });

      const headers = Array.from(allKeys);
      let csv = '';

      // Add headers if enabled
      if (includeHeaders) {
        csv += headers.join(delimiter) + '\n';
      }

      // Add data rows
      data.forEach(obj => {
        const row = headers.map(header => {
          const value = obj[header] || '';
          // Escape values that contain the delimiter or quotes
          if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csv += row.join(delimiter) + '\n';
      });

      return csv.trim();
    } catch (error) {
      return 'Error parsing JSON data';
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonData(value);
    setCsvData(jsonToCsv(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setJsonData('');
    setCsvData('');
  };

  const sampleJSON = `[
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "country": "USA"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "city": "London",
    "country": "UK"
  },
  {
    "name": "Bob Johnson",
    "age": 35,
    "city": "Toronto",
    "country": "Canada"
  }
]`;

  return (
    <Layout title="JSON to CSV Converter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* JSON Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">JSON Data</h3>
              <button
                onClick={() => handleJsonChange(sampleJSON)}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={jsonData}
              onChange={(e) => handleJsonChange(e.target.value)}
              placeholder="Paste your JSON array here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-sm"
            />
            
            {/* Options */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Delimiter</label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="w-full p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value=",">Comma (,)</option>
                  <option value=";">Semicolon (;)</option>
                  <option value="\t">Tab</option>
                  <option value="|">Pipe (|)</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeHeaders}
                  onChange={(e) => setIncludeHeaders(e.target.checked)}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">Include column headers</span>
              </label>
            </div>
          </div>

          {/* CSV Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">CSV Output</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(csvData)}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
                <button
                  onClick={downloadCSV}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {csvData || 'CSV output will appear here...'}
              </pre>
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
          <h3 className="text-lg font-semibold text-white mb-4">JSON to CSV Conversion</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• JSON data must be an array of objects for proper CSV conversion</p>
            <p>• All objects should have similar structure for best results</p>
            <p>• Values containing delimiters or quotes will be properly escaped</p>
            <p>• Choose the appropriate delimiter for your target application</p>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default JSONToCSV;