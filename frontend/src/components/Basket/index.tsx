import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Basket.module.scss";
import Button from "../Button";
import BasketContext from "../../contexts/BasketContext";

const Basket = () => {
  const { setBasketOpened } = useContext(BasketContext);
  const [basketData, setBasketData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        // Получаем информацию о пользователе из локального хранилища
        const userData = localStorage.getItem("user");
        if (!userData) {
          console.error("Данные пользователя отсутствуют в локальном хранилище");
          return;
        }
        const { id: userId } = JSON.parse(userData);

        const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/basket/get/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setBasketData(data);

          // Получаем данные о продуктах
          const productRequests = data.map(item =>
            fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${item.product}`)
          );
          const productResponses = await Promise.all(productRequests);
          const productData = await Promise.all(productResponses.map(res => res.json()));

          // Парсинг строки image в массив и объединение данных корзины и продуктов
          const combinedData = data.map((item, index) => {
            const productDetails = productData[index];
            productDetails.image = JSON.parse(productDetails.image); // Парсинг image
            return {
              ...item,
              productDetails
            };
          });

          setProducts(combinedData);
        } else {
          console.error("Ошибка получения данных с сервера");
        }
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBasketData();
  }, []);

  const handleCheckout = async () => {
    try {
      // Получаем информацию о пользователе из локального хранилища
      const userData = localStorage.getItem("user");
      if (!userData) {
        console.error("Данные пользователя отсутствуют в локальном хранилище");
        return;
      }
      const { id: userId } = JSON.parse(userData);

      const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/checkout/${userId}`, {
        method: "POST"
      });
      const data = await response.json();
      if (data.success) {
        console.log("Заказ успешно оформлен");
        // Здесь можно добавить дополнительную логику, например, очистку корзины или переход на страницу с подтверждением заказа
      } else {
        console.error("Ошибка при оформлении заказа:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.shadow} onClick={() => setBasketOpened(false)}>
      <div className={style.basket} onClick={(e) => e.stopPropagation()}>
        <div className={style.container}>
          <h3 className={style.title}>Корзина</h3>
          <img
            src="./Basket/IconClose.svg"
            alt="IconClose"
            width={38}
            height={38}
            className={style.iconClose}
            onClick={() => setBasketOpened(false)}
          />
          <ul className={style.list}>
            {products.length > 0 ? (
              products.map((item, index) => (
                <li className={style.item} key={index}>
                  <div className={style.hero}>
                    <img
                      src={`/Product/${item.productDetails.name}/${item.productDetails.image[0]}`} // Получение первого элемента из массива image
                      alt={item.productDetails.name}
                      width={225}
                      height={150}
                      className={style.img}
                    />
                    <div className={style.textBlock}>
                      <h5 className={style.name}>{item.productDetails.name}</h5>
                      <p className={style.article}>Артикул: {item.productDetails.id}</p>
                    </div>
                  </div>
                  <div className={style.priceBlock}>
                    <div className={style.countBlock}>
                      <p className={style.countIcon}>-</p>
                      <p className={style.count}>{item.count}</p>
                      <p className={style.countIcon}>+</p>
                    </div>
                    <p className={style.price}>${item.productDetails.price}</p>
                    <img
                      src="./iconUrn.svg"
                      alt="iconUrn"
                      width={17}
                      height={21}
                      className={style.Urn}
                    />
                  </div>
                </li>
              ))
            ) : (
              <>
                <img
                  src="/basketNull.svg"
                  alt="basketNull"
                  width={320}
                  height={230}
                  className={style.image}
                />
                <p className={style.text}>Корзина пуста</p>
                <Link to="/Catalog" className={style.cont}>Продолжить покупки</Link>
              </>
            )}
           {products.length > 0 && (
              <div className={style.footer}>
                <Link to="./Catalog" className={style.link}>
                  Продолжить покупки
                </Link>
                <p className={style.allPrice}>
                  Всего: <span className={style.number}>23</span>
                </p>
                <Button title="Оформить заказ" className="ButtonGreen" onClick={handleCheckout} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Basket;
