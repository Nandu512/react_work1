import React from 'react';

const Background = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      onError={(e) => console.log('Video failed to load:', e)}
    >
      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Background;