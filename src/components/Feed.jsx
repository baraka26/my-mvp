import React, { useEffect, useState, useContext, useCallback } from 'react';
import FeedCard from '../components/FeedCard';
import { UserContext } from '../context/UserContext';
import { LikeButton } from '../components/LikeButton';

/**
 * @typedef {Object} Post
 * @property {string} _id
 * @property {string} userId
 * @property {string} content
 * @property {string} createdAt
 * @property {number} likes
 */

function Feed() {
  const [feed, setFeed] = useState(/** @type {Post[]} */ ([]));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);

  const fetchFeed = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/feed');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setFeed(data);
    } catch (err) {
      setError('Failed to load feed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Feed</h1>

      <div role="status" aria-live="polite" className="mb-4">
        {isLoading && <p className="text-gray-500">Loading feed...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && feed.length === 0 && (
          <p className="text-gray-600">No posts yet. Be the first to share something!</p>
        )}
      </div>

      <div className="space-y-6">
        {feed.map((post) => (
          <MemoizedFeedCard
            key={post._id}
            post={post}
            isOwn={user?._id === post.userId}
          >
            <LikeButton postId={post._id} />
          </MemoizedFeedCard>
        ))}
      </div>
    </div>
  );
}

// 🚀 React.memo for re-render savings if props are unchanged
const MemoizedFeedCard = React.memo(FeedCard);

export default Feed;
