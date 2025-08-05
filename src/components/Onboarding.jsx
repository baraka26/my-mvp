// src/components/Onboarding.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Optional content abstraction for maintainability and future A/B testing
const onboardingContent = {
  title: (
    <>
      Welcome to <span className="text-indigo-600 font-semibold">Applica</span>
    </>
  ),
  description: (
    <>
      Discover your purpose, complete missions, and unlock your future.<br />
      We’re here to guide you step-by-step.
    </>
  ),
  buttonText: "Start Now",
};

export default function Onboarding() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Optional: Log onboarding render to audit system
  useEffect(() => {
    if (window?.titanAudit) {
      window.titanAudit({
        event: "screen_view",
        screen: "onboarding",
        timestamp: Date.now(),
      });
    }
  }, []);

  // Handle start: sets onboarding complete and routes forward
  const handleStart = () => {
    try {
      setUser((prev) => ({ ...prev, onboardingComplete: true }));

      // Log event (deferred safety)
      window?.titanAudit?.({
        event: "onboarding_complete",
        timestamp: Date.now(),
      });

      navigate("/purpose-test");
    } catch (error) {
      console.error("Onboarding start failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main
      className="flex flex-col items-center justify-center h-screen text-center px-6 bg-gradient-to-b from-indigo-50 via-white to-purple-50"
      aria-label="Onboarding screen"
    >
      <h1
        className="text-4xl font-bold text-gray-900 mb-4"
        tabIndex={0}
        aria-label="Welcome to Applica"
      >
        {onboardingContent.title}
      </h1>

      <p
        className="text-lg text-gray-700 mb-8 max-w-md"
        tabIndex={0}
        aria-label="Discover your purpose and unlock your future"
      >
        {onboardingContent.description}
      </p>

      <button
        type="button"
        onClick={handleStart}
        className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label="Start onboarding"
        autoFocus
      >
        {onboardingContent.buttonText}
      </button>
    </main>
  );
}
