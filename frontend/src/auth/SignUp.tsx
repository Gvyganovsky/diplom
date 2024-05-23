import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import styles from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    login: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Очистка предыдущих ошибок перед новой валидацией
    setErrors({
      login: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: ''
    });

    // Валидация логина
    if (!/^[a-zA-Z]{3,20}$/.test(formData.login)) {
      setErrors(prevState => ({
        ...prevState,
        login: 'Логин должен содержать только латинские символы и иметь длину от 3 до 20 символов'
      }));
      return;
    }

    // Валидация электронной почты
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Некорректный формат электронной почты'
      }));
      return;
    }

    // Валидация телефона
    if (!/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
      setErrors(prevState => ({
        ...prevState,
        phone: 'Некорректный формат телефона'
      }));
      return;
    }

    // Валидация адреса
    const keywords = ['г.', 'ул.', 'д.'];
    if (!keywords.every(keyword => formData.address.includes(keyword))) {
      setErrors(prevState => ({
        ...prevState,
        address: 'Адрес должен содержать ключевые слова "г.", "ул." и "д."'
      }));
      return;
    }

    // Валидация пароля
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(formData.password)) {
      setErrors(prevState => ({
        ...prevState,
        password: 'Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву, одну прописную букву и один специальный символ'
      }));
      return;
    }

    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Пароли не совпадают'
      }));
      return;
    }

    try {
      // Исключаем confirmPassword из formData перед отправкой
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post('https://dp-viganovsky.xn--80ahdri7a.site/api/signup', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'J8HioBlDmCc38Uo0qHGn_F2uUVmBq9F6'
        }
      });
      console.log(response.data.message);
      const { user, token } = response.data;
      login(user, token);
      navigate("/profile");
      // Можно установить сообщение об успешной регистрации
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Произошла ошибка. Попробуйте еще раз.' });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Регистрация</h2>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className={styles.inputField}
            value={formData.login}
            onChange={handleChange}
          />
          {errors.login && <span className={styles.error}>{errors.login}</span>}
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
            type="tel"
            name="phone"
            placeholder="Телефон"
            className={styles.inputField}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          <input
            type="text"
            name="address"
            placeholder="Адрес"
            className={styles.inputField}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className={styles.error}>{errors.address}</span>}
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.inputField}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            className={styles.inputField}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          <Button title="Зарегистрироваться" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
