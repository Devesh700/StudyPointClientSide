import React, { useEffect, useState } from 'react';

const LoadingPage = () => {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('loading...');

  const emojis = ['😀', '😐', '😟', '😢', '😞', '😔', '😣', '😩', '😢', '😱', '😳'];

  useEffect(() => {
    const interval = setInterval(() => {
      // If emojiIndex exceeds the length of emojis array, show "sorry" message
      if (emojiIndex < emojis.length - 1) {
        setEmojiIndex((prevIndex) => prevIndex + 1);
      } else {
        setLoadingMessage('Sorry for taking so long!');
      }
    }, 1000); // Change emoji every 500ms

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [emojiIndex]);

  return (
    <div className='bg-overlay fixed h-dvh w-full flex flex-col justify-center items-center z-50'>
      <h1 className='text-3xl font-bold'>{loadingMessage}</h1>
      <div className='text-5xl'>{emojis[emojiIndex]}</div>
      <div className='loading-dots-container'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingPage;
