import React, { useState } from "react";

const moods = [
  { emoji: "😄", label: "Happy", color: "bg-blue-200" },
  { emoji: "😊", label: "Content", color: "bg-blue-300" },
  { emoji: "😐", label: "Neutral", color: "bg-blue-400" },
  { emoji: "😔", label: "Sad", color: "bg-blue-500" },
  { emoji: "😠", label: "Angry", color: "bg-blue-600" },
  { emoji: "😴", label: "Tired", color: "bg-blue-700" },
  { emoji: "😰", label: "Stressed", color: "bg-blue-800" },
  { emoji: "😎", label: "Confident", color: "bg-blue-900" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.label);
    localStorage.setItem("todayMood", mood.label);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
          How are you feeling today?
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood)}
              className={`flex flex-col items-center justify-center rounded-2xl p-4 text-white text-lg font-semibold ${mood.color} hover:scale-105 transition-transform shadow-md`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="text-center mt-6 text-lg font-medium text-blue-900">
            Your mood for today: <span className="font-bold">{selectedMood}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
