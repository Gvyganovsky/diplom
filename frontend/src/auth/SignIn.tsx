import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import styles from './Auth.module.scss';
import { useAuth } from '../contexts/AuthContext'; // Импортируем контекст авторизации
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth(); // Получаем метод login из контекста авторизации
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      email: '',
      password: ''
    });

    // Валидация email и пароля
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Некорректный формат электронной почты'
      }));
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(formData.password)) {
      setErrors(prevState => ({
        ...prevState,
        password: 'Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву, одну прописную букву и один специальный символ'
      }));
      return;
    }

    try {
      // Отправляем данные на сервер
      const response = await axios.post('https://dp-viganovsky.xn--80ahdri7a.site/api/signin', formData, {
        headers: {
          'X-CSRF-Token': 'J8HioBlDmCc38Uo0qHGn_F2uUVmBq9F6' 
        }
      });

      // Если вход прошел успешно, получаем данные пользователя и токен из ответа сервера
      const { user, token } = response.data;

      // Используем метод login из контекста для сохранения данных пользователя и токена
      login(user, token);
      navigate("/profile");

      // Можно выполнить дополнительные действия после успешного входа
    } catch (error) {
      if (error.response.status === 401) {
        setErrors(prevState => ({
          ...prevState,
          email: 'Неверная почта или пароль'
        }));
      } else {
        setErrors(prevState => ({
          ...prevState,
          email: 'Произошла ошибка. Попробуйте еще раз.'
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2>Вход</h2>
          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.inputField}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
          <Button title="Войти" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
