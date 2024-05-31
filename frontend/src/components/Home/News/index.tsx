import style from "./News.module.scss";
import { newsData } from "../../../Data";
import New from "../New";
import Title from "../../Title";

const index = () => {
  return (
    <div className={style.news}>
      <Title text="Что у нас нового" />
      <ul className={style.content}>
        {newsData.map((newsData, index) => (
          <New key={index} {...newsData} />
        ))}
      </ul>
    </div>
  );
};

export default index;
