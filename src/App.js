import React, { useState, useEffect } from "react";
import MainPage from './MainPage';
import AddWordFlashcardsPage from './AddWordFlashcardsPage';
import HelpPage from './HelpPage';
import TestsPage from './TestsPage'; // Новый компонент для вкладки "Тесты"
import FeedbackPage from './FeedbackPage';
import BlogPage from './BlogPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [learnedWords, setLearnedWords] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const savedWords = localStorage.getItem("learnedWords");
    if (savedWords) {
      setLearnedWords(JSON.parse(savedWords));
    }
  }, []);

  useEffect(() => {
    if (learnedWords.length >= 5 && !localStorage.getItem("popupShown")) {
      setShowPopup(true);
    }
  }, [learnedWords]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return <MainPage />;
      case 'addWordFlashcards':
        return <AddWordFlashcardsPage />;
      case 'help':
        return <HelpPage />;
      case 'tests':
        return <TestsPage words={learnedWords} />; // Передаем изученные слова в тесты
     case 'blog':
        return <BlogPage />;
     case 'feedback':
        return <FeedbackPage />;
      default:
        return <MainPage />;
    }
  };

  const handlePopupClose = (answer) => {
    setShowPopup(false);
    if (answer) {
      setActiveTab('tests');
      localStorage.setItem("popupShown", "true");
    }
  };

  return ( 
    <div className="app">
      <nav>
       <button onClick={() => setActiveTab('main')}>
         <i className="fas fa-home"></i> Главная
       </button>
       <button onClick={() => setActiveTab('addWordFlashcards')}>
         <i className="fas fa-plus-circle"></i> Карточки
       </button>
       <button onClick={() => setActiveTab('help')}>
         <i className="fas fa-question-circle"></i> Подсказки
       </button>
       <button onClick={() => setActiveTab('tests')}>
         <i className="fas fa-clipboard-check"></i> Тесты
       </button>
       <button onClick={() => setActiveTab('blog')}>
         <i className="fas fa-blog"></i> Статьи
       </button>
       <button onClick={() => setActiveTab('feedback')}>
         <i className="fas fa-comments"></i> Отзывы
       </button>
      </nav>
      <div className="tab-content">
        {renderTabContent()}
      </div>
      
      {/* Всплывающее окно */}
      {showPopup && (
        <div className="popup">
          <p>Желаете повторить изученные слова?</p>
          <button onClick={() => handlePopupClose(true)}>Да</button>
          <button onClick={() => handlePopupClose(false)}>Позже</button>
        </div>
      )}
    </div>
  );
};

export default App;
