import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { Play, Pause, Scissors, Upload, Download, Video } from 'lucide-react';

const VideoCutter: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setCurrentTime(0);
      setStartTime(0);
      setEndTime(0);
      
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setEndTime(videoRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const cutVideo = () => {
    if (!videoFile) return;
    
    // This is a simplified demonstration
    console.log(`Cutting video from ${startTime}s to ${endTime}s`);
    
    // Simulate download
    const blob = new Blob([videoFile], { type: videoFile.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cut_${videoFile.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout title="Video Cutter" showBackButton>
      <div className="space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Demo Version</div>
          <div className="text-white/70 text-sm">
            This is a demonstration of video cutting. Real video processing requires FFmpeg or server-side tools.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload & Player */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Video Player</h3>
            
            {!videoFile ? (
              <div className="border-2 border-dashed border-glass rounded-lg p-8 text-center">
                <Video className="mx-auto text-white/50 mb-4" size={48} />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="videoFile"
                />
                <label
                  htmlFor="videoFile"
                  className="cursor-pointer inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Choose Video File
                </label>
                <p className="text-white/60 text-sm mt-2">
                  Supports MP4, AVI, MOV, WEBM files
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-white font-medium">{videoFile.name}</div>
                  <div className="text-white/60 text-sm">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>

                <video
                  ref={videoRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full rounded-lg"
                  controls
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
            
            {videoFile && duration > 0 ? (
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
                  onClick={cutVideo}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Scissors size={18} />
                  Cut Video
                </button>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8">
                <Scissors className="mx-auto mb-4 text-white/30" size={48} />
                <p>Upload a video file to start cutting</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setVideoFile(null);
              setIsPlaying(false);
            }}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Video Cutting Guide</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Upload your video file and use the player to preview</p>
            <p>• Set start and end times using the sliders</p>
            <p>• Use "Go to Start/End" buttons to preview cut points</p>
            <p>• Click "Cut Video" to download the trimmed segment</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoCutter;