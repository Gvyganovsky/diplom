import Breadcrumbs from "../components/Breadcrumbs";
import styles from "../App.module.scss";
import Filter from "../components/Catalog/Filter";
import OurOffersData from "./OurOffersData.tsx";
import Product from "../components/Product/index.tsx";
import Hero from "../components/Hero/index.tsx";

const Catalog = () => {
  return (
    <>
      <Hero
        title="Дрон опрыскиватель AGR A22"
        imageSrc="./iconDrone_flying.svg"
        backgroundImage="./Background/Catalog.jpg"
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
            {OurOffersData.map((OurOffersData, index) => (
              <Product key={index} {...OurOffersData} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
