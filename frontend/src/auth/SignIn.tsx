import { useContext, useState } from 'react';
import Button from '../components/Button';
import styles from './Auth.module.scss';
import { AuthContext } from '../contexts/AuthContext';

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
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
      email: '',
      password: ''
    });

    // Валидация электронной почты
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Некорректный формат электронной почты'
      }));
    }

    // Если есть ошибки валидации, не отправлять данные
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        return;
      }
    }

    // Отправка данных для авторизации
    try {
      await signIn(formData.email, formData.password);
      // Можно добавить перенаправление или другие действия после успешной авторизации
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      // Можно обработать ошибку авторизации здесь
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Авторизация</h2>
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
          <Button title="Авторизация" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
