import React, { useState, useEffect } from 'react';
import { subjects } from './data';
import './App.css';

const AddWordFlashcardsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('literature');
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [words, setWords] = useState([]);
  const [showDefinitions, setShowDefinitions] = useState({});
  const [notification, setNotification] = useState(null);

  // Загрузка слов для выбранного предмета
  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem(`words_${selectedSubject}`)) || [];
    setWords(storedWords);
  }, [selectedSubject]);

  // Уведомления
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  // Добавление нового слова
  const addWordToStorage = () => {
    if (!word.trim() || !definition.trim()) {
      showNotification('Введите слово и его определение!');
      return;
    }

    const newWord = { word, definition };
    const newWords = [...words, newWord];
    
    setWords(newWords);
    localStorage.setItem(`words_${selectedSubject}`, JSON.stringify(newWords));
    setWord('');
    setDefinition('');
    showNotification('Слово добавлено!');
  };

  // Удаление карточки
  const deleteCard = (index) => {
    const newWords = words.filter((_, i) => i !== index);
    setWords(newWords);
    localStorage.setItem(`words_${selectedSubject}`, JSON.stringify(newWords));
    showNotification('Карточка удалена');
  };

  // Переключение отображения определения
  const toggleDefinition = (index) => {
    setShowDefinitions(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="add-word-flashcards-page">
      {/* Выбор категории */}
      <div className="category-selector">
        {Object.keys(subjects).map(key => (
          <button
            key={key}
            className={selectedSubject === key ? 'active' : ''}
            onClick={() => setSelectedSubject(key)}
            style={{ 
              background: subjects[key].color,
              border: `2px solid ${subjects[key].color}`
            }}
          >
            <i className={subjects[key].icon}></i>
            {subjects[key].name}
          </button>
        ))}
      </div>

      {/* Уведомления */}
      {notification && (
        <div className="notification">
          <i className="fas fa-bell"></i>{notification}
        </div>
      )}

      {/* Форма добавления */}
      <div className="input-group">
        <h2><i className="fas fa-plus"></i> Добавить новое слово</h2>
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
          rows="4"
        />
        <button className="btn-primary" onClick={addWordToStorage}>
          <i className="fas fa-save"></i> Добавить слово
        </button>
      </div>

      {/* Список карточек */}
      <div className="flashcards-section">
        <h2><i className="fas fa-clone"></i> Карточки ({subjects[selectedSubject].name})</h2>
        {words.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox fa-3x"></i>
            <p>Нет слов для повторения</p>
          </div>
        ) : (
          <div className="flashcards-container">
            {words.map((item, index) => (
              <div className="flashcard" key={index}>
                <h3 style={{ color: subjects[selectedSubject].color }}>
                  <i className="fas fa-book"></i> {item.word}
                </h3>
                {showDefinitions[index] && (
                  <p className="definition">{item.definition}</p>
                )}

                <div className="card-actions">
                  <button 
                    className="toggle-definition btn-primary"
                    onClick={() => toggleDefinition(index)}
                    style={{ background: subjects[selectedSubject].color }}
                  >
                    {showDefinitions[index] ? 'Скрыть' : 'Показать'}
                  </button>
                  <button 
                    className="delete-button btn-danger" 
                    onClick={() => deleteCard(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddWordFlashcardsPage;