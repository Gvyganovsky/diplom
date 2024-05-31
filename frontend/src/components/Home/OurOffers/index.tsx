<<<<<<< HEAD
import styles from "./OurOffers.module.scss";
import Product from "../../Product/index.tsx";
import OurOffersData from "./OurOffersData.tsx";
import Title from "../../Title";

const index = () => {
=======
import { useState, useEffect } from "react";
import styles from "./OurOffers.module.scss";
import Product from "../../Product/index.tsx";
import Title from "../../Title";

interface ProductData {
  id: number;
  name: string;
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

>>>>>>> master
  return (
    <div className={styles.ourOffers}>
      <Title text="Наши предложения" />
      <div className={styles.content}>
        <p className={styles.favorite}>ТОП ПРОДАЖ</p>
<<<<<<< HEAD
        {OurOffersData.map((OurOffersData, index) => (
          <Product key={index} {...OurOffersData} />
        ))}
=======
        {/* {error ? (
          <p className={styles.error}>Ошибка загрузки данных: {error}</p>
        ) : (
          products.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              image=""
              brand=""
              model=""
              price={0}
            />
          ))
        )} */}
        
>>>>>>> master
        <img
          src="./iconLine.svg"
          alt="Line"
          width={660}
          height={540}
          className={styles.img}
        />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default index;
=======
export default OurOffers;
>>>>>>> master
