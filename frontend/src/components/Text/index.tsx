import style from "./Text.module.scss";
import { useState } from "react";
import Title from "../Title";

const index = (props: any) => {
  const [textVisible, setTextVisible] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const showSecondText = () => {
    setTextVisible((prevTextVisible) => !prevTextVisible);
    setIsRotated((prevIsRotated) => !prevIsRotated);
  };

  return (
    <div className={style.textBlock}>
      <Title text={props.title} />
      <p className={`${style.text} ${textVisible ? style.visible : ""}`}>
        {props.textFirst}
        {textVisible && <span>{props.textSecond}</span>}
      </p>
      <div className={style.lineBlock}>
        <div className={style.line}></div>
        <img
          src="./bi_arrow-down-circle.svg"
          alt="bi_arrow-down-circle"
          width={50}
          height={50}
          className={`${style.img} ${isRotated ? style.rotated : ""}`}
          onClick={showSecondText}
        />
        <div className={style.line}></div>
      </div>
    </div>
  );
};


export default index;
