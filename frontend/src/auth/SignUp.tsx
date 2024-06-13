import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import Button from '../components/Button';
import style from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type FormData = {
  login: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

type Errors = {
  login: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  general?: string;
};

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    login: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Errors>({
    login: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({
      login: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: ''
    });

    if (!/^[a-zA-Z]{3,20}$/.test(formData.login)) {
      setErrors(prevState => ({
        ...prevState,
        login: 'Логин должен содержать только латинские символы и иметь длину от 3 до 20 символов'
      }));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Некорректный формат электронной почты'
      }));
      return;
    }

    if (!/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
      setErrors(prevState => ({
        ...prevState,
        phone: 'Некорректный формат телефона +7(XXX)-XXX-XX-XX'
      }));
      return;
    }

    const keywords = ['г.', 'ул.', 'д.'];
    if (!keywords.every(keyword => formData.address.includes(keyword))) {
      setErrors(prevState => ({
        ...prevState,
        address: 'Адрес должен содержать ключевые слова "г.", "ул." и "д."'
      }));
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(formData.password)) {
      setErrors(prevState => ({
        ...prevState,
        password: 'Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву, одну прописную букву, один специальный символ и одну цифру'
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Пароли не совпадают'
      }));
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post('https://dp-viganovsky.xn--80ahdri7a.site/api/signup', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'J8HioBlDmCc38Uo0qHGn_F2uUVmBq9F6'
        }
      });
      console.log(response.data.message);
      const { token } = response.data;
      login(token);
      await localStorage.setItem('token', token);
      navigate("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 422) {
        const axiosError = error as AxiosError;
        setErrors(prevState => ({
          ...prevState,
          ...(axiosError.response?.data as any)?.errors || {}
        }));
      } else {
        setErrors(prevState => ({
          ...prevState,
          general: 'Произошла ошибка. Попробуйте еще раз.'
        }));
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>Регистрация</h2>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className={style.inputField}
            value={formData.login}
            onChange={handleChange}
          />
          {errors.login && <span className={style.error}>{errors.login}</span>}
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
            type="tel"
            name="phone"
            placeholder="Телефон"
            className={style.inputField}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className={style.error}>{errors.phone}</span>}
          <input
            type="text"
            name="address"
            placeholder="Адрес"
            className={style.inputField}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className={style.error}>{errors.address}</span>}
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={style.inputField}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className={style.error}>{errors.password}</span>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            className={style.inputField}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className={style.error}>{errors.confirmPassword}</span>}
          <Button title="Зарегистрироваться" className="buttonGreen" type="submit" />
          {errors.general && <span className={style.error}>{errors.general}</span>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
