import styles from "./News.module.scss";
import newsData from './newsData';
import New from '../New';
import Title from "../../Title";

const index = () => {
  return (
    <div className={styles.news}>
      <Title text="Что у нас нового" />
      <ul className={styles.content}>
        {newsData.map((newsData, index) => (
          <New key={index} {...newsData} />
        ))}
      </ul>
    </div>
  );
};

export default index;
