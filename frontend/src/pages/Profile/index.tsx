import { useEffect } from 'react';
import style from './Profile.module.scss';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth/signin');
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        navigate('/auth/signin');
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.profile}>
                    <h2>Личный кабинет</h2>
                    <div className={style.profileInfo}>
                        <label className={style.label}>Имя:</label>
                        <p className={style.profileText}>{user ? user.login : ''}</p>
                    </div>
                    <div className={style.profileInfo}>
                        <label className={style.label}>Email:</label>
                        <p className={style.profileText}>{user ? user.email : ''}</p>
                    </div>
                    <div className={style.profileInfo}>
                        <label className={style.label}>Телефон:</label>
                        <p className={style.profileText}>{user ? user.phone : ''}</p>
                    </div>
                    <div className={style.profileInfo}>
                        <label className={style.label}>Адрес:</label>
                        <p className={style.profileText}>{user ? user.address : ''}</p>
                    </div>
                    <Button title="Редактировать профиль" className="buttonBlue" />
                    <Button title="Выйти" className="buttonRed" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default index;
