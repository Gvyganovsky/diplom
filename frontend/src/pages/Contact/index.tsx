import stylesContact from "./Contact.module.scss";
import stylesApp from "../../App.module.scss";
import Button from "../../components/Button";

const index = () => {
  return (
    <section className={stylesContact.contact}>
      <div className={stylesApp.container}>
        <p className={stylesApp.router}>
          Главная \ <span className={stylesApp.router_green}>Контакты</span>
        </p>
        <h1 className={stylesApp.title}>Как с нами связаться</h1>
        <div className={stylesContact.content}>
          <p className={stylesContact.text__vert}>КОНТАКТЫ</p>
          <div className={stylesContact.info}>
            <h2 className={stylesContact.title}>AgroScout</h2>
            <p className={stylesContact.text__small}>Наш адрес</p>
            <p className={stylesContact.text__normal}>Россия, г. Москва</p>
            <p className={stylesContact.text__small}>Наш телефон</p>
            <p className={stylesContact.text__normal}>+7(861)-217-91-18</p>
            <img
              src="./iconDrone_flying.svg"
              alt="Drone flying"
              className={stylesContact.img}
              height={130}
            />
            <Button title="Написать нам" className="buttonWhite" />
          </div>
          <img src="./map.jpg" alt="map" width={1130} height={510}/>
        </div>
      </div>
    </section>
  );
};

export default index;
