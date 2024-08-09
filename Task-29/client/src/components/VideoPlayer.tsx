import React, { useState } from 'react';

const VideoPlayer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handlePlayVideo = () => {
    setVideoUrl('http://localhost:3001/video');
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handlePlayVideo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play Video
      </button>
      {videoUrl && (
        <video
          className="mt-4 w-full"
          controls
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
