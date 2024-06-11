import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Orders.module.scss';
import Button from '../../components/Button';
import { MoonLoader } from "react-spinners";
import { useNavigate, Link } from 'react-router-dom';

interface Product {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  createdAt: string;
  products: Product[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Токен пользователя отсутствует в локальном хранилище");
          navigate("/profile");
          return;
        }

        const response = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/orders`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const sortedOrders = response.data.orders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          const ordersWithPrices = await Promise.all(sortedOrders.map(async (order: Order) => {
            const productsWithPrices = await Promise.all(order.products.map(async (product: Product) => {
              const productResponse = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${product.productId}`, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              });
              return {
                ...product,
                price: productResponse.data.price
              };
            }));
            return {
              ...order,
              products: productsWithPrices
            };
          }));

          setOrders(ordersWithPrices);
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
  }, [navigate]);

  const calculateTotalPrice = (products: Product[]) => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
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
                  <Link key={product.productId} to={`/Product/${product.productId}`} className={style.productCard}>
                    <img
                      src={`/backend/api/uploads/products/${product.productId}/${firstImage}`}
                      alt={product.productName}
                      height={100} />
                    <h3>{product.productName}</h3>
                    <p>Количество: {product.quantity}</p>
                    <p>Цена за единицу: ${product.price}</p>
                    <p>Общая стоимость: ${product.price * product.quantity}</p>
                  </Link>
                );
              })}
            </div>
            <h3 className={style.totalPrice}>Общая стоимость заказа: ${calculateTotalPrice(order.products)}</h3>
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
