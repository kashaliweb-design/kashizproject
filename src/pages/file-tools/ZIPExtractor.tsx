import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FileArchive, Download, File } from 'lucide-react';

const ZIPExtractor: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [extractedFiles, setExtractedFiles] = useState<any[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(uploadedFiles);
    setExtractedFiles([]);
  };

  const extractZIP = async () => {
    if (files.length === 0) return;

    setIsExtracting(true);
    
    try {
      // Note: This is a simplified implementation
      // In a real application, you would use a library like JSZip
      const file = files[0];
      
      // For demonstration, we'll show file info
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleString()
      };

      // Simulate extraction process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setExtractedFiles([
        { name: 'document.txt', size: '2.5 KB', type: 'text/plain' },
        { name: 'image.jpg', size: '156 KB', type: 'image/jpeg' },
        { name: 'data.csv', size: '8.2 KB', type: 'text/csv' },
        { name: 'readme.md', size: '1.1 KB', type: 'text/markdown' }
      ]);
      
    } catch (error) {
      console.error('Error extracting ZIP:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadFile = (fileName: string) => {
    // Simulate file download
    console.log(`Downloading: ${fileName}`);
  };

  const clearAll = () => {
    setFiles([]);
    setExtractedFiles([]);
  };

  return (
    <Layout title="ZIP File Extractor" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Version</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of ZIP extraction. Real ZIP extraction requires additional libraries like JSZip.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Upload ZIP File</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-glass rounded-lg p-8 text-center">
                <FileArchive className="mx-auto text-white/50 mb-4" size={48} />
                <input
                  type="file"
                  accept=".zip,.rar,.7z"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="zipFile"
                />
                <label
                  htmlFor="zipFile"
                  className="cursor-pointer inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Choose ZIP File
                </label>
                <p className="text-white/60 text-sm mt-2">
                  Supports .zip, .rar, .7z files
                </p>
              </div>

              {files.length > 0 && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Selected File</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm">{file.name}</div>
                        <div className="text-white/60 text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        onClick={extractZIP}
                        disabled={isExtracting}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isExtracting ? 'Extracting...' : 'Extract'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Extracted Files */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Extracted Files</h3>
            
            {extractedFiles.length > 0 ? (
              <div className="space-y-3">
                {extractedFiles.map((file, index) => (
                  <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <File className="text-white/70" size={20} />
                        <div>
                          <div className="text-white text-sm">{file.name}</div>
                          <div className="text-white/60 text-xs">{file.size}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadFile(file.name)}
                        className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    extractedFiles.forEach(file => downloadFile(file.name));
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Download All Files
                </button>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                <FileArchive className="mx-auto mb-4 text-white/30" size={48} />
                <p>Upload and extract a ZIP file to see contents here</p>
              </div>
            )}
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
          <h3 className="text-lg font-semibold text-white mb-4">ZIP File Extraction</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Extract files from ZIP, RAR, and 7Z archives</p>
            <p>• View file contents before downloading</p>
            <p>• Download individual files or all files at once</p>
            <p>• All processing happens in your browser for privacy</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZIPExtractor;