import Button from '../../Button'
import styles from './SignIn.module.scss'

const index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <form className={styles.registrationForm}>
                    <h2>Авторизация</h2>
                    <input type="email" placeholder="Электронная почта" className={styles.inputField} />
                    <input type="password" placeholder="Пароль" className={styles.inputField} />
                    <Button title="Авторизация" className="buttonGreen" />
                </form>
            </div>
        </div>
    )
}

export default index
