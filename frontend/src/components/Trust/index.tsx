import styles from "./Trust.module.scss";
import trustData from "./trustData.tsx";
import Info from "../Info/index.tsx";
import Title from "../Title";

const index = () => {
  return (
    <div className={styles.trust}>
      <Title text="Почему нам доверяют?" />
      <div className={styles.content}>
        {trustData.map((trustData, index) => (
          <Info key={index} {...trustData} />
        ))}
        <img
          src="./Trust/iconDron.svg"
          alt=""
          width={265}
          height={265}
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default index;
