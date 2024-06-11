import style from "./Where We Work.module.scss";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { places } from "../../../Data";
import Title from "../../Title";

const index = () => {
  return (
    <div className={style.whereWeWork}>
      <img
        src="./Where We Work.png"
        alt="Where We Work"
        width={1000}
        height={1100}
        className={style.image}
      />
      <div className={style.container}>
        <Title text="Где мы работаем" />
        <ul className={style.list}>
          {places.map((place: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
            <li key={index} className={style.item}>
              {place}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default index;
