import styles from "./Product.module.scss";
import Button from "../Button";

interface ProductProps {
  image: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  id: number;
}


const index: React.FC<ProductProps> = ({ id, image, name, brand, model, price }) => {
  const imagesArray = JSON.parse(image) as string[];
  const mainImage = imagesArray[0];

  return (
    <li className={styles.product}>
      <img
        src={`/Product/${name}/${mainImage}`}
        alt="product"
        width={260}
        height={160}
        className={styles.img}
      />
      <div className={styles.product__info}>
        <h5 className={styles.product__title}>{name}</h5>
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
