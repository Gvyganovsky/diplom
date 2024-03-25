import stylesTrust from "./Trust.module.scss";
import stylesApp from "../../App.module.scss";
import trustData from "./trustData.tsx";
import Info from "../Home/Info/index.tsx";

const index = (props: any) => {
  return (
    <div className={stylesApp.container}>
      <h2 className={stylesApp.title}>{props.title}</h2>
      <div className={stylesTrust.content}>
        {trustData.map((trustData, index) => (
          <Info key={index} {...trustData} />
        ))}
        <img
          src="./Trust/iconDron.svg"
          alt=""
          width={265}
          height={265}
          className={stylesTrust.img}
        />
      </div>
    </div>
  );
};

export default index;
