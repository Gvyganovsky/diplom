import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Orders.module.scss';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          console.error("Данные пользователя отсутствуют в локальном хранилище");
          return;
        }
        const { id: userId } = JSON.parse(userData);

        const response = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/orders/${userId}`);
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

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://dp-viganovsky.xn--80ahdri7a.site/api/order/delete/${orderId}`);
      if (response.data.success) {
        // Обновляем список заказов после успешной отмены заказа
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
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.ordersContainer}>
      {orders.map(order => (
        <div key={order.orderId} className={styles.orderCard}>
          <h2>Номер заказа: {order.orderId}</h2>
          <p>Дата создания: {order.createdAt}</p>
          <div className={styles.products}>
            {order.products.map(product => (
              <div key={product.productId} className={styles.productCard}>
                <img src={`Product/${product.productName}/${product.productImage[1]}`} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
          </div>
          {/* Добавляем кнопку "Отмена заказа" */}
          <img
            src="path_to_cancel_button_image"
            alt="Cancel Order"
            className={styles.cancelOrderButton}
            onClick={() => handleCancelOrder(order.orderId)}
          />
        </div>
      ))}
    </div>
  );
};

export default Orders;
