import Button from '../../Button';
import styles from './SignUp.module.scss';

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.registrationForm}>
          <h2>Регистрация</h2>
          <input type="text" placeholder="Логин" className={styles.inputField} />
          <input type="email" placeholder="Электронная почта" className={styles.inputField} />
          <input type="tel" placeholder="Телефон" className={styles.inputField} />
          <input type="text" placeholder="Адрес" className={styles.inputField} />
          <input type="password" placeholder="Пароль" className={styles.inputField} />
          <input type="password" placeholder="Повторите пароль" className={styles.inputField} />
          <Button title="Зарегистрироваться" className="buttonGreen" />
        </form>
      </div>
    </div>
  )
}

export default index
