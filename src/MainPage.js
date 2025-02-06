import React, { useState, useEffect } from "react";
import "./App.css";

const words = [
  { word: "Абстракция", definition: "Отвлечение от конкретных свойств предметов, обобщение." },
  { word: "Авангард", definition: "Передовая часть общества или искусства." },
  { word: "Адаптация", definition: "Приспособление к новым условиям." },
  { word: "Альтернатива", definition: "Выбор из нескольких возможных вариантов." },
  { word: "Амбиции", definition: "Стремление к достижению высоких целей." },
  { word: "Аналогия", definition: "Сходство между разными явлениями." },
  { word: "Аспект", definition: "Определённая сторона явления или вопроса." },
  { word: "Аргумент", definition: "Доказательство, приводимое в поддержку мнения." },
  { word: "Аристократия", definition: "Высший слой общества, элита." },
  { word: "Аутентичный", definition: "Подлинный, настоящий." },
  { word: "Баланс", definition: "Равновесие между различными частями." },
  { word: "Барьер", definition: "Препятствие, мешающее достижению цели." },
  { word: "Благотворительность", definition: "Помощь нуждающимся." },
  { word: "Биосфера", definition: "Область жизни на Земле." },
  { word: "Бюрократия", definition: "Система управления с жёсткими правилами." },
  { word: "Виртуальный", definition: "Существующий в цифровом мире." },
  { word: "Гармония", definition: "Согласованность и баланс элементов." },
  { word: "Гипотеза", definition: "Предположение, требующее проверки." },
  { word: "Глобализация", definition: "Процесс объединения мира в единую систему." },
  { word: "Гуманизм", definition: "Философия, ставящая человека в центр внимания." },
  { word: "Дедукция", definition: "Метод логического мышления от общего к частному." },
  { word: "Динамика", definition: "Изменение состояния со временем." },
  { word: "Дифференциация", definition: "Разделение на части по различным критериям." },
  { word: "Доктрина", definition: "Система взглядов и принципов." },
  { word: "Дуализм", definition: "Противоположность двух начал." },
  { word: "Идентичность", definition: "Осознание своей уникальности." },
  { word: "Идеология", definition: "Совокупность идей и взглядов." },
  { word: "Импровизация", definition: "Создание чего-либо без подготовки." },
  { word: "Индивидуальность", definition: "Неповторимые черты личности." },
  { word: "Инновация", definition: "Нововведение в сфере технологий или идей." },
  { word: "Интеллект", definition: "Способность к мышлению и анализу." },
  { word: "Интуиция", definition: "Понимание без логического обоснования." },
  { word: "Категория", definition: "Группа объектов с общими признаками." },
  { word: "Коммуникация", definition: "Процесс обмена информацией." },
  { word: "Компетенция", definition: "Круг знаний и умений в определённой области." },
  { word: "Консенсус", definition: "Общее согласие по вопросу." },
  { word: "Консерватизм", definition: "Приверженность традициям и старым порядкам." },
  { word: "Креативность", definition: "Способность к созданию нового." },
  { word: "Либерализм", definition: "Идеология свободы и равноправия." },
  { word: "Логика", definition: "Наука о правильном мышлении." },
  { word: "Манипуляция", definition: "Скрытое управление поведением других." },
  { word: "Метафора", definition: "Перенос значения одного слова на другое." },
  { word: "Модернизация", definition: "Обновление и совершенствование чего-либо." },
  { word: "Монополия", definition: "Исключительное право на что-либо." },
  { word: "Нейтралитет", definition: "Отсутствие участия в конфликте." },
  { word: "Оптимизация", definition: "Улучшение системы для повышения эффективности." },
  { word: "Парадигма", definition: "Совокупность идей и понятий." },
  { word: "Патриотизм", definition: "Любовь к своей родине." },
  { word: "Перспектива", definition: "Будущее развитие событий." },
  { word: "Плюрализм", definition: "Многообразие мнений и точек зрения." },
  { word: "Прагматизм", definition: "Подход, основанный на практической выгоде." },
  { word: "Принцип", definition: "Основное правило или положение." },
  { word: "Рефлексия", definition: "Анализ своих мыслей и действий." },
  { word: "Риторика", definition: "Искусство убеждать словами." },
  { word: "Сатисфакция", definition: "Удовлетворение от достигнутого." },
  { word: "Синергия", definition: "Совместное действие, дающее лучший результат." },
  { word: "Спекуляция", definition: "Действия, направленные на быструю выгоду." },
  { word: "Тенденция", definition: "Общая направленность развития." },
  { word: "Толерантность", definition: "Уважение к чужим взглядам и культуре." },
  { word: "Унификация", definition: "Приведение к единому стандарту." },
  { word: "Философия", definition: "Учение о бытии и сознании." },
  { word: "Харизма", definition: "Привлекательность личности, вызывающая доверие." },
  { word: "Экология", definition: "Наука о взаимодействии живых организмов и среды." },
  { word: "Эффективность", definition: "Соотношение результата и затраченных ресурсов." },
  { word: "Юрисдикция", definition: "Право на ведение дел в определённой области." },
  { word: "Явление", definition: "Факт или событие, имеющее значение." },
  { word: "Абонент", definition: "Человек, пользующийся услугами связи." },
  { word: "Акцент", definition: "Особенность произношения, выделяющая звуки." },
  { word: "Активизм", definition: "Приверженность активным действиям в социальной или политической сфере." },
  { word: "Анализ", definition: "Разбор и изучение элементов чего-либо." },
  { word: "Англофония", definition: "Говорящие на английском языке страны." },
  { word: "Арбитраж", definition: "Разрешение споров с помощью независимых судей." },
  { word: "Архаизм", definition: "Устаревшее слово или выражение." },
  { word: "Атмосфера", definition: "Воздушная оболочка планеты." },
  { word: "Аудитория", definition: "Группа людей, слушающих или наблюдающих за чем-либо." },
  { word: "Безопасность", definition: "Защищенность от угроз и рисков." },
  { word: "Благосостояние", definition: "Материальное и социальное благополучие." },
  { word: "Биография", definition: "Жизненный путь человека." },
  { word: "Бюджет", definition: "План финансовых расходов и доходов." },
  { word: "Генетика", definition: "Наука о наследственности и изменчивости организмов." },
  { word: "География", definition: "Наука о Земле, её поверхностных формах и населении." },
  { word: "Глобус", definition: "Модель Земли в виде шара." },
  { word: "Государство", definition: "Организация, осуществляющая власть на определённой территории." },
  { word: "Демократия", definition: "Форма правления, при которой народ управляет через выборы." },
  { word: "Дизайн", definition: "Процесс создания визуального оформления объектов." },
  { word: "Документ", definition: "Запись, подтверждающая факты или события." },
  { word: "Долг", definition: "Обязанность выполнить нечто." },
  { word: "Единство", definition: "Согласие и гармония между частями целого." },
];


function App() {
  const [randomWord, setRandomWord] = useState(null);
  const [learnedWords, setLearnedWords] = useState([]);
  const [isWordsLoaded, setIsWordsLoaded] = useState(false); // Добавляем флаг загрузки

  useEffect(() => {
    const savedWords = localStorage.getItem("learnedWords");
    if (savedWords) {
      setLearnedWords(JSON.parse(savedWords));
    }
    setIsWordsLoaded(true); // Отмечаем, что данные загружены
  }, []);

  useEffect(() => {
    if (learnedWords.length > 0) {
      localStorage.setItem("learnedWords", JSON.stringify(learnedWords));
    }
  }, [learnedWords]);

  const getRandomWord = () => {
    const availableWords = words.filter(w => !learnedWords.some(lw => lw.word === w.word));
    if (availableWords.length === 0) {
      setRandomWord(null);
      return;
    }
    setRandomWord(availableWords[Math.floor(Math.random() * availableWords.length)]);
  };

  const addToLearned = () => {
    if (randomWord && !learnedWords.some(w => w.word === randomWord.word)) {
      setLearnedWords([...learnedWords, randomWord]);
      setRandomWord(null);
    }
  };

  const removeLearnedWord = (wordToRemove) => {
    const updatedWords = learnedWords.filter(w => w.word !== wordToRemove);
    setLearnedWords(updatedWords);
    
    // Обновляем localStorage, чтобы изменения синхронизировались
    localStorage.setItem("learnedWords", JSON.stringify(updatedWords));
  };

  return (
    <div className="container main-page">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="gradient-text">Расширьте</span> свой словарный запас
        </h1>
        <button 
          className="btn random-word-btn"
          onClick={getRandomWord} 
          disabled={learnedWords.length === words.length || !isWordsLoaded}
        >
          <i className="fas fa-dice"></i> Новое слово
        </button>
      </div>

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
            disabled={learnedWords.some(w => w.word === randomWord.word)}
          >
            <i className="fas fa-star"></i> Добавить в изученные
          </button>
        </div>
      )}

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
    </div>
  );
}


export default App;