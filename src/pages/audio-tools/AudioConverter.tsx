import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';
import { Upload, Download, Music } from 'lucide-react';

const AudioConverter: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('wav');
  const [quality, setQuality] = useState('high');
  const [isConverting, setIsConverting] = useState(false);

  const formats = [
    { value: 'wav', label: 'WAV', description: 'Uncompressed audio' },
    { value: 'mp3', label: 'MP3', description: 'Compressed audio' },
    { value: 'ogg', label: 'OGG', description: 'Open source format' },
    { value: 'm4a', label: 'M4A', description: 'Apple audio format' }
  ];

  const qualities = [
    { value: 'low', label: 'Low (128 kbps)', description: 'Smaller file size' },
    { value: 'medium', label: 'Medium (192 kbps)', description: 'Balanced quality' },
    { value: 'high', label: 'High (320 kbps)', description: 'Best quality' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const convertAudio = async () => {
    if (!audioFile) return;

    setIsConverting(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a blob with the original file (demo purposes)
      const blob = new Blob([audioFile], { type: `audio/${outputFormat}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${outputFormat}`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error converting audio:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const clearAll = () => {
    setAudioFile(null);
    setIsConverting(false);
  };

  return (
    <Layout title="Audio Converter" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Version</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of audio conversion. Real audio conversion requires Web Audio API or server-side processing.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Upload Audio</h3>
            
            {!audioFile ? (
              <div className="border-2 border-dashed border-glass rounded-lg p-8 text-center">
                <Music className="mx-auto text-white/50 mb-4" size={48} />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audioFile"
                />
                <label
                  htmlFor="audioFile"
                  className="cursor-pointer inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Choose Audio File
                </label>
                <p className="text-white/60 text-sm mt-2">
                  Supports MP3, WAV, OGG, M4A files
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Music className="text-white/70" size={24} />
                    <div>
                      <div className="text-white font-medium">{audioFile.name}</div>
                      <div className="text-white/60 text-sm">
                        {(audioFile.size / 1024 / 1024).toFixed(2)} MB • {audioFile.type}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setAudioFile(null)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Choose Different File
                </button>
              </div>
            )}
          </div>

          {/* Conversion Settings */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Conversion Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Output Format</label>
                <div className="space-y-2">
                  {formats.map((format) => (
                    <label key={format.value} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value={format.value}
                        checked={outputFormat === format.value}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="text-cyan-500"
                      />
                      <div>
                        <div className="text-white/90 text-sm font-medium">{format.label}</div>
                        <div className="text-white/60 text-xs">{format.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Quality</label>
                <div className="space-y-2">
                  {qualities.map((qual) => (
                    <label key={qual.value} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="quality"
                        value={qual.value}
                        checked={quality === qual.value}
                        onChange={(e) => setQuality(e.target.value)}
                        className="text-purple-500"
                      />
                      <div>
                        <div className="text-white/90 text-sm font-medium">{qual.label}</div>
                        <div className="text-white/60 text-xs">{qual.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={convertAudio}
                disabled={!audioFile || isConverting}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                {isConverting ? 'Converting...' : `Convert to ${outputFormat.toUpperCase()}`}
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
          <h3 className="text-lg font-semibold text-white mb-4">Audio Format Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Format Comparison</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">MP3</div>
                  <div className="text-white/60">Compressed, widely supported</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">WAV</div>
                  <div className="text-white/60">Uncompressed, high quality</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">OGG</div>
                  <div className="text-white/60">Open source, good compression</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Quality Settings</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">128 kbps</div>
                  <div className="text-white/60">Good for voice, smaller files</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">192 kbps</div>
                  <div className="text-white/60">Good balance of quality/size</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">320 kbps</div>
                  <div className="text-white/60">Near CD quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default AudioConverter;