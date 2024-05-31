<<<<<<< HEAD
import React, { useContext } from 'react';
=======
>>>>>>> master
import Button from "../../Button";
import FeatureList from "../../FeatureList/FeatureList";
import ImageCatalog from "../ImageCatalog";
import styles from "./infoProduct.module.scss";
<<<<<<< HEAD
=======
import Breadcrumbs from '../../Breadcrumbs';
>>>>>>> master

const Index = (props: any) => {
  const { product } = props;

  const addToBasket = async () => {
    try {
      // Получаем идентификатор пользователя из локального хранилища
      const userId = localStorage.getItem('user');
      let parsedUserId = null;
<<<<<<< HEAD
  
=======

>>>>>>> master
      if (userId) {
        parsedUserId = JSON.parse(userId).id;
      } else {
        console.error('Нет данных о пользователе в localStorage');
        return; // Прекращаем выполнение функции, так как нет данных о пользователе
      }
<<<<<<< HEAD
  
=======

>>>>>>> master
      const requestBody = JSON.stringify({
        user: parsedUserId, // Используем идентификатор пользователя из локального хранилища
        product: parseInt(product.id),
        count: 1
      });
<<<<<<< HEAD
  
      console.log('Тело запроса:', requestBody);
  
=======

      console.log('Тело запроса:', requestBody);

>>>>>>> master
      const response = await fetch('https://dp-viganovsky.xn--80ahdri7a.site/api/basket/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: requestBody
      });
<<<<<<< HEAD
  
      const data = await response.json();
      console.log(data);
  
=======

      const data = await response.json();
      console.log(data);

>>>>>>> master
      if (data.success) {
        alert('Товар успешно добавлен в корзину.');
      } else {
        alert('Ошибка при добавлении товара в корзину.');
      }
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса:', error);
    }
  };
<<<<<<< HEAD
  
  
=======
>>>>>>> master

  if (!product) {
    return <div>ЫЫы</div>
  }

<<<<<<< HEAD
  return (
    <div className={styles.infoBlock}>
      <ImageCatalog images={product.image} />
=======
  const imagesArray = JSON.parse(product.image) as string[];

  const FeatureListData = [
    { img: '/IconFuel.svg', text: 'Бак для распыления 22 л' },
    { img: '/iconWidth.svg', text: 'Ширина захвата 5-8 м' },
    { img: '/RTK.svg', text: 'Высокоточное позиционирование' },
    { img: '/iconTree.svg', text: 'Датчик высоты и обхода препятствий' },
    { img: '/IP67.svg', text: 'Воднепроницаемость' },
    { img: '/iconDroneone.svg', text: 'Скорость полета 10 м/с' },
  ];

  return (
    <div className={styles.infoBlock}>
      <Breadcrumbs title={product.name} />

      <ImageCatalog name={product.name} images={imagesArray} />
>>>>>>> master

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.text}>Модель: {product.brand}</p>
<<<<<<< HEAD
        {/* Ваша FeatureList */}
=======
        <FeatureList features={FeatureListData} />
>>>>>>> master
        <p className={styles.link}>Все характеристики</p>
        <div>
          <p className={styles.price}>{product.price}</p>
          <div className={styles.countBlock}>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <div>
            <Button title="Добавить в корзину" onClick={addToBasket} className={styles.buttonAlt} />
            {/* Добавьте кнопку для "Купить в 1 клик", если необходимо */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
