import Breadcrumbs from "../components/Breadcrumbs";
import style from "../App.module.scss";
import Filter from "../components/Filter/index.tsx";
import Product from "../components/Product/index.tsx";
import Hero from "../components/Hero/index.tsx";
import React from "react";

interface ProductType {
  id: number;
  image: string;
  name: string;
  brand: string;
  model: string;
  price: number;
}

const Catalog: React.FC = () => {
  const [product, setProduct] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    fetch("https://dp-viganovsky.xn--80ahdri7a.site/api/products")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setProduct(json);
      });
  }, []);

  return (
    <>
      <Hero
        title="Дрон опрыскиватель AGR A22"
        Background="/Background/Catalog.jpg"
        imageAdapt="/Background/5.png"
        text="Высокое качество продукции и хороший урожай - результат точного планирования и быстрого реагирования на возникающие посевам угроз."
        listAltItems={[
          { img: "./Catalog/iconTime.svg", title: "Время полета 15 минут" },
          { img: "./Catalog/icoFly.svg", title: "Скорость полета" },
          { img: "./Catalog/iconRTK.svg", title: "Автономная работа" },
          { img: "./Catalog/iconWidth.svg", title: "Ширина захвата 8 м" },
          { img: "./Catalog/iconFuel.svg", title: "Емкость бака" },
          { img: "./Catalog/iconIP67.svg", title: "Водонепроницаемость" },
        ]}
      />

      <div className={style.container}>
        <Breadcrumbs title="Каталог" />
        <h2 className={style.title}>Наши предложения</h2>
        <div className={style.content}>
          <Filter />
          <div className={style.catalog}>
            {product.map((product) => (
              <Product
                key={product.id}
                image={product.image}
                name={product.name}
                brand={product.brand}
                model={product.model}
                price={product.price}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
