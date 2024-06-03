import style from './Admin.module.scss';

const Admin = () => {
    const handleClick = (url: string) => {
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
        <div className={style["admin-buttons"]}>
            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/product")} className={style["auth-link"]}>
                Управление товарами
            </button>
            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/user-web")} className={style["auth-link"]}>
                Управление пользователями
            </button>

            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/basket")} className={style["auth-link"]}>
                Управление корзиной
            </button>

            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/order")} className={style["auth-link"]}>
                Управление заказами
            </button>
            <button onClick={() => handleClick("https://dp-viganovsky.xn--80ahdri7a.site/backend/api/order-product")} className={style["auth-link"]}>
                Управление заказами (товарами)
            </button>
        </div>
    );
};

export default Admin;
