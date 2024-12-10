import React, { useState } from "react";
import "./index.css";

function App() {
  const [words, setWords] = useState([
    { english: "book", uzbek: "kitob" },
    { english: "home", uzbek: "uy" },
    { english: "sleep", uzbek: "uxlamoq" },
  ]);
  const [practicing, setPracticing] = useState([]);
  const [learned, setLearned] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleKnow = () => {
    setLearned([...learned, words[currentIndex]]);
    goToNextWord();
  };

  const handleDontKnow = () => {
    setPracticing([...practicing, words[currentIndex]]);
    goToNextWord();
  };

  const goToNextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    } else {
      alert("Barcha kartalar tugadi!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-5 pb-20">
      <h1 className="text-3xl font-bold text-center mb-5">Flashcard App</h1>
      {currentIndex < words.length && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-64 text-center">
          <h2 className="text-2xl font-semibold">
            {words[currentIndex].english}
          </h2>
          {showTranslation && (
            <p className="text-gray-500 mt-3">{words[currentIndex].uzbek}</p>
          )}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Tarjimani ko'rsat
          </button>
        </div>
      )}
      {/* Tugmalar paneli */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={handleDontKnow}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Bilmayman
        </button>
        <button
          onClick={handleKnow}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Bilaman
        </button>
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
