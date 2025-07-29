import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const ReflectionJournal = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [reflection, setReflection] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  // Load entry if in view mode
  useEffect(() => {
    if (id) {
      const stored = JSON.parse(localStorage.getItem("reflections")) || [];
      const entry = stored.find((r) => r.id === id);
      if (entry) {
        setTitle(entry.title);
        setReflection(entry.content);
        setIsViewMode(true);
      }
    }
  }, [id]);

  const handleReflect = () => {
    if (!title.trim() || !reflection.trim()) return;

    const newEntry = {
      id: uuidv4(),
      title,
      content: reflection,
      date: new Date().toLocaleDateString("en-GB"),
    };

    const existing = JSON.parse(localStorage.getItem("reflections")) || [];
    localStorage.setItem("reflections", JSON.stringify([newEntry, ...existing]));

    setLoading(true);
    setAiResponse("");

    setTimeout(() => {
      const fakeResponse = generateAIReflection(reflection);
      setAiResponse(fakeResponse);
      setLoading(false);
      setTitle("");
      setReflection("");
    }, 1500);
  };

  const generateAIReflection = (input) => {
    return `Thanks for sharing your thoughts! Based on what you've written, it seems like you're diving deep into learning. You might also enjoy exploring more advanced concepts in this area. Stay curious! 🌟`;
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-5 gap-6 bg-[url('./assets/images/profile.jpg')] bg-cover bg-no-repeat bg-center min-h-screen">
      {/* Reflection Form */}
      <div className="md:col-span-3 p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/30">
        <h2 className="text-2xl font-bold text-sky-900 mb-4 flex items-center gap-2">
          <Sparkles className="text-sky-900" size={24} />
          {isViewMode ? "Your Reflection Entry" : "Reflect on Your Learnings"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your reflection"
          disabled={isViewMode}
          className="w-full p-3 mb-4 text-sky-900 rounded-md border border-sky-200 bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What did you learn today? What confused you? What would you like to explore more?"
          disabled={isViewMode}
          className="w-full h-40 p-4 text-sky-900 rounded-md resize-none border border-sky-200 bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        {!isViewMode && (
          <button
            onClick={handleReflect}
            className="mt-4 px-6 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-900 transition"
          >
            Reflect with AI
          </button>
        )}
      </div>

      {/* AI Feedback */}
      <div className="md:col-span-2 p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/30">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">LearnMirror's Feedback</h2>
        {loading ? (
          <p className="text-sky-800 animate-pulse">Thinking...</p>
        ) : aiResponse ? (
          <p className="text-sky-900 whitespace-pre-line">{aiResponse}</p>
        ) : isViewMode ? (
          <p className="text-sky-700 italic">This is a previously saved reflection.</p>
        ) : (
          <p className="text-sky-700 italic">Your AI feedback will appear here after submission.</p>
        )}
      </div>
    </div>
  );
};

export default ReflectionJournal;
