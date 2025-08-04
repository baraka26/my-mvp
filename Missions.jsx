import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Fallback-safe mission templates
const missionTemplates = [
  {
    id: 1,
    title: "Launch a Mini Project",
    description:
      "Create something small but real that aligns with your purpose. Could be a blog, app, or art piece.",
    tags: ["creator", "starter", "solo"],
  },
  {
    id: 2,
    title: "Interview Someone Inspiring",
    description:
      "Talk to someone doing work aligned with your purpose. Record your key takeaways.",
    tags: ["network", "discovery", "mentor"],
  },
  {
    id: 3,
    title: "Volunteer in Your Area",
    description:
      "Find a local group aligned with your mission. Spend a day contributing meaningfully.",
    tags: ["action", "local", "impact"],
  },
  {
    id: 4,
    title: "Design Your Dream Role",
    description:
      "Write a job description for the role you’d love to play in the world.",
    tags: ["clarity", "career", "vision"],
  },
];

function MissionCard({ mission, completed, onComplete }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !completed) {
      onComplete(mission);
    }
  };

  return (
    <section
      className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition outline-none focus:ring-2 focus:ring-indigo-300"
      aria-labelledby={`mission-title-${mission.id}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h3
        id={`mission-title-${mission.id}`}
        className="text-xl font-semibold text-gray-800 mb-2"
      >
        {mission.title}
      </h3>
      <p className="text-gray-600 mb-4">{mission.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {mission.tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => !completed && onComplete(mission)}
        className={`text-indigo-600 font-medium transition-transform duration-200 focus:outline-none ${
          completed
            ? "opacity-50 cursor-not-allowed scale-95"
            : "hover:underline hover:scale-105"
        }`}
        aria-disabled={completed}
        disabled={completed}
      >
        {completed ? "Completed ✓" : "Mark as Complete →"}
      </button>
    </section>
  );
}

MissionCard.propTypes = {
  mission: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  completed: PropTypes.bool,
  onComplete: PropTypes.func.isRequired,
};

export default function Missions() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [completedMissions, setCompletedMissions] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("completedMissions");
    if (saved) {
      setCompletedMissions(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem(
      "completedMissions",
      JSON.stringify(completedMissions)
    );
  }, [completedMissions]);

  const handleComplete = (mission) => {
    if (!completedMissions.includes(mission.id)) {
      setCompletedMissions((prev) => [...prev, mission.id]);

      // Optional: Analytics Event
      if (typeof window.titanAudit === "function") {
        window.titanAudit("MISSION_COMPLETE", {
          userId: user?.id || "anonymous",
          missionId: mission.id,
          timestamp: Date.now(),
        });
      }

      setTimeout(() => {
        navigate("/feed");
      }, 800);
    }
  };

  const safeMissions = Array.isArray(missionTemplates) ? missionTemplates : [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-800 mb-2">Your Missions</h2>
      <p className="text-gray-600 text-center max-w-xl mb-8">
        Based on your answers, we’ve selected missions to help you explore your purpose through real-world action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {safeMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            completed={completedMissions.includes(mission.id)}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
}
