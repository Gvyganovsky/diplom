import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import style from './Auth.module.scss';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      email: '',
      password: ''
    });

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
      const response = await axios.post('https://dp-viganovsky.xn--80ahdri7a.site/api/signin', formData, {
        headers: {
          'X-CSRF-Token': 'J8HioBlDmCc38Uo0qHGn_F2uUVmBq9F6'
        }
      });

      const { user, token } = response.data;
      login(user, token);
      localStorage.setItem('token', token);
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
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
      } else {
        setErrors(prevState => ({
          ...prevState,
          email: 'Произошла ошибка. Попробуйте еще раз.'
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form} onSubmit={handleSubmit} noValidate>
          <h2>Вход</h2>
          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            className={style.inputField}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={style.inputField}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className={style.error}>{errors.password}</span>}
          <Button title="Войти" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
