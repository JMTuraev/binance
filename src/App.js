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
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-5 pb-40">
      <h1 className="text-3xl font-bold text-center mb-5">Flashcard App</h1>

      {/* Bilaman va Bilmayman papkalari */}
      <div className="flex gap-6 mb-5">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-32 h-32 relative flex items-center justify-center shadow-xl"
          onClick={() => setCurrentIndex(0)}
        >
          <span className="text-2xl font-semibold">Bilaman</span>
          <span className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {learned.length}
          </span>
        </button>

        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg w-32 h-32 relative flex items-center justify-center shadow-xl"
          onClick={() => setCurrentIndex(0)}
        >
          <span className="text-2xl font-semibold">Bilmayman</span>
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {practicing.length}
          </span>
        </button>
      </div>

      {currentIndex < words.length && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-64 text-center mb-10">
          <h2 className="text-2xl font-semibold font-dancing-script">
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

      {/* Bilaman va Bilmayman tugmalari pastda */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-10">
        <div className="relative">
          <button
            onClick={handleDontKnow}
            className="bg-red-500 text-white px-10 py-10 rounded-full shadow-2xl hover:bg-red-600 transition"
          />
        </div>

        <div className="relative">
          <button
            onClick={handleKnow}
            className="bg-green-500 text-white px-10 py-10 rounded-full shadow-2xl hover:bg-green-600 transition"
          />
        </div>
      </div>

      <div className="mt-8 w-full">
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Yodlanmagan so'zlar:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {practicing.map((word, index) => (
              <li key={index}>
                {word.english} - {word.uzbek}
              </li>
            ))}
          </ul>
        </div>

        <div>
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
