import style from "./HorizNews.module.scss";
import { Link } from "react-router-dom";

const index = (props: any) => {
  return (
    <li className={style.news}>
      <img
        src={props.img}
        alt="News"
        width={500}
        height={320}
        className={style.img}
      />
      <div>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.text}>{props.text}</p>
        <Link to="/" className={style.link}>
          Читать полностью
        </Link>
      </div>
    </li>
  );
};

export default index;
