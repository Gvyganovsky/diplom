import React, { useContext } from 'react';
import Button from "../../Button";
import FeatureList from "../../FeatureList/FeatureList";
import ImageCatalog from "../ImageCatalog";
import styles from "./infoProduct.module.scss";
import { AuthContext } from '../../../contexts/delete'; // Импортируем контекст пользователя

const Index = (props: any) => {
  const { product } = props;
  const authContext = useContext(AuthContext); // Получаем контекст пользователя

  const FeatureListData = [
    { img: '/IconFuel.svg', text: 'Бак для распыления 22 л' },
    { img: '/iconWidth.svg', text: 'Ширина захвата 5-8 м' },
    { img: '/RTK.svg', text: 'Высокоточное позиционирование' },
    { img: '/iconTree.svg', text: 'Датчик высоты и обхода препятствий' },
    { img: '/IP67.svg', text: 'Воднепроницаемость' },
    { img: '/iconDroneone.svg', text: 'Скорость полета 10 м/с' },
  ];

  const handleAddToBasket = () => {
    if (authContext && product) {
      authContext.addToBasket(product, 1); // Добавляем товар в корзину с количеством 1
    }
  };

  if (!product) {
    return <div>ЫЫы</div>
  }

  return (
    <div className={styles.infoBlock}>
      <ImageCatalog images={product.image} />

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.text}>Модель: {product.brand}</p>
        <FeatureList features={FeatureListData} />
        <p className={styles.link}>Все характеристики</p>
        <div>
          <p className={styles.price}>{product.price}</p>
          <div className={styles.countBlock}>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <div>
            {/* При нажатии на кнопку вызываем функцию handleAddToBasket */}
            <Button title="Добавить в корзину" onClick={handleAddToBasket} className={styles.buttonAlt} />
            <Button title="Купить в 1 клик" link="Product" className={styles.buttonAlt} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
