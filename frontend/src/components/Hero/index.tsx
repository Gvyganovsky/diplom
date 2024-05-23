import ListItems from "../listItems";
import styles from "./Hero.module.scss";

const index = (props: any) => {
  return (
    <div className={styles.hero}>
      <img src="/Background/1.png" alt="Background" width={800} className={styles.imageAdapt} />
      <div className={styles.container}>
        <h1 className={styles.title}>{props.title}</h1>

        {props.text && <p className={styles.text}>{props.text}</p>}

        {props.listItems && <ListItems listItems={props.listItems} />}

        {/* {props.listAltItems && props.listAltItems.length > 0 && (
          <ul className={styles.listAlt}>
            {props.listAltItems.map((item: any, index: any) => (
              <li key={index} className={styles.itemAlt}>
                <img src={item.img} alt="icon" width={40} height={40} className={styles.icon} />
                <h3 className={styles.text}>{item.title}</h3>
              </li>
            ))}
          </ul>
        )}  */}
      </div>
    </div>
  );
};

export default index;
