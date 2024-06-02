import style from "./Title.module.scss";

const index = (props: any) => {
  return <h2 className={style.title}>{props.text}</h2>;
};

export default index;
