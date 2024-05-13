import styles from "./New.module.scss";;
import { Link } from "react-router-dom";

const index = (props: any) => {
  return (
    <article className={styles.new}>
      <img
        src={props.img}
        alt="News"
        width={420}
        height={300}
        className={styles.img}
      />
      <h5 className={styles.title}>{props.title}</h5>
      <p className={styles.text}>{props.text}</p>
      <Link to="/" className={styles.link}>
        Читать полностью
      </Link>
    </article>
  );
};

export default index;
