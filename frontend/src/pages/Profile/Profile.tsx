// В компоненте Profile:

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import styles from './Profile.module.scss';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <h2>Личный кабинет</h2>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Имя:</label>
                        <p className={styles.profileText}>{user ? user.login : ''}</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Email:</label>
                        <p className={styles.profileText}>{user ? user.email : ''}</p>
                    </div>
                    <div className={styles.profileInfo}>
                        <label className={styles.label}>Телефон:</label>
                        <p className={styles.profileText}>{user ? user.phone : ''}</p>
                    </div>
                    <Button title="Редактировать профиль" className="buttonBlue" />
                </div>
            </div>
        </div>
    );
}

export default Profile;
