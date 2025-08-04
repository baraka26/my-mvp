// src/components/PurposeTest.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const purposeQuestions = [
  "What problem do you most want to solve in the world?",
  "What activity makes you lose track of time?",
  "If you could teach one thing to millions, what would it be?",
  "When do you feel most alive or fulfilled?",
];

export default function PurposeTest() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [responses, setResponses] = useState(Array(purposeQuestions.length).fill(""));
  const [touched, setTouched] = useState(Array(purposeQuestions.length).fill(false));

  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);

    const touchedUpdate = [...touched];
    touchedUpdate[index] = true;
    setTouched(touchedUpdate);
  };

  const isComplete = responses.every((r) => r.trim().length > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    const purposeSummary = responses.join(" | ");
    setUser((prev) => ({
      ...prev,
      purposeSummary,
      purposeTestComplete: true,
    }));
    navigate("/missions");
  };

  return (
    <main
      className="min-h-screen bg-white flex flex-col items-center px-6 py-10 text-center"
      aria-label="Purpose Test Screen"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-700" tabIndex={0}>
        Discover Your Purpose
      </h1>
      <p className="text-gray-600 mb-8 max-w-xl" tabIndex={0}>
        Answer each question honestly. Your responses help us guide you toward meaningful missions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-xl"
        aria-label="Purpose Discovery Questionnaire"
      >
        {purposeQuestions.map((question, idx) => (
          <div key={idx} className="text-left">
            <label
              htmlFor={`purpose-q${idx}`}
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {question}
            </label>
            <textarea
              id={`purpose-q${idx}`}
              value={responses[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
              rows={2}
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                touched[idx] && !responses[idx].trim() ? "border-red-500" : ""
              }`}
              placeholder="Type your answer..."
              aria-invalid={touched[idx] && !responses[idx].trim()}
              aria-required="true"
              required
            />
            {touched[idx] && !responses[idx].trim() && (
              <span className="text-xs text-red-500">This answer is required.</span>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={!isComplete}
          className={`mt-10 bg-indigo-600 text-white px-8 py-3 rounded-2xl shadow transition ${
            isComplete ? "hover:bg-indigo-700" : "opacity-50 cursor-not-allowed"
          }`}
          aria-disabled={!isComplete}
        >
          Reveal My Missions
        </button>
      </form>
    </main>
  );
}

