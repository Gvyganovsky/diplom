import styles from "./Product.module.scss";
import Button from "../Button";

interface productProps {
  id: number;
  img: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  link: string;
}

const index: React.FC<productProps> = ({id, img, title, brand, model, price}) => {
  return (
    <li className={styles.product}>
      <img
        src={img}
        alt="product"
        width={260}
        height={160}
        className={styles.img}
      />
      <div className={styles.product__info}>
        <h5 className={styles.product__title}>{title}</h5>
        <div className={styles.product__block}>
          <p className={styles.product__text}>Брэнд: {brand}</p>
          <p className={styles.product__text}>Модель: {model}</p>
        </div>
        <p className={styles.price}>{price}</p>
        <Button id={id} title="Добавить в корзину" link="/Product" className="ButtonGreen" />
      </div>
    </li>
  );
};

export default index;
