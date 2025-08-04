import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

/**
 * Best-in-Class Feed Component
 * - Reusable, scalable, and accessible
 * - Handles empty, loading, and error states
 * - Supports dynamic data (replace fetchFeed with real API later)
 * - Animations for delight
 * - Responsive and mobile-first
 * - Fully typed with JSDoc
 * - Aria labels for accessibility
 * - Customizable like button
 * - Modular UI for future extensions
 */

/**
 * @typedef {Object} FeedPost
 * @property {number|string} id
 * @property {string} author
 * @property {string} mission
 * @property {string} reflection
 * @property {number} likes
 * @property {boolean} [liked]
 */

/** Simulated async fetch for feed data */
const fetchFeed = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            author: "Kai",
            mission: "Launch a Mini Project",
            reflection:
              "Just pushed the first commit on a journaling app built around my core values. Feels aligned for once.",
            likes: 14,
            liked: false,
          },
          {
            id: 2,
            author: "Sage",
            mission: "Interview Someone Inspiring",
            reflection:
              "Spoke to a founder in the climate space — made me rethink what impact really means.",
            likes: 22,
            liked: false,
          },
          {
            id: 3,
            author: "Rei",
            mission: "Volunteer Locally",
            reflection:
              "Helped out at a youth shelter. Small work, but it felt powerful. I’m changing.",
            likes: 30,
            liked: false,
          },
        ]),
      500
    )
  );

/**
 * Like button with animation
 * @param {{liked: boolean, onClick: () => void, count: number, ariaLabel: string}} props
 */
function LikeButton({ liked, onClick, count, ariaLabel }) {
  return (
    <button
      className={`flex items-center space-x-1 transition-colors duration-150 focus:outline-none ${
        liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
      }`}
      aria-pressed={liked}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      <span
        className={`text-lg ${
          liked ? "animate-bounce" : ""
        }`}
        role="img"
        aria-hidden="true"
      >
        ❤️
      </span>
      <span>{count}</span>
    </button>
  );
}

/**
 * Individual Feed Post Card
 * @param {{post: FeedPost, onLike: (id: number|string) => void}} props
 */
function FeedCard({ post, onLike }) {
  return (
    <article
      className="bg-white shadow-sm hover:shadow-md focus-within:shadow-md p-6 rounded-2xl transition-all duration-200 border border-transparent hover:border-indigo-100 outline-none"
      tabIndex={0}
      aria-labelledby={`feedcard-mission-${post.id}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3
          id={`feedcard-mission-${post.id}`}
          className="text-indigo-700 font-semibold text-lg"
        >
          {post.mission}
        </h3>
        <span className="text-xs text-gray-400">
          by{" "}
          <Link className="underline" to={`/profile/${post.author}`}>
            {post.author}
          </Link>
        </span>
      </div>
      <p className="text-gray-700 italic mb-3">&quot;{post.reflection}&quot;</p>
      <div className="flex items-center justify-between">
        <LikeButton
          liked={post.liked}
          onClick={() => onLike(post.id)}
          count={post.likes}
          ariaLabel={post.liked ? "Unlike this post" : "Like this post"}
        />
      </div>
    </article>
  );
}

/**
 * Main Feed Component
 */
export default function Feed() {
  const { user } = useContext(UserContext);
  const [feed, setFeed] = useState(/** @type {FeedPost[]} */ ([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch feed on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    fetchFeed()
      .then((data) => {
        if (mounted) setFeed(data);
      })
      .catch(() => {
        if (mounted) setError("Could not load the feed. Please try again.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Handle like toggling
  const handleLike = useCallback(
    (id) => {
      setFeed((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                liked: !post.liked,
                likes: post.likes + (post.liked ? -1 : 1),
              }
            : post
        )
      );
    },
    [setFeed]
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-8 py-10">
      <header className="mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-indigo-800 mb-2" tabIndex={0}>
          The Purpose Feed
        </h2>
        <p className="text-gray-600">
          Explore reflections from others walking the same journey. Real actions.
          Real clarity. Real growth.
        </p>
      </header>

      <section className="space-y-6 max-w-3xl">
        {loading && (
          <div className="text-center text-gray-400 py-10 animate-pulse">
            Loading feed...
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 py-8">{error}</div>
        )}
        {!loading && !error && feed.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No posts yet. Be the first to share your journey!
          </div>
        )}
        {!loading &&
          !error &&
          feed.map((post) => (
            <FeedCard key={post.id} post={post} onLike={handleLike} />
          ))}
      </section>

      {/* Optionally, add a floating post button for logged-in users */}
      {user && (
        <Link
          to="/post"
          className="fixed bottom-8 right-8 bg-indigo-600 text-white rounded-full p-4 shadow-xl hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Create a new post"
        >
          <span className="text-xl font-bold" aria-hidden="true">
            ＋
          </span>
        </Link>
      )}
    </main>
  );
}

