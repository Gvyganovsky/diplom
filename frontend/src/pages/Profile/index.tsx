import { useEffect, useState } from 'react';
import style from './Profile.module.scss';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { getUserData, logout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData();
                setUserData(userData.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
                logout();
                navigate('/auth/signin');
            }
        };

        fetchUserData();
    }, [getUserData, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/auth/signin');
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.profile}>
                    <h2>Личный кабинет</h2>
                    {userData && (
                        <>
                            <div className={style.profileInfo}>
                                <label className={style.label}>Имя:</label>
                                <p className={style.profileText}>{userData.login}</p>
                            </div>
                            <div className={style.profileInfo}>
                                <label className={style.label}>Email:</label>
                                <p className={style.profileText}>{userData.email}</p>
                            </div>
                            <div className={style.profileInfo}>
                                <label className={style.label}>Телефон:</label>
                                <p className={style.profileText}>{userData.phone}</p>
                            </div>
                            <div className={style.profileInfo}>
                                <label className={style.label}>Адрес:</label>
                                <p className={style.profileText}>{userData.address}</p>
                            </div>
                        </>
                    )}
                    <Button title="Редактировать профиль" className="buttonBlue" />
                    <Button title="Выйти" className="buttonRed" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
