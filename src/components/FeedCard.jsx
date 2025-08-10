import React from 'react';

function FeedCard({ post, isOwn, children }) {
  // Guard against missing post prop
  if (!post || typeof post !== 'object') {
    console.error("FeedCard: invalid post prop", post);
    return (
      <div className="max-w-md mx-auto bg-red-100 text-red-700 rounded-lg p-4 mb-4">
        Post data unavailable
      </div>
    );
  }
  const {
    _id, 
    content = '', 
    userId = 'Unknown', 
    createdAt, 
    likes = 0
  } = post;
  
  // Format timestamp safely
  let timestamp = 'Unknown date';
  if (createdAt) {
    const dateObj = new Date(createdAt);
    if (!isNaN(dateObj)) {
      timestamp = dateObj.toLocaleString();
    }
  }

  const authorName = isOwn ? 'You' : userId;

  return (
    <article className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <span className="text-gray-900 font-medium">{authorName}</span>
        <time dateTime={createdAt || ''} className="text-gray-500 text-sm">
          {timestamp}
        </time>
      </header>
      <p className="mt-2 text-gray-700">{content}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-600 text-sm">
          {likes} {likes === 1 ? 'like' : 'likes'}
        </span>
        {children ? (
          <div className="flex space-x-2">
            {children}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default React.memo(FeedCard);