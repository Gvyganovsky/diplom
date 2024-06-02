import style from "./Contact.module.scss";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";

const index = () => {
  return (
    <section className={style.contact}>
      <div className={style.container}>
        <Breadcrumbs title="Контакты" />

        <Title text="Как с нами связаться" />

          <p className={style.text__vert}>КОНТАКТЫ</p>
        <div className={style.content}>
          <div className={style.info}>
            <h2 className={style.title}>AgroScout</h2>
            <p className={style.text__small}>Наш адрес</p>
            <p className={style.text__normal}>Россия, г. Москва</p>
            <p className={style.text__small}>Наш телефон</p>
            <p className={style.text__normal}>+7(861)-217-91-18</p>
            <img
              src="./iconDrone_flying.svg"
              alt="Drone flying"
              className={style.img}
              height={130}
            />
            <Button title="Написать нам" className="buttonWhite" />
          </div>
          
          <img src="./map.jpg" alt="map" width={1000} height={510} className={style.map} />
        </div>
      </div>
    </section>
  );
};

export default index;
