import React, { useState } from 'react';
import Layout from '../../components/Layout';

const CSVToJSON: React.FC = () => {
  const [csvData, setCsvData] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);

  const csvToJson = (csv: string) => {
    if (!csv.trim()) return '';

    try {
      const lines = csv.trim().split('\n');
      const headers = hasHeader ? lines[0].split(delimiter).map(h => h.trim()) : [];
      const dataLines = hasHeader ? lines.slice(1) : lines;

      const result = dataLines.map((line, index) => {
        const values = line.split(delimiter).map(v => v.trim());
        const obj: any = {};

        if (hasHeader) {
          headers.forEach((header, i) => {
            obj[header] = values[i] || '';
          });
        } else {
          values.forEach((value, i) => {
            obj[`column_${i + 1}`] = value;
          });
        }

        return obj;
      });

      return JSON.stringify(result, null, 2);
    } catch (error) {
      return 'Error parsing CSV data';
    }
  };

  const handleCsvChange = (value: string) => {
    setCsvData(value);
    setJsonData(csvToJson(value));
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCsvData('');
    setJsonData('');
  };

  const sampleCSV = `name,age,city,country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,Toronto,Canada`;

  return (
    <Layout title="CSV to JSON Converter" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CSV Input */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">CSV Data</h3>
              <button
                onClick={() => handleCsvChange(sampleCSV)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={csvData}
              onChange={(e) => handleCsvChange(e.target.value)}
              placeholder="Paste your CSV data here..."
              className="w-full h-64 p-4 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono text-sm"
            />
            
            {/* Options */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Delimiter</label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="w-full p-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
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
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="rounded"
                />
                <span className="text-white/70 text-sm">First row contains headers</span>
              </label>
            </div>
          </div>

          {/* JSON Output */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">JSON Output</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(jsonData)}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
                <button
                  onClick={downloadJSON}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {jsonData || 'JSON output will appear here...'}
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
          <h3 className="text-lg font-semibold text-white mb-4">CSV to JSON Conversion</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• CSV (Comma-Separated Values) files are converted to JSON (JavaScript Object Notation) format</p>
            <p>• Each row becomes a JSON object with column headers as keys</p>
            <p>• Choose the appropriate delimiter based on your CSV file format</p>
            <p>• Enable "First row contains headers" if your CSV has column names in the first row</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CSVToJSON;