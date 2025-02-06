import React, { useState, useEffect } from 'react';

const FlashcardsPage = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem('words')) || [];
    setWords(storedWords);
  }, []);

  const showNextCard = () => {
    setShowDefinition(false);
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const toggleDefinition = () => {
    setShowDefinition((prev) => !prev);
  };

  if (words.length === 0) return <p>Нет слов для повторения.</p>;

  const word = words[currentWordIndex];

  return (
    <div className="flashcards-page">
      <div className="flashcard">
        <h3>{word.word}</h3>
        {showDefinition && <p>{word.definition}</p>}
        <button onClick={toggleDefinition}>
          {showDefinition ? 'Скрыть определение' : 'Показать определение'}
        </button>
      </div>
      <button onClick={showNextCard}>Следующая карточка</button>
    </div>
  );
};

export default FlashcardsPage;
