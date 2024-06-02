import style from "./infoProduct.module.scss";
import Button from "../../Button";
import FeatureList from "../../FeatureList/FeatureList";
import ImageCatalog from "../ImageCatalog";
import Breadcrumbs from "../../Breadcrumbs";
import { FeatureListData } from "../../../Data";

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

  const addToBasket = async () => {
    try {
      const userId = localStorage.getItem("user");
      if (!userId) {
        console.error("Нет данных о пользователе в localStorage");
        return;
      }

      let parsedUserId: { id: string };
      try {
        parsedUserId = JSON.parse(userId);
      } catch (error) {
        console.error("Ошибка при парсинге данных пользователя из localStorage:", error);
        return;
      }

      const requestBody = JSON.stringify({
        user: parsedUserId.id,
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

  const imagesArray = JSON.parse(product.image) as string[];

  return (
    <section className={style.container}>
      <Breadcrumbs title={product.name} />
      <div className={style.infoBlock}>

        <ImageCatalog name={product.name} images={imagesArray} />

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
