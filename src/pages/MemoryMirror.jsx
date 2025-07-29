import React, { useState, useEffect } from 'react';
import background from '../assets/images/profile.jpg';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MemoryMirror = () => {
  const [title, setTitle] = useState('');
  const [memory, setMemory] = useState('');
  const [memories, setMemories] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('memories')) || [];
    setMemories(stored);
  }, []);

  const saveMemory = () => {
    if (!title.trim() || !memory.trim()) return;

    if (editId) {
      // Edit existing memory
      const updatedMemories = memories.map((m) =>
        m.id === editId ? { ...m, title: title.trim(), content: memory.trim() } : m
      );
      setMemories(updatedMemories);
      localStorage.setItem('memories', JSON.stringify(updatedMemories));
    } else {
      // Create new memory
      const newMemory = {
        id: uuidv4(),
        title: title.trim(),
        content: memory.trim(),
        date: new Date().toLocaleDateString('en-GB'),
      };
      const updated = [newMemory, ...memories];
      setMemories(updated);
      localStorage.setItem('memories', JSON.stringify(updated));
    }

    setTitle('');
    setMemory('');
    setEditId(null);
  };

  const deleteMemory = (id) => {
    const updated = memories.filter((m) => m.id !== id);
    setMemories(updated);
    localStorage.setItem('memories', JSON.stringify(updated));
    if (editId === id) {
      setEditId(null);
      setTitle('');
      setMemory('');
    }
  };

  const startEdit = (memory) => {
    setEditId(memory.id);
    setTitle(memory.title);
    setMemory(memory.content);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 text-white">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-6">
          💭 Memory Mirror
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Write down memories you want to hold onto. Big or small — they matter.
        </p>

        {/* Add/Edit Memory */}
        <div className="bg-white/20 p-4 rounded-xl mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your memory..."
            className="w-full p-3 mb-3 text-sky-900 rounded-md border border-sky-200 bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <textarea
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            placeholder="Type a memory you want to keep..."
            className="w-full h-32 p-3 text-sky-900 rounded-md resize-none border border-sky-200 bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={saveMemory}
            className="mt-3 px-6 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-900 transition"
          >
            {editId ? 'Update Memory' : 'Save Memory'}
          </button>
        </div>

        {/* Memory List */}
        <div>
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">Your Memories</h2>
          {memories.length === 0 ? (
            <p className="italic text-sky-800">You haven’t saved any memories yet.</p>
          ) : (
            <ul className="space-y-3">
              {memories.map((m) => (
                <li
                  key={m.id}
                  className="bg-white/30 p-4 rounded-lg flex justify-between items-start text-sky-900"
                >
                  <div className="w-11/12">
                    <p className="font-bold mb-1">{m.title}</p>
                    <p className="text-xs text-sky-800">Saved on: {m.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 mt-1">
                    <button
                      onClick={() => startEdit(m)}
                      className="text-sky-700 hover:text-sky-900"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteMemory(m.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryMirror;
