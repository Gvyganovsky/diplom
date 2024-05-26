import Breadcrumbs from "../components/Breadcrumbs";
import styles from "../App.module.scss";
import Filter from "../components/Catalog/Filter";
import Product from "../components/Product/index.tsx";
import Hero from "../components/Hero/index.tsx";
import React from "react";

const Catalog = () => {
  const [product, setProduct] = React.useState([]);

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

      <div className={styles.container}>
        <Breadcrumbs title="Каталог" />
        <h2 className={styles.title}>Наши предложения</h2>
        <div className={styles.content}>
          <Filter />
          <div className={styles.catalog}>
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
