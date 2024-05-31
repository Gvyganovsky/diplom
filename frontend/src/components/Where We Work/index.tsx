import Title from "../Title";
import style from "./Where We Work.module.scss";
import { places } from "../../Data";

const index = () => {
  return (
    <div className={style.whereWeWork}>
      <img
        src="./Where We Work.png"
        alt="Where We Work"
        width={1000}
        height={1100}
        className={style.img}
      />
      <div className={style.container}>
        <Title text="Где мы работаем" />
        <ul className={style.list}>
          {places.map((place, index) => (
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
