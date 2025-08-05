import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const questions = [
  "When do I feel most alive or 'in flow'?",
  "What problem in the world bothers me the most?",
  "If I had unlimited time and money, what would I spend my life doing?",
  "What do people thank me for, or come to me for?"
];

export default function PurposeTest() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [touched, setTouched] = useState(Array(questions.length).fill(false));

  // Auto-expand textareas
  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    const expand = (el) => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    textareas.forEach((el) => {
      expand(el);
      el.addEventListener("input", () => expand(el));
    });

    return () => {
      textareas.forEach((el) => {
        el.removeEventListener("input", () => expand(el));
      });
    };
  }, []);

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allAnswered = responses.every((res) => res.trim() !== '');
    if (!allAnswered) {
      setTouched(Array(questions.length).fill(true));
      return;
    }

    const joined = responses.join(' | ');
    updateUser({ purposeReflection: joined });
    navigate('/purpose-result');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Deep Purpose Discovery</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, i) => (
          <div key={i}>
            <label htmlFor={`q${i}`} className="block mb-2 font-medium">
              {question}
            </label>
            <textarea
              id={`q${i}`}
              rows={3}
              value={responses[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              aria-describedby={touched[i] && responses[i].trim() === '' ? `error-${i}` : undefined}
              className={`w-full border ${
                touched[i] && responses[i].trim() === '' ? 'border-red-500' : 'border-gray-300'
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Your response..."
            />
            {touched[i] && responses[i].trim() === '' && (
              <p id={`error-${i}`} className="text-red-500 text-sm mt-1">
                This question is required.
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          See My Purpose
        </button>
      </form>
    </div>
  );
}
