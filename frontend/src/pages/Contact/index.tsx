import styles from "./Contact.module.scss";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";

const index = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <Breadcrumbs title="Контакты" />

        <Title text="Как с нами связаться" />

        <div className={styles.content}>
          <p className={styles.text__vert}>КОНТАКТЫ</p>
          <div className={styles.info}>
            <h2 className={styles.title}>AgroScout</h2>
            <p className={styles.text__small}>Наш адрес</p>
            <p className={styles.text__normal}>Россия, г. Москва</p>
            <p className={styles.text__small}>Наш телефон</p>
            <p className={styles.text__normal}>+7(861)-217-91-18</p>
            <img
              src="./iconDrone_flying.svg"
              alt="Drone flying"
              className={styles.img}
              height={130}
            />
            <Button title="Написать нам" className="buttonWhite" />
          </div>
          
          <img src="./map.jpg" alt="map" width={1000} height={510} className={styles.map} />
        </div>
      </div>
    </section>
  );
};

export default index;
