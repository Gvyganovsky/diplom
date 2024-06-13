import style from "./infoProduct.module.scss";
import Button from "../../Button";
import FeatureList from "../FeatureList";
import ImageCatalog from "../ImageCatalog";
import Breadcrumbs from "../../Breadcrumbs";
import { FeatureListData } from "../../../Data";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
}

interface Props {
  product: Product;
}

const Index = (props: Props) => {
  const { product } = props;
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false); // Состояние для отслеживания добавления в корзину

  useEffect(() => {
    if (product && parseInt(product.price, 10) <= 200000 && !addedToCart) {
      addToBasket(); // Вызываем функцию добавления в корзину
      navigate("/catalog");
    }
  }, [product, addedToCart]); // Зависимость от product и addedToCart
  
  const addToBasket = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth/signin");
        return;
      }
  
      const requestBody = JSON.stringify({
        token: token,
        product: parseInt(product.id, 10),
        count: 1,
      });
  
      console.log("Тело запроса:", requestBody);
  
      const response = await fetch(
        "https://dp-viganovsky.xn--80ahdri7a.site/api/basket/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: requestBody,
        }
      );
  
      if (!response.ok) {
        console.error("Ошибка HTTP:", response.status, response.statusText);
        alert("Ошибка при добавлении товара в корзину.");
        return;
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        setAddedToCart(true); // Устанавливаем состояние добавления в корзину в true
        navigate("/Catalog");
        alert("Товар успешно добавлен в корзину.");
      } else {
        alert("Ошибка при добавлении товара в корзину.");
      }
    } catch (error) {
      console.error("Произошла ошибка при выполнении запроса:", error);
    }
  };
  

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  const imageUrls = JSON.parse(product.image);

  return (
    <section className={style.container}>
      <Breadcrumbs title={product.name} />
      <div className={style.infoBlock}>

        <ImageCatalog id={product.id} images={imageUrls} />

        <div className={style.info}>
          <h1 className={style.title}>{product.name}</h1>
          <p className={style.text}>Модель: {product.brand}</p>
          <FeatureList features={FeatureListData} />
          <div>
            <p className={style.price}>{product.price} рублей</p>
            <div className={style.button}>
              <Button
                title="Добавить в корзину"
                onClick={addToBasket}
                className={style.buttonAlt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;