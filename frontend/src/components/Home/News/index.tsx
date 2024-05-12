import styles from "./News.module.scss";
import newsData from './newsData';
import New from '../New';
import Title from "../../Title";

const index = () => {
  return (
    <section>
      <div className={styles.container}>
        <Title text="Что у нас нового" />
        <ul className={styles.content}>
          {newsData.map((newsData, index) => (
            <New key={index} {...newsData} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default index;
