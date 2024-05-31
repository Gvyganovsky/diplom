<<<<<<< HEAD
// Admin.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.scss';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://dp-viganovsky.xn--80ahdri7a.site/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                } else {
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://dp-viganovsky.xn--80ahdri7a.site/api/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (!Array.isArray(data)) {
                        console.error('Products data is not an array');
                        return;
                    }

                    const productsWithImagesParsed = data.map(product => ({
                        ...product,
                        images: JSON.parse(product.image),
                        firstImage: JSON.parse(product.image)[0] // добавляем URL первого изображения
                    }));
                    setProducts(productsWithImagesParsed);
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUsers();
        fetchProducts();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            console.log(`Deleting user with id: ${id}`);
            
            const token = localStorage.getItem('token');
            const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/user/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                console.log(`User with id ${id} deleted successfully.`);
                // Удалить пользователя из состояния users
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                
                // Удалить информацию о пользователе из локального хранилища
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (id) => {
        navigate(`/admin/users/edit/${id}`);
    };

    const handleEditProduct = (id) => {
        navigate(`/admin/products/edit/${id}`);
    };

    return (
        <div className={styles.adminPanel}>
            <h1>Админ панель</h1>
            <section>
                <h2>Пользователи</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Адрес</th>
                            <th>Админ</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.login}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.admin === 1 ? 'Да' : 'Нет'}</td>
                                    <td>
                                        <>
                                            <button onClick={() => handleDeleteUser(user.id)} className={styles.deleteButton}>Удалить</button>
                                            <button onClick={() => handleEditUser(user.id)} className={styles.editButton}>Редактировать</button>
                                        </>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Пользователи не найдены</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Продукты</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Описание</th>
                            <th>Количество</th>
                            <th>Изображение</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.count}</td>
                                    <td><img src={`Product/${product.name}/${product.firstImage}`} alt={product.name} width={200} height={140} /></td> {/* отображаем первое изображение */}
                                    <td>
                                        <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteButton}>Удалить</button>
                                        <button onClick={() => handleEditProduct(product.id)} className={styles.editButton}>Редактировать</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Продукты не найдены</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
=======
import styles from './Admin.module.scss';

const Admin = () => {
    const handleClick = (url) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location.href = url;
                } else {
                    console.error('Ошибка запроса:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Ошибка запроса:', error);
            });
    };

    return (
        <div className={styles["admin-buttons"]}>
            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/product")} className={styles["auth-link"]}>
                Управление товарами
            </button>
            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/userWeb")} className={styles["auth-link"]}>
                Управление пользователями
            </button>

            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/basket")} className={styles["auth-link"]}>
                Управление корзиной
            </button>

            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/order")} className={styles["auth-link"]}>
                Управление заказами
            </button>
            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/OrderProduct")} className={styles["auth-link"]}>
                Управление заказами (товарами)
            </button>
>>>>>>> master
        </div>
    );
};

export default Admin;
