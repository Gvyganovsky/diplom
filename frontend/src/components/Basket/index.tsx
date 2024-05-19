import { Link } from "react-router-dom";
import style from "./Basket.module.scss";
import Button from "../Button";
import BasketContext from "../../context/BasketContext";
import React, { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

const Basket = () => {
  const { setBasketOpened } = React.useContext(BasketContext);
  const { basket } = useContext(AuthContext);

  return (
    <div className={style.shadow} onClick={() => setBasketOpened(false)}>
      <div className={style.basket}>
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
            {basket.map((item, index) => (
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
                    <p className={style.article}>Артикуль: {item.product.id}</p>
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
              </li>
            ))}
            <div className={style.footer}>
              <Link to="./Catalog" className={style.link}>
                Продолжить покупки
              </Link>
              <p className={style.allPrice}>
                Всего: <span className={style.number}>${basket.reduce((total, item) => total + item.product.price * item.quantity, 0)}</span>
              </p>
              <Button title="Оформить заказ" className="ButtonGreen" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Basket;
