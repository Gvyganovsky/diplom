import Title from "../Title";
import styles from "./Post.module.scss";

const index = (props: any) => {
  return (
    <div className={styles.post}>
      <Title text={props.title} />
      <p className={styles.text}>{props.text}</p>

      <div className={styles.content}>
        <img src={props.img} alt="enemy" width={550} height={460} className={styles.img} />
        <div className={styles.textBlock}>
          <p className={styles.description}>{props.description1}</p>
          <p className={styles.description}>{props.description2}</p>
          <p className={styles.description}>{props.description3}</p>
          <div>
            <img src="" alt="" />
            <p>{props.enemy}</p>
            <ul>фыв</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
