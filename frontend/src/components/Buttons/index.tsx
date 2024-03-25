import styles from "./Button.module.scss";

export const ButtonGreen = (props: any) => {
  return <button type="button" className={styles.button}>{props.title}</button>;
};

export const ButtonAlt = (props: any) => {
  return (
    <button type="button" className={`${styles.button} ${styles.buttonAlt}`}>
      {props.title}
    </button>
  );
};

export const ButtonWhite = (props: any) => {
  return (
    <button type="button" className={`${styles.button} ${styles.buttonWhite}`}>
      {props.title}
    </button>
  );
};
