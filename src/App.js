import React, { useState } from "react";
import MainPage from "./MainPage";
import AddWordFlashcardsPage from "./AddWordFlashcardsPage";
import HelpPage from "./HelpPage";
import TestsPage from "./TestsPage";
import FeedbackPage from "./FeedbackPage";
import BlogPage from "./BlogPage";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("main");

  const renderTabContent = () => {
    switch (activeTab) {
      case "main":
        return <MainPage />;
      case "addWordFlashcards":
        return <AddWordFlashcardsPage />;
      case "help":
        return <HelpPage />;
      case "tests":
        return <TestsPage />;
      case "blog":
        return <BlogPage />;
      case "feedback":
        return <FeedbackPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="app">
      <nav>
        <button onClick={() => setActiveTab("main")}>
          <i className="fas fa-home"></i> Главная
        </button>
        <button onClick={() => setActiveTab("addWordFlashcards")}>
          <i className="fas fa-plus-circle"></i> Карточки
        </button>
        <button onClick={() => setActiveTab("help")}>
          <i className="fas fa-question-circle"></i> Подсказки
        </button>
        <button onClick={() => setActiveTab("tests")}>
          <i className="fas fa-clipboard-check"></i> Тесты
        </button>
        <button onClick={() => setActiveTab("blog")}>
          <i className="fas fa-blog"></i> Статьи
        </button>
        <button onClick={() => setActiveTab("feedback")}>
          <i className="fas fa-comments"></i> Отзывы
        </button>
      </nav>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default App;