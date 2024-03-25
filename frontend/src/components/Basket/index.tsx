import { Link } from "react-router-dom";
import style from "./Basket.module.scss";
import { ButtonGreen } from "../Buttons";

const index = () => {
  return (
    <div className={style.shadow}>
      <div className={style.basket}>
        <div className={style.container}>
          <h3 className={style.title}>Корзина</h3>
          <img
            src="./Basket/IconClose.svg"
            alt="IconClose"
            width={38}
            height={38}
            className={style.iconClose}
          />
          <ul className={style.list}>
            <li className={style.item}>
              <div className={style.hero}>
                <img
                  src="./Product/AGR A22.png"
                  alt="product"
                  width={225}
                  height={150}
                  className={style.img}
                />
                <div className={style.textBlock}>
                  <h5 className={style.name}>Агродрон AGR A22</h5>
                  <p className={style.article}>Артикуль: AGR</p>
                </div>
              </div>
              <div className={style.priceBlock}>
                <div className={style.countBlock}>
                  <p className={style.countIcon}>-</p>
                  <p className={style.count}>1</p>
                  <p className={style.countIcon}>+</p>
                </div>
                <p className={style.price}>$15001.27</p>
                <img
                  src="./iconUrn.svg"
                  alt="iconUrn"
                  width={17}
                  height={21}
                  className={style.Urn}
                />
              </div>
            </li>
            <div className={style.footer}>
              <Link to="./Catalog" className={style.link}>
                Продолжить покупки
              </Link>
              <p className={style.allPrice}>
                Всего: <span className={style.number}>$15001.27</span>
              </p>
              <ButtonGreen title="Оформить заказ" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
