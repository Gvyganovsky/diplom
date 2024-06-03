import { useState, useEffect } from "react";
import style from "./OurOffers.module.scss";
import Product from "../../Product/index.tsx";
import Title from "../../Title";

interface ProductData {
  id: number;
  name: string;
  image: string;
  brand: string;
  model: string;
  price: number;
}

const OurOffers = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dp-viganovsky.xn--80ahdri7a.site/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: ProductData[]) => {
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }
        const firstThreeProducts = data.slice(0, 3);
        setProducts(firstThreeProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div className={style.ourOffers}>
      <Title text="Наши предложения" />
      <div className={style.content}>
        <p className={style.favorite}>ТОП ПРОДАЖ</p>
        {error ? (
          <p className={style.error}>Ошибка загрузки данных: {error}</p>
        ) : (
          products.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              image={product.image}
              brand={product.brand}
              model={product.model}
              price={product.price}
            />
          ))
        )}

        <img
          src="/iconLine.svg"
          alt="Line"
          width={660}
          height={540}
          className={style.img}
        />
      </div>
    </div>
  );
};

export default OurOffers;
