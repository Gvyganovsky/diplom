import { useContext } from 'react';
import { AuthContext } from '../../contexts/delete';
import Button from '../../components/Button';
import styles from './Profile.module.scss';

const Profile = () => {
    const { user } = useContext(AuthContext) || {};

    if (!user) {
      return <div>Пожалуйста, войдите в систему</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <h2>Личный кабинет</h2>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Имя:</label>
                        <p className={styles.profileText}>{user.login}</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Email:</label>
                        <p className={styles.profileText}>{user.email}</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Телефон:</label>
                        <p className={styles.profileText}>{user.phone}</p>
                    </div>
                    <Button title="Редактировать профиль" className="buttonBlue" />
                </div>
            </div>
        </div>
    );
}

export default Profile;
