import React, { useState } from "react";
import "./index.css";

function App() {
  const [words, setWords] = useState([
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
  ]);
  
  const [practicing, setPracticing] = useState([]);
  const [learned, setLearned] = useState([]);
  const [showTranslation, setShowTranslation] = useState(null);

  const handleSwipeLeft = (index) => {
    setPracticing([...practicing, words[index]]);
    setWords(words.filter((_, i) => i !== index));
  };

  const handleSwipeRight = (index) => {
    setLearned([...learned, words[index]]);
    setWords(words.filter((_, i) => i !== index));
  };

  const handleDoubleClick = (index) => {
    setShowTranslation(index);
    setTimeout(() => setShowTranslation(null), 2000); // Tarjimani 2 soniyadan keyin yopadi
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Flashcard App</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {words.map((word, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-48 text-center cursor-pointer hover:shadow-xl transition"
            onDoubleClick={() => handleDoubleClick(index)}
            onDragEnd={(e) => {
              if (e.clientX < window.innerWidth / 2) {
                handleSwipeLeft(index);
              } else {
                handleSwipeRight(index);
              }
            }}
            draggable
          >
            <h2 className="text-xl font-semibold">{word.english}</h2>
            {showTranslation === index && (
              <p className="text-gray-500 mt-2">{word.uzbek}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div>
          <h3 className="text-lg font-semibold">Yodlanmagan so'zlar:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {practicing.map((word, index) => (
              <li key={index}>
                {word.english} - {word.uzbek}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-semibold">Yodlangan so'zlar:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {learned.map((word, index) => (
              <li key={index}>
                {word.english} - {word.uzbek}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
