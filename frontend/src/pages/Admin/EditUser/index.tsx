import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditUser.module.scss'; // Импорт файла стилей

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        login: '',
        email: '',
        phone: '',
        address: '',
        admin: 0,
        password: '' // Добавлено поле для пароля
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                }
            } catch (error) {
                setError('Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
        // Создаем копию пользователя, чтобы не изменять оригинальный объект
        const updatedUser = { ...user };

        // Проверяем, изменился ли пароль
        if (!updatedUser.password) {
            // Если пароль не изменился, удаляем поле password из данных для отправки
            delete updatedUser.password;
        }

        // Проверяем, если есть поля, которые не были изменены, но нужны для запроса
        const requiredFields = ['login', 'email', 'phone', 'address', 'admin']; // Список обязательных полей
        requiredFields.forEach(field => {
            if (!(field in updatedUser)) {
                // Если поле отсутствует в обновленных данных, добавляем его из текущего состояния пользователя
                updatedUser[field] = user[field];
            }
        });

        const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/user/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser) // Отправляем обновленного пользователя без newPassword
        });

        if (response.ok) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
        } else {
            const errorData = await response.json();
            setError(errorData.message);
        }
    } catch (error) {
        setError('Error saving user');
    }
};


    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (success) return <div className={styles.success}>User successfully updated! Redirecting...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <form className={styles.form}>
                    <h1>Редактировать пользователя</h1>
                    <div>
                        <label>Логин:</label>
                        <input
                            type="text"
                            name="login"
                            value={user.login}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div>
                        <label>Телефон:</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div>
                        <label>Адрес:</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div>
                        <label>Пароль:</label>
                        <input
                            type="password" // Поле для пароля
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.checkboxField}>
                        <input
                            type="checkbox"
                            name="admin"
                            checked={user.admin === 1}
                            onChange={(e) => handleInputChange({ target: { name: 'admin', value: e.target.checked ? 1 : 0 } })}
                        />
                        <label>Админ:</label>
                    </div>
                    <button type="button" onClick={handleSave} className={styles.button}>Сохранить</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
