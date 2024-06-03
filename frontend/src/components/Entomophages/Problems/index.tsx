import Title from "../../Title";
import style from "./Problems.module.scss";
import { problems } from "../../../Data";

const Index = () => {
  return (
    <div className={style.problems}>
      <Title text="Проблемы, кторые мы решаем" />
      <ul className={style.list}>
        {problems.map((problem, index) => (
          <li key={index} className={style.item}>
            <span className={style.number}>{index + 1}</span>
            <p className={style.text}>{problem}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
