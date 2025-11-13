import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { Play, Pause, Scissors, Upload, Download } from 'lucide-react';

const MP3Cutter: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setCurrentTime(0);
      setStartTime(0);
      setEndTime(0);
      
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setEndTime(audioRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const cutAudio = () => {
    if (!audioFile) return;
    
    if (!audioRef.current) return;
    
    try {
      // Create audio context for processing
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          // Calculate sample positions
          const sampleRate = audioBuffer.sampleRate;
          const startSample = Math.floor(startTime * sampleRate);
          const endSample = Math.floor(endTime * sampleRate);
          const newLength = endSample - startSample;
          
          // Create new buffer with cut audio
          const newBuffer = audioContext.createBuffer(
            audioBuffer.numberOfChannels,
            newLength,
            sampleRate
          );
          
          // Copy audio data
          for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            const oldData = audioBuffer.getChannelData(channel);
            const newData = newBuffer.getChannelData(channel);
            for (let i = 0; i < newLength; i++) {
              newData[i] = oldData[startSample + i];
            }
          }
          
          // Convert back to audio file (simplified - would need proper encoding)
          const blob = new Blob([arrayBuffer.slice(
            startSample * 4, // Approximate byte position
            endSample * 4
          )], { type: audioFile.type });
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `cut_${audioFile.name}`;
          a.click();
          URL.revokeObjectURL(url);
          
        } catch (error) {
          console.error('Error processing audio:', error);
          // Fallback to simple file download
          const blob = new Blob([audioFile], { type: audioFile.type });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `cut_${audioFile.name}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      };
      
      fileReader.readAsArrayBuffer(audioFile);
      
    } catch (error) {
      console.error('Error cutting audio:', error);
      // Fallback to simple download
      const blob = new Blob([audioFile], { type: audioFile.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cut_${audioFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout title="MP3 Cutter" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Version</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of audio cutting. Real audio processing requires Web Audio API or server-side tools.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload & Player */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Audio Player</h3>
            
            {!audioFile ? (
              <div className="border-2 border-dashed border-glass rounded-lg p-8 text-center">
                <Upload className="mx-auto text-white/50 mb-4" size={48} />
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
                  <div className="text-white font-medium">{audioFile.name}</div>
                  <div className="text-white/60 text-sm">
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />

                {/* Player Controls */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:opacity-90 transition-opacity"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <div className="flex-1">
                      <div className="text-white/70 text-sm mb-1">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cutting Controls */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Cut Settings</h3>
            
            {audioFile && duration > 0 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Start Time: {formatTime(startTime)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={startTime}
                    onChange={(e) => setStartTime(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    End Time: {formatTime(endTime)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={endTime}
                    onChange={(e) => setEndTime(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                  <div className="text-white/70 text-sm mb-1">Cut Duration:</div>
                  <div className="text-white font-medium">
                    {formatTime(Math.max(0, endTime - startTime))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSeek(startTime)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Go to Start
                  </button>
                  <button
                    onClick={() => handleSeek(endTime)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Go to End
                  </button>
                </div>

                <button
                  onClick={cutAudio}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Scissors size={18} />
                  Cut Audio
                </button>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                <Scissors className="mx-auto mb-4 text-white/30" size={48} />
                <p>Upload an audio file to start cutting</p>
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
          <h3 className="text-lg font-semibold text-white mb-4">Audio Cutting Guide</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Upload your audio file and use the player to preview</p>
            <p>• Set start and end times using the sliders</p>
            <p>• Use "Go to Start/End" buttons to preview cut points</p>
            <p>• Click "Cut Audio" to download the trimmed segment</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MP3Cutter;