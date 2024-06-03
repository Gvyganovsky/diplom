import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Orders.module.scss';
import Button from '../../components/Button';
import { MoonLoader } from "react-spinners";

interface Product {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
}

interface Order {
  orderId: string;
  createdAt: string;
  products: Product[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Токен пользователя отсутствует в локальном хранилище");
          return;
        }

        const response = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/orders`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Ошибка при получении данных о заказах");
        }
      } catch (error) {
        console.error("Ошибка при получении данных о заказах:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Токен пользователя отсутствует в локальном хранилище");
        return;
      }

      const response = await axios.delete(`https://dp-viganovsky.xn--80ahdri7a.site/api/order/delete/${orderId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.data.success) {
        const updatedOrders = orders.filter(order => order.orderId !== orderId);
        setOrders(updatedOrders);
      } else {
        console.error("Ошибка при отмене заказа:", response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при отмене заказа:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={style.loading}>
        <MoonLoader color="#5A9CEC" size={100} />
      </div>
    );
  }

  return (
    <div className={style.ordersContainer}>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.orderId} className={style.orderCard}>
            <h2>Номер заказа: {order.orderId}</h2>
            <p>Дата создания: {order.createdAt}</p>
            <div className={style.products}>
              {order.products.map(product => {
                const productImages = JSON.parse(product.productImage) as string[];
                const firstImage = productImages[0];

                return (
                  <div key={product.productId} className={style.productCard}>
                    <img src={`/Product/${product.productName}/${firstImage}`} alt={product.productName} width={128} />
                    <h3>{product.productName}</h3>
                    <p>Количество: {product.quantity}</p>
                  </div>
                );
              })}
            </div>
            <Button title="Отменить заказ" onClick={() => handleCancelOrder(order.orderId)} className={style.cancelOrderButton} />
          </div>
        ))
      ) : (
        <>
          <img src="/nullOrders.svg" alt="Нет заказов" width={400} height={240} />
          <h2 className={style.nullTitile}>У вас пока нет заказов</h2>
          <p className={style.nullText}>Похоже, что вы еще ничего не заказали. Просмотрите наш каталог и найдите то, что вам нужно!</p>
          <Button title="Перейти в каталог" className={style.buttonGreen} link="/Catalog" />
        </>
      )}
    </div>
  );
};

export default Orders;
