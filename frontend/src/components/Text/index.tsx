import React from "react";
import Title from "../Title";
import styles from "./Text.module.scss";

const index = (props: any) => {
  const [textVisible, setTextVisible] = React.useState(false);

  const showSecondText = () => {
    setTextVisible((prevTextVisible) => !prevTextVisible);
  }

  return (
    <div className={styles.textBlock}>
      <Title text={props.title} />
      <p className={styles.text}>{props.textFirst}
        {textVisible && <span>{props.textSecond}</span>}
      </p>
      <div className={styles.lineBlock}>
        <div className={styles.line}></div>
        <img
          src="./bi_arrow-down-circle.svg"
          alt="bi_arrow-down-circle"
          width={50}
          height={50}
          className={styles.img}
          onClick={showSecondText}
        />
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default index;
