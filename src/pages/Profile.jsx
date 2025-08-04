// src/components/Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

// Displays value or fallback as styled italic gray text
const getDisplayValue = (value, fallback = "Not provided") =>
  value ? value : <span className="italic text-gray-400">{fallback}</span>;

export default function Profile() {
  const {
    user,
    missionsCompleted = [],
    purposeScore,
    purposeResult,
  } = useContext(UserContext);

  // Case: Not logged in or user data missing
  if (!user) {
    return (
      <main
        className="flex flex-col items-center justify-center h-screen text-center px-4"
        aria-label="Profile screen (not logged in)"
      >
        <h2 className="text-2xl font-bold mb-2">You're not logged in</h2>
        <p className="text-gray-600">Please sign in to access your profile.</p>
      </main>
    );
  }

  return (
    <main
      className="max-w-3xl mx-auto mt-10 p-4"
      aria-label="User profile main content"
    >
      {/* PROFILE HEADER */}
      <section
        className="mb-6 bg-white rounded-2xl shadow-lg p-6"
        aria-labelledby="profile-heading"
      >
        <header>
          <h2
            id="profile-heading"
            className="text-xl font-bold mb-2"
            aria-label="Profile section heading"
          >
            👤 Profile
          </h2>
        </header>
        <div className="text-gray-700 space-y-1">
          <p><strong>Name:</strong> {getDisplayValue(user.name)}</p>
          <p><strong>Email:</strong> {getDisplayValue(user.email)}</p>
          <p>
            <strong>Bio:</strong>{" "}
            {getDisplayValue(user.bio, "No bio added yet.")}
          </p>
        </div>
      </section>

      {/* PURPOSE SCORE */}
      <section
        className="mb-6 bg-white rounded-2xl shadow-lg p-6"
        aria-labelledby="purpose-score-heading"
      >
        <header>
          <h2
            id="purpose-score-heading"
            className="text-xl font-bold mb-2"
            aria-label="Purpose score heading"
          >
            🏆 Purpose Score
          </h2>
        </header>
        <p className="text-gray-700 text-lg">
          {typeof purposeScore === "number"
            ? `${purposeScore}/100`
            : (
              <span className="italic text-gray-400">
                No score yet. Take the purpose test!
              </span>
            )}
        </p>
      </section>

      {/* MISSIONS COMPLETED */}
      <section
        className="mb-6 bg-white rounded-2xl shadow-lg p-6"
        aria-labelledby="missions-completed-heading"
      >
        <header>
          <h2
            id="missions-completed-heading"
            className="text-xl font-bold mb-2"
            aria-label="Missions completed heading"
          >
            🎯 Missions Completed
          </h2>
        </header>
        {missionsCompleted.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {missionsCompleted.map((mission, index) => (
              <li key={mission.id || mission.name || index}>
                {mission.name || mission}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No missions completed yet.</p>
        )}
      </section>

      {/* PURPOSE INSIGHT */}
      <section
        className="bg-white rounded-2xl shadow-lg p-6"
        aria-labelledby="purpose-insight-heading"
      >
        <header>
          <h2
            id="purpose-insight-heading"
            className="text-xl font-bold mb-2"
            aria-label="Purpose insight heading"
          >
            🔍 Purpose Insight
          </h2>
        </header>
        {purposeResult ? (
          <p className="text-gray-700">{purposeResult}</p>
        ) : (
          <p className="text-gray-600 italic">
            You haven’t taken the purpose test yet.
          </p>
        )}
      </section>
    </main>
  );
}
