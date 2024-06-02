import style from "./Trust.module.scss";
import Info from "../Info/index.tsx";
import Title from "../Title";

const index = (props:any) => {
  return (
    <div className={style.trust}>
      <Title text={props.title} />
      <div className={style.content}>
        {props.data.map((data: any, index: any) => (
          <Info key={index} {...data} />
        ))}
        <img
          src="/Trust/iconDron.svg"
          alt=""
          width={265}
          height={265}
          className={style.img}
        />
      </div>
    </div>
  );
};

export default index;
