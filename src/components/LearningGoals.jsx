import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const LearningGoals = () => {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");

  // Load goals from localStorage
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("learningGoals")) || [];
    setGoals(storedGoals);

    // Random quote (or fetch from an API if preferred)
    const quotes = [
      "Learning never exhausts the mind. – Leonardo da Vinci",
      "The beautiful thing about learning is nobody can take it away from you. – B.B. King",
      "The more that you read, the more things you will know. – Dr. Seuss",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Save to localStorage when goals change
  useEffect(() => {
    localStorage.setItem("learningGoals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (input.trim()) {
      const newGoal = { text: input, completed: false };
      setGoals([...goals, newGoal]);
      setInput("");
    }
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
  };

  const toggleComplete = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
  };

  return (
      <div className="md:col-span-3  p-6 ">
        <h3 className="text-3xl font-semibold text-sky-950 mb-3">Learning Goals</h3>
        <div className="flex items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter a goal"
            className="flex-1 p-2 rounded bg-white/50 text-sky-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addGoal}
            className="text-white bg-sky-600 p-2 rounded hover:bg-sky-700"
            title="Add Goal"
          >
            <FaPlus />
          </button>
        </div>
        <ul className="space-y-3 text-sky-900">
          {goals.map((goal, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 rounded ${
                goal.completed ? "bg-green-100" : "bg-white/40"
              }`}
            >
              <span
                className={`flex-1 ${
                  goal.completed ? "line-through text-green-800" : ""
                }`}
              >
                {goal.text}
              </span>
              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => toggleComplete(index)}
                  className="text-green-700 hover:text-green-900"
                  title="Mark as Completed"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteGoal(index)}
                  className="text-red-700 hover:text-red-900"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default LearningGoals;
