import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import styles from './SignIn.module.scss';
import { AuthContext } from '../../../contexts/delete';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (authContext) {
      try {
        await authContext.login(formData.email, formData.password);
        setError('');
        navigate('/profile');
      } catch (error) {
        console.error('Ошибка авторизации', error);
        setError('Неверные учетные данные');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <h2>Авторизация</h2>
          {error && <p className={styles.error}>{error}</p>}
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
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.inputField}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button title="Авторизация" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
