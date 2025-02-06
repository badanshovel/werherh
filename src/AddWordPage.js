import React, { useState } from 'react';

const AddWordPage = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const addWordToStorage = () => {
    const storedWords = JSON.parse(localStorage.getItem('words')) || [];
    storedWords.push({ word, definition });
    localStorage.setItem('words', JSON.stringify(storedWords));
    setWord('');
    setDefinition('');
  };

  return (
    <div className="add-word-page">
      <h2>Добавить новое слово</h2>
      <input
        type="text"
        placeholder="Введите слово"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <textarea
        placeholder="Введите определение"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
      />
      <button onClick={addWordToStorage}>Добавить слово</button>
    </div>
  );
};

export default AddWordPage;
