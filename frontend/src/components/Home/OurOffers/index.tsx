import styles from "./OurOffers.module.scss";
import Product from "../../Product/index.tsx";
import OurOffersData from "./OurOffersData.tsx";
import Title from "../../Title";

const index = () => {
  return (
    <div className={styles.ourOffers}>
      <Title text="Наши предложения" />
      <div className={styles.content}>
        <p className={styles.favorite}>ТОП ПРОДАЖ</p>
        {OurOffersData.map((OurOffersData, index) => (
          <Product key={index} {...OurOffersData} />
        ))}
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

export default index;
