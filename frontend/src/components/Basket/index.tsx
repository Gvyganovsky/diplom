import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Basket.module.scss";
import Button from "../Button";
// import { AuthContext } from "../../contexts/AuthContext";
import BasketContext from "../../contexts/BasketContext";

const Basket = () => {
  // const { createOrder, basket } = useContext(AuthContext);
  const { setBasketOpened } = useContext(BasketContext);

  // const handleOrder = async () => {
  //   try {
  //     await createOrder();
  //     setBasketOpened(false); // Закрываем корзину после успешного создания заказа
  //   } catch (error) {
  //     console.error('Ошибка создания заказа:', error);
  //   }
  // };

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
          {/* <ul className={style.list}>
            {basket && basket.length > 0 ? (
              basket.map((item, index) => (
                <li className={style.item} key={index}>
                  <div className={style.hero}>
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      width={225}
                      height={150}
                      className={style.img}
                    />
                    <div className={style.textBlock}>
                      <h5 className={style.name}>{item.product.name}</h5>
                      <p className={style.article}>Артикул: {item.product.id}</p>
                    </div>
                  </div>
                  <div className={style.priceBlock}>
                    <div className={style.countBlock}>
                      <p className={style.countIcon}>-</p>
                      <p className={style.count}>{item.quantity}</p>
                      <p className={style.countIcon}>+</p>
                    </div>
                    <p className={style.price}>${item.product.price}</p>
                    <img
                      src="./iconUrn.svg"
                      alt="iconUrn"
                      width={17}
                      height={21}
                      className={style.Urn}
                    />
                  </div>
                  <div className={style.footer}>
                    <Link to="./Catalog" className={style.link}>
                      Продолжить покупки
                    </Link>
                    <p className={style.allPrice}>
                      Всего: <span className={style.number}>${basket.reduce((total, item) => total + item.product.price * item.quantity, 0)}</span>
                    </p>
                    <Button title="Оформить заказ" className="ButtonGreen" onClick={handleOrder} />
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
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Basket;
