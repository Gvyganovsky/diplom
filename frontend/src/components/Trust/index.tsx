import style from "./Trust.module.scss";
import Title from "../Title";

const Trust = (props: { title: any; data: any[]; }) => {
  return (
    <div className={style.trust}>
      <Title text={props.title} />
      <div className={style.content}>
        {props.data.map((data, index) => (
          <div className={style.block} key={index}>
            <img
              src={data.img}
              alt="info"
              width={40}
              height={40}
              className={style.info__img}
            />
            <h5 className={style.info__title}>{data.title}</h5>
            <p className={style.info__text}>{data.text}</p>
          </div>
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

export default Trust;
