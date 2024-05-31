import style from "./Info.module.scss";

const index = (props: any) => {
  return (
    <div className={style.block}>
      <img
        src={props.img}
        alt="info"
        width={40}
        height={40}
        className={style.info__img}
      />

      <h5 className={style.info__title}>{props.title}</h5>
      <p className={style.info__text}>{props.text}</p>
    </div>
  );
};

export default index;
