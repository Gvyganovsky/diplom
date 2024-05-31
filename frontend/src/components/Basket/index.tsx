import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Basket.module.scss";
import Button from "../Button";
import BasketContext from "../../contexts/BasketContext";

interface Product {
  product: number;
  count: number;
  productDetails: {
    name: string;
    id: number;
    price: number;
    image: string[];
  };
}

const Basket = () => {
  const { setBasketOpened } = useContext(BasketContext);
  const [products, setProducts] = useState<Product[]>([]); // Указываем явно тип для useState
  const [isLoading, setIsLoading] = useState<boolean>(true); // Указываем явно тип для useState
  const navigate = useNavigate(); // Используем useNavigate для перенаправления

  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          console.error("Данные пользователя отсутствуют в локальном хранилище");
          return;
        }
        const { id: userId } = JSON.parse(userData);

        const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/basket/get/${userId}`);
        if (response.ok) {
          const data = await response.json();

          const productRequests: Promise<Response>[] = data.map((item: any) =>
            fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${item.product}`)
          );
          const productResponses: Response[] = await Promise.all(productRequests);
          const productData: any[] = await Promise.all(productResponses.map((res: Response) => res.json()));

          const combinedData: any[] = data.map((item: any, index: number) => {
            const productDetails = productData[index];
            productDetails.image = JSON.parse(productDetails.image);
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

  const updateProductCount = async (productId: number, newCount: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        console.error("Данные пользователя отсутствуют в локальном хранилище");
        return;
      }
      const { id: userId } = JSON.parse(userData);

      const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/basket/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          productId,
          count: newCount
        })
      });

      if (response.ok) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.product === productId ? { ...product, count: newCount } : product
          )
        );
      } else {
        console.error("Ошибка обновления количества товара в корзине");
      }
    } catch (error) {
      console.error("Ошибка обновления количества товара:", error);
    }
  };

  const removeProductFromBasket = async (productId: number) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        console.error("Данные пользователя отсутствуют в локальном хранилище");
        return;
      }
      const { id: userId } = JSON.parse(userData);

      const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/basket/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          productId
        })
      });

      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product.product !== productId));
      } else {
        console.error("Ошибка удаления товара из корзины");
      }
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
    }
  };

  const handleCheckout = async () => {
    try {
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
        setBasketOpened(false); // Закрываем корзину
        navigate('/orders'); // Перенаправляем на страницу заказов
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
            src="/Basket/IconClose.svg"
            alt="IconClose"
            width={38}
            height={38}
            className={style.iconClose}
            onClick={() => setBasketOpened(false)}
          />
          <ul className={style.list}>
            {products.length > 0 ? (
              products.map((item: Product, index: number) => ( // Указываем явно типы для параметров item и index
                <li className={style.item} key={index}>
                  <div className={style.hero}>
                    <img
                      src={`/Product/${item.productDetails.name}/${item.productDetails.image[0]}`}
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
                      <p className={style.countIcon} onClick={() => updateProductCount(item.product, item.count - 1)}>-</p>
                      <p className={style.count}>{item.count}</p>
                      <p className={style.countIcon} onClick={() => updateProductCount(item.product, item.count + 1)}>+</p>
                    </div>
                    <p className={style.price}>${item.productDetails.price}</p>
                    <img
                      src="/iconUrn.svg"
                      alt="iconUrn"
                      width={17}
                      height={21}
                      className={style.Urn}
                      onClick={() => removeProductFromBasket(item.product)}
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
              </>
            )}
            {products.length > 0 && (
              <div className={style.footer}>
                <Link to="./Catalog" className={style.link}>
                  Продолжить покупки
                </Link>
                <p className={style.allPrice}>
                  Всего: <span className={style.number}>{
                    products.reduce((total, item) => total + item.productDetails.price * item.count, 0)
                  }</span>
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
