import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Orders.module.scss';
<<<<<<< HEAD

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
=======
import Button from '../../components/Button';

// Определение типов для продуктов и заказов
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
>>>>>>> master
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

<<<<<<< HEAD
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://dp-viganovsky.xn--80ahdri7a.site/api/order/delete/${orderId}`);
      if (response.data.success) {
        // Обновляем список заказов после успешной отмены заказа
=======
  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await axios.delete(`https://dp-viganovsky.xn--80ahdri7a.site/api/order/delete/${orderId}`);
      if (response.data.success) {
>>>>>>> master
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
<<<<<<< HEAD
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
=======
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.orderId} className={styles.orderCard}>
            <h2>Номер заказа: {order.orderId}</h2>
            <p>Дата создания: {order.createdAt}</p>
            <div className={styles.products}>
              {order.products.map(product => {
                const productImages = JSON.parse(product.productImage) as string[];
                const firstImage = productImages[0];

                return (
                  <div key={product.productId} className={styles.productCard}>
                    <img src={`/Product/${product.productName}/${firstImage}`} alt={product.productName} />
                    <h3>{product.productName}</h3>
                    <p>Количество: {product.quantity}</p>
                  </div>
                );
              })}
            </div>
            <img
              src="path_to_cancel_button_image"
              alt="Отменить заказ"
              className={styles.cancelOrderButton}
              onClick={() => handleCancelOrder(order.orderId)}
            />
          </div>
        ))
      ) : (
        <>
          <img src="/nullOrders.svg" alt="Нет заказов" width={400} height={240} />
          <h2 className={styles.nullTitile}>У вас пока нет заказов</h2>
          <p className={styles.nullText}>Похоже, что вы еще ничего не заказали. Просмотрите наш каталог и найдите то, что вам нужно!</p>
          <Button title="Перейти в каталог" className={styles.buttonGreen} link="/Catalog" />
        </>
      )}
>>>>>>> master
    </div>
  );
};

export default Orders;
