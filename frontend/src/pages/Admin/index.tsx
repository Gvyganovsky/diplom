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
        </div>
    );
};

export default Admin;
