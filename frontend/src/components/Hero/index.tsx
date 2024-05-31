import ListAltItems from "../ListAltItems";
import ListItems from "../listItems";
import styles from "./Hero.module.scss";

const index = (props: any) => {
  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${props.Background})` }}>
      <img src={props.imageAdapt} alt="Background" width={800} className={styles.imageAdapt} />
      <div className={styles.container}>
        <h1 className={styles.title}>{props.title}</h1>

        {props.text && <p className={styles.text}>{props.text}</p>}

        {props.listItems && <ListItems listItems={props.listItems} />}

        {props.listAltItems && <ListAltItems listItem={props.listAltItems} />}
      </div>
    </div >
  );
};

export default index;
