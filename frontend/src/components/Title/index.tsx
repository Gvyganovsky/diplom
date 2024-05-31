import styles from "./Title.module.scss";

const index = (props: any) => {
  return <h2 className={styles.title}>{props.text}</h2>;
};

export default index;
