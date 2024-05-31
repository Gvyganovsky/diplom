import styles from "./Trust.module.scss";
import Info from "../Info/index.tsx";
import Title from "../Title";

const index = (props:any) => {
  return (
    <div className={styles.trust}>
      <Title text={props.title} />
      <div className={styles.content}>
        {props.data.map((data: any, index: any) => (
          <Info key={index} {...data} />
        ))}
        <img
          src="/Trust/iconDron.svg"
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
