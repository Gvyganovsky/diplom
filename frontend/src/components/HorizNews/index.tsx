import { Link } from "react-router-dom";
import styles from "./HorizNews.module.scss";

const index = (props: any) => {
  return (
    <li className={styles.news}>
      <img
        src={props.img}
        alt="News"
        width={500}
        height={320}
        className={styles.img}
      />
      <div>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.text}>{props.text}</p>
        <Link to="/" className={styles.link}>
          Читать полностью
        </Link>
      </div>
    </li>
  );
};

export default index;
