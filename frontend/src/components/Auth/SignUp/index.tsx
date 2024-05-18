import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import styles from './SignUp.module.scss';
import { AuthContext } from '../../../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (authContext) {
      try {
        await authContext.register({
          login: formData.login,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password
        });
        // Очистка формы после успешной регистрации
        setFormData({
          login: '',
          email: '',
          phone: '',
          address: '',
          password: '',
          confirmPassword: ''
        });
        setError('');
        // Перенаправление пользователя в личный кабинет
        navigate('/profile');
      } catch (error) {
        console.error('Ошибка регистрации', error);
        setError('Произошла ошибка при регистрации');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <h2>Регистрация</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className={styles.inputField}
            value={formData.login}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            className={styles.inputField}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Адрес"
            className={styles.inputField}
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.inputField}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            className={styles.inputField}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button title="Зарегистрироваться" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
