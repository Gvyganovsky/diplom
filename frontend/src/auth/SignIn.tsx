import Button from '../components/Button';
import styles from './Auth.module.scss';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Очистка предыдущей ошибки перед новой валидацией
    setError('');

    // Валидация электронной почты и пароля
    if (!formData.email || !formData.password) {
      setError('Неверная почта или пароль');
      return;
    }

    signIn(formData);
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
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.inputField}
            value={formData.password}
            onChange={handleChange}
          />
          {error && <span className={styles.error}>{error}</span>}
          <Button title="Войти" className="buttonGreen" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
