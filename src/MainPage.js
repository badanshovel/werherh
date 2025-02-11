import React, { useState, useEffect } from "react";
import { subjects } from "./data";
import "./App.css";

function MainPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [randomWord, setRandomWord] = useState(null);
  const [learnedWords, setLearnedWords] = useState([]);
  const [isWordsLoaded, setIsWordsLoaded] = useState(false);

  useEffect(() => {
    if (selectedSubject) {
      const savedWords = localStorage.getItem(`learnedWords_${selectedSubject}`);
      setLearnedWords(savedWords ? JSON.parse(savedWords) : []);
      setIsWordsLoaded(true);
      setRandomWord(null);
    }
  }, [selectedSubject]);

  const getRandomWord = () => {
    const availableWords = subjects[selectedSubject].words.filter(
      (w) => !learnedWords.some((lw) => lw.word === w.word)
    );
    if (availableWords.length === 0) {
      setRandomWord(null);
      return;
    }
    setRandomWord(availableWords[Math.floor(Math.random() * availableWords.length)]);
  };

  const addToLearned = () => {
    if (randomWord && !learnedWords.some((w) => w.word === randomWord.word)) {
      const newLearnedWords = [...learnedWords, randomWord];
      setLearnedWords(newLearnedWords);
      localStorage.setItem(`learnedWords_${selectedSubject}`, JSON.stringify(newLearnedWords));
      setRandomWord(null);
    }
  };

  const removeLearnedWord = (wordToRemove) => {
    const updatedWords = learnedWords.filter((w) => w.word !== wordToRemove);
    setLearnedWords(updatedWords);
    localStorage.setItem(`learnedWords_${selectedSubject}`, JSON.stringify(updatedWords));
  };

  return (
    <div className="container main-page">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="gradient-text">Изучай</span> термины для ЕГЭ
        </h1>
      </div>

      <div className="subjects-grid">
        {Object.keys(subjects).map((key) => (
          <div
            key={key}
            className={`subject-card ${selectedSubject === key ? "active" : ""}`}
            onClick={() => setSelectedSubject(key)}
            style={{ borderColor: subjects[key].color }}
          >
            <i className={subjects[key].icon}></i>
            <h3>{subjects[key].name}</h3>
            <small>{subjects[key].words.length} слов</small>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <>
          <div className="random-word-section">
            <button
              className="btn random-word-btn"
              onClick={getRandomWord}
              disabled={learnedWords.length === subjects[selectedSubject].words.length || !isWordsLoaded}
            >
              <i className="fas fa-dice"></i> <span className="gradient-text1">Новое слово</span>
            </button>

            {randomWord && (
              <div className="word-card glow-card">
                <div className="card-header">
                  <i className="fas fa-book-open"></i>
                  <h2>{randomWord.word}</h2>
                </div>
                <p className="definition">{randomWord.definition}</p>
                <button
                  className="btn add-btn"
                  onClick={addToLearned}
                  disabled={learnedWords.some((w) => w.word === randomWord.word)}
                >
                  <i className="fas fa-star"></i> Добавить в изученные 
                </button>
              </div>
            )}
          </div>

          <div className="learned-words-section">
            <h2 className="section-title">
              <i className="fas fa-check-circle"></i> Изученные слова
              <span className="badge">{learnedWords.length}</span>
            </h2>

            {learnedWords.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-inbox fa-3x"></i>
                <p>Здесь появятся ваши изученные слова</p>
              </div>
            ) : (
              <div className="word-grid">
                {learnedWords.map((w, index) => (
                  <div key={index} className="word-card mini-card">
                    <div className="card-content">
                      <span className="word">{w.word}</span>
                      <button
                        className="remove-btn"
                        onClick={() => removeLearnedWord(w.word)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="card-footer">
                      <small>{w.definition}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;