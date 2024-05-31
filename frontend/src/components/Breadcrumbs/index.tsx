import style from "./Breadcrumbs.module.scss";

const index = (props: any) => {
  return (
    <p className={style.router}>
      Главная \ <span className={style.router_green}>{props.title}</span>
    </p>
  );
};

export default index;
