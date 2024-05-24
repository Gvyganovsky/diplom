import React, { useContext } from 'react';
import Button from "../../Button";
import FeatureList from "../../FeatureList/FeatureList";
import ImageCatalog from "../ImageCatalog";
import styles from "./infoProduct.module.scss";

const Index = (props: any) => {
  const { product } = props;

  const addToBasket = async () => {
    try {
      // Получаем идентификатор пользователя из локального хранилища
      const userId = localStorage.getItem('user');
      let parsedUserId = null;
  
      if (userId) {
        parsedUserId = JSON.parse(userId).id;
      } else {
        console.error('Нет данных о пользователе в localStorage');
        return; // Прекращаем выполнение функции, так как нет данных о пользователе
      }
  
      const requestBody = JSON.stringify({
        user: parsedUserId, // Используем идентификатор пользователя из локального хранилища
        product: parseInt(product.id),
        count: 1
      });
  
      console.log('Тело запроса:', requestBody);
  
      const response = await fetch('https://dp-viganovsky.xn--80ahdri7a.site/api/basket/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: requestBody
      });
  
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        alert('Товар успешно добавлен в корзину.');
      } else {
        alert('Ошибка при добавлении товара в корзину.');
      }
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса:', error);
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
        {/* Ваша FeatureList */}
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
