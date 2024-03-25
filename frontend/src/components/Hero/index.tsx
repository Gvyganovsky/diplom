import stylesHero from "./Hero.module.scss";
import stylesApp from "../../App.module.scss";

const index = (props: any) => {
  return (
    <div
      className={stylesHero.hero}
      style={{
        backgroundImage: `url(${props.backgroundImage}), url("./Vector.png")`,
      }}
    >
      <div className={stylesApp.container}>
        <h1 className={stylesHero.title}>{props.title}</h1>

        {props.imageSrc && (
          <img
            src={props.imageSrc}
            alt="Drone flying"
            className={stylesHero.img}
            height={120}
          />
        )}

        {props.text && <p className={stylesHero.textInfo}>{props.text}</p>}

        {props.listItems && props.listItems.length > 0 && (
          <ul className={stylesHero.list}>
            {props.listItems.map((item: any, index: any) => (
              <li key={index} className={stylesHero.item}>
                <h3 className={stylesHero.item__title}>{item.title}</h3>
                <p className={stylesHero.item__text}>{item.text}</p>
              </li>
            ))}
          </ul>
        )}

        {props.listAltItems && props.listAltItems.length > 0 && (
          <ul className={stylesHero.listAlt}>
            {props.listAltItems.map((item: any, index: any) => (
              <li key={index} className={stylesHero.itemAlt}>
                <img src={item.img} alt="icon" width={40} height={40} className={stylesHero.icon} />
                <h3 className={stylesHero.text}>{item.title}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default index;
