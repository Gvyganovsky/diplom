import style from "./Product.module.scss";
import Button from "../Button";

interface ProductProps {
  image: string; 
  name: string;
  brand: string;
  model: string;
  price: number;
  id: number;
}

const Index: React.FC<ProductProps> = ({ id, image, name, brand, model, price }) => {
  const imageUrls = JSON.parse(image) as string[]; 
  const mainImage = imageUrls[0];

  return (
    <li className={style.product}>
      <img
        src={`/backend/api/uploads/products/${id}/${mainImage}`}
        alt="product"
        width={200}
        height={160}
        className={style.img}
      />
      <div className={style.product__info}>
        <h5 className={style.product__title}>{name}</h5>
        <div className={style.product__block}>
          <p className={style.product__text}>Брэнд: {brand}</p>
          <p className={style.product__text}>Модель: {model}</p>
        </div>
        <p className={style.price}>{price}</p>
        <Button id={id} title="Добавить в корзину" link="/Product" className="ButtonGreen" />
      </div>
    </li>
  );
};

export default Index;
