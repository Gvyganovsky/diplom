import Button from '../../components/Button';
import styles from './Profile.module.scss';

const Profile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <h2>Личный кабинет</h2>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Имя:</label>
                        <p className={styles.profileText}>Иван Иванов</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Email:</label>
                        <p className={styles.profileText}>ivan@example.com</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Телефон:</label>
                        <p className={styles.profileText}>+7 (123) 456-7890</p>
                    </div>
                    <Button title="Редактировать профиль" className="buttonBlue" />
                </div>
            </div>
        </div>
    )
}

export default Profile
