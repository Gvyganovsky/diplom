import style from "./New.module.scss";;
import { Link } from "react-router-dom";

const index = (props: any) => {
  return (
    <article className={style.new}>
      <img
        src={props.img}
        alt="News"
        width={420}
        height={300}
        className={style.img}
      />
      <div className={style.block}>
        <h5 className={style.title}>{props.title}</h5>
        <p className={style.text}>{props.text}</p>
        <Link to="/" className={style.link}>
          Читать полностью
        </Link>
      </div>
    </article>
  );
};

export default index;
