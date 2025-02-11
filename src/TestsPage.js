import React, { useState, useEffect } from "react";
import { subjects } from "./data";
import "./TestsPage.css";

function TestsPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [learnedWords, setLearnedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  // Загрузка изученных слов для выбранного предмета
  useEffect(() => {
    if (selectedSubject) {
      const savedWords = localStorage.getItem(`learnedWords_${selectedSubject}`);
      setLearnedWords(savedWords ? JSON.parse(savedWords) : []);
    }
  }, [selectedSubject]);

  // Обработка выбора ответа
  const handleAnswerClick = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    setIsAnswered(true);
  };

  // Переход к следующему вопросу
  const handleNextWord = () => {
    if (currentWordIndex < learnedWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsAnswered(false);
      setUserAnswer(null);
    } else {
      setTestCompleted(true); // Тест завершён
    }
  };

  // Завершение теста досрочно
  const handleFinishTest = () => {
    setTestCompleted(true);
  };

  // Сброс теста и возврат к выбору предмета
  const resetTest = () => {
    setSelectedSubject(null);
    setCurrentWordIndex(0);
    setIsAnswered(false);
    setUserAnswer(null);
    setTestCompleted(false);
  };

  // Генерация вариантов ответов
  const generateAnswers = (word) => {
    const wrongAnswers = subjects[selectedSubject].words.filter(
      (w) => w.word !== word.word
    );
    const randomWrongAnswers = wrongAnswers
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const allAnswers = [word, ...randomWrongAnswers];
    return allAnswers.sort(() => Math.random() - 0.5);
  };

  const currentWord = learnedWords[currentWordIndex];
  const answerOptions = currentWord ? generateAnswers(currentWord) : [];

  return (
    <div className="container test-page">
      {!selectedSubject || testCompleted ? (
        <div className="subjects-grid">
          <h2 className="section-title">Выберите предмет для тестирования</h2>
          <div className="subject-cards-container">
            {Object.keys(subjects).map((key) => (
              <div
                key={key}
                className="subject-card"
                onClick={() => {
                  setSelectedSubject(key);
                  setTestCompleted(false);
                }}
                style={{ borderColor: subjects[key].color }}
              >
                <div className="subject-card-content">
                  <i className={`${subjects[key].icon} subject-icon`}></i>
                  <h3 className="subject-title">{subjects[key].name}</h3>
                  <div className="words-counter">
                    {JSON.parse(localStorage.getItem(`learnedWords_${key}`))?.length || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="test-header">
            <h1 className="gradient-text">
              <i className="fas fa-brain"></i> <span className="gradient-text4">Тест: {subjects[selectedSubject].name}</span>
            </h1>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentWordIndex + 1) / learnedWords.length) * 100}%`,
                  backgroundColor: subjects[selectedSubject].color,
                }}
              ></div>
              <span className="progress-text">
                Вопрос {currentWordIndex + 1} из {learnedWords.length}
              </span>
            </div>
            <button className="btn-danger finish-test-btn" onClick={handleFinishTest}>
              <i className="fas fa-stop-circle"></i> Завершить тест
            </button>
          </div>

          {learnedWords.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-book-open fa-3x"></i>
              <p>Сначала добавьте слова в изученные!</p>
              <small>Практикуйтесь, повторяя определения слов</small>
            </div>
          ) : (
            <div className="test-card glow-card">
              <div className="question-header">
                <i className="fas fa-question-circle"></i>
                <h2>
                  Что означает слово: <span className="highlight-word">{currentWord.word}</span>?
                </h2>
              </div>

              <div className="answers-grid">
                {answerOptions.map((answer, index) => (
                  <button
                    key={index}
                    className={`answer-btn ${isAnswered
                      ? answer.word === currentWord.word
                        ? "correct pulse"
                        : userAnswer?.word === answer.word
                        ? "incorrect shake"
                        : "disabled"
                      : ""}`}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={isAnswered}
                  >
                    <span className="option-number">{index + 1}</span>
                    {answer.definition}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="feedback-box">
                  <h3 className={userAnswer?.word === currentWord.word ? "correct" : "incorrect"}>
                    {userAnswer?.word === currentWord.word
                      ? "🎉 Отлично! Ты молодец!"
                      : "😞 Почти получилось!"}
                  </h3>
                  <button
                    className="btn-primary next-btn"
                    onClick={handleNextWord}
                  >
                    {currentWordIndex < learnedWords.length - 1
                      ? "Следующий вопрос ➔"
                      : "Завершить тест 🏁"}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TestsPage;