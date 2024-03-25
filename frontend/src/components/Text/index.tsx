import Title from "../Title";
import styles from "./Text.module.scss";

const index = (props: any) => {
  return (
    <div className={styles.textBlock}>
      <Title text={props.title} />
      <p className={styles.text}>{props.text}</p>
      <div className={styles.lineBlock}>
        <div className={styles.line}></div>
        <img
          src="./bi_arrow-down-circle.svg"
          alt="bi_arrow-down-circle"
          width={50}
          height={50}
          className={styles.img}
        />
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default index;
