import React, { useState } from 'react';

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    // Toggle liked state immediately (optimistic update)
    setLiked(prev => !prev);
    // Note: In a real app, you’d also update the server or context here.
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? "Unlike this post" : "Like this post"}
      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-red-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Filled heart icon */}
          <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53C2 5.42 4.42 3 
                   7.5 3c1.74 0 3.41.81 4.5 2.09A7.23 7.23 0 0116.5 3c3.08 0 5.5 2.42 
                   5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outlined heart icon */}
          <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53C2 5.42 4.42 3 
                   7.5 3c1.74 0 3.41.81 4.5 2.09A7.23 7.23 0 0116.5 3c3.08 0 5.5 2.42 
                   5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
}

export default LikeButton;
