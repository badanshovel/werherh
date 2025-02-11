import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import ReCAPTCHA from 'react-google-recaptcha';
import './App.css';

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