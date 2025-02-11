import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import ReCAPTCHA from 'react-google-recaptcha';
import './App.css';

const profanityRegex = /(?<![а-яё])(?:(?:(?:у|[нз]а|(?:хитро|не)?вз?[ыьъ]|с[ьъ]|(?:и|ра)[зс]ъ?|(?:о[тб]|п[оа]д)[ьъ]?|(?:\S(?=[а-яё]))+?[оаеи-])-?)?(?:[её](?:б(?!о[рй]|рач)|п[уа](?:ц|тс))|и[пб][ае][тцд][ьъ]).*?|(?:(?:н[иеа]|(?:ра|и)[зс]|[зд]?[ао](?:т|дн[оа])?|с(?:м[еи])?|а[пб]ч|в[ъы]?|пр[еи])-?)?ху(?:[яйиеёю]|л+и(?!ган)).*?|бл(?:[эя]|еа?)(?:[дт][ьъ]?)?|\S*?(?:п(?:[иеё]зд|ид[аое]?р|ед(?:р(?!о)|[аое]р|ик)|охую)|бля(?:[дбц]|тс)|[ое]ху[яйиеё]|хуйн).*?|(?:о[тб]?|про|на|вы)?м(?:анд(?:[ауеыи](?:л(?:и[сзщ])?[ауеиы])?|ой|[ао]в.*?|юк(?:ов|[ауи])?|е[нт]ь|ища)|уд(?:[яаиое].+?|е?н(?:[ьюия]|ей))|[ао]л[ао]ф[ьъ](?:[яиюе]|[еёо]й))|елд[ауые].*?|ля[тд]ь|(?:[нз]а|по)х)(?![а-яё])/i;

const containsProfanity = (text) => {
  return profanityRegex.test(text);
};

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);

  // Загрузка отзывов
  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'feedback'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestimonials(data);
      } catch (err) {
        setError('Ошибка при загрузке отзывов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaVerified) {
      setError('Пожалуйста, подтвердите, что вы не робот');
      return;
    }

    // Проверяем, содержит ли сообщение мат
    if (containsProfanity(feedback.message)) {
      setError('Ваш отзыв содержит запрещённые слова.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        ...feedback,
        date: new Date().toISOString()
      });
      setSubmitted(true);
      setFeedback({ name: '', email: '', message: '' });
      captchaRef.current.reset();
      setCaptchaVerified(false);

      // Обновляем список отзывов
      const q = query(collection(db, 'feedback'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTestimonials(data);
    } catch (err) {
      setError('Ошибка при отправке отзыва');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaVerified(!!token);
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2 className="gradient-text5">💬 Ваше мнение важно!</h2>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label>Имя</label>
            <input 
              type="text" 
              required
              value={feedback.name}
              onChange={(e) => setFeedback({...feedback, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required
              value={feedback.email}
              onChange={(e) => setFeedback({...feedback, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Сообщение</label>
            <textarea
              rows="5"
              required
              value={feedback.message}
              onChange={(e) => setFeedback({...feedback, message: e.target.value})}
            />
          </div>

          <ReCAPTCHA
            sitekey="6Ld_Rs8qAAAAADiLJfoABz-IKDtLyRWN-yadTgmL"
            onChange={handleCaptchaChange}
            ref={captchaRef}
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Отправка...
              </>
            ) : (
              <>
                Отправить <i className="fas fa-paper-plane"></i>
              </>
            )}
          </button>
        </form>

        {submitted && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i> Спасибо! Ваш отзыв успешно отправлен!
          </div>
        )}
      </div>

      <div className="testimonials">
        <h3>💡 Что говорят пользователи</h3>
        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i> Загрузка отзывов...
          </div>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <div className="testimonial-card" key={item.id}>
                <div className="user-meta">
                  <div className="avatar">{item.name[0]}</div>
                  <div>
                    <h4>{item.name}</h4>
                    <small>{new Date(item.date).toLocaleDateString()}</small>
                  </div>
                </div>
                <p className="message">"{item.message}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
