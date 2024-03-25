import styles from "./Info.module.scss";

const index = (props: any) => {
  return (
    <article className={styles.info}>
      <div className={styles.content}>
        <img
          src={props.img}
          alt="info"
          width={40}
          height={40}
          className={styles.info__img}
        />

        <h5 className={styles.info__title}>{props.title}</h5>
        <p className={styles.info__text}>{props.text}</p>
      </div>
    </article>
  );
};

export default index;
