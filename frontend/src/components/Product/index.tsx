import styles from "./Product.module.scss";
import Button from "../Button";

const index = (props: any) => {
  return (
    <li className={styles.product}>
      <img
        src={props.img}
        alt="product"
        width={260}
        height={160}
        className={styles.img}
      />
      <div className={styles.product__info}>
        <h5 className={styles.product__title}>{props.title}</h5>
        <div className={styles.product__block}>
          <p className={styles.product__text}>Брэнд: {props.brand}</p>
          <p className={styles.product__text}>Модель: {props.model}</p>
        </div>
        <p className={styles.price}>{props.price}</p>
        <Button title="Добавить в корзину" className="ButtonGreen" />
      </div>
    </li>
  );
};

export default index;
