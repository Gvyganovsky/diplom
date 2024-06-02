import style from "./infoProduct.module.scss";
import Button from "../../Button";
import FeatureList from "../../FeatureList/FeatureList";
import ImageCatalog from "../ImageCatalog";
import Breadcrumbs from "../../Breadcrumbs";
import { FeatureListData } from "../../../Data";

const Index = (props: any) => {
  const { product } = props;

  const addToBasket = async () => {
    try {
      const userId = localStorage.getItem("user");
      let parsedUserId = null;
      if (userId) {
        parsedUserId = JSON.parse(userId).id;
      } else {
        console.error("Нет данных о пользователе в localStorage");
        return;
      }
      const requestBody = JSON.stringify({
        user: parsedUserId,
        product: parseInt(product.id),
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
    return <div>ЫЫы</div>;
  }

  const imagesArray = JSON.parse(product.image) as string[];

  return (
    <div className={style.infoBlock}>
      <Breadcrumbs title={product.name} />

      <ImageCatalog name={product.name} images={imagesArray} />

      <div className={style.info}>
        <h1 className={style.title}>{product.name}</h1>
        <p className={style.text}>Модель: {product.brand}</p>
        <FeatureList features={FeatureListData} />
        <p className={style.link}>Все характеристики</p>
        <div>
          <p className={style.price}>{product.price}</p>
          <div className={style.countBlock}>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <div>
            <Button
              title="Добавить в корзину"
              onClick={addToBasket}
              className={style.buttonAlt}
            />
            {/* Добавьте кнопку для "Купить в 1 клик", если необходимо */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
