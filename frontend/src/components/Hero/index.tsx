import styles from "./Hero.module.scss";

const index = (props: any) => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.backgroundImage}), url("./Vector.png")`,
      }}
      className={styles.hero}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>{props.title}</h1>

        {props.imageSrc && (
          <img
            src={props.imageSrc}
            alt="Drone flying"
            className={styles.img}
            height={120}
          />
        )}

        {props.text && <p className={styles.textInfo}>{props.text}</p>}

        {props.listItems && props.listItems.length > 0 && (
          <ul className={styles.list}>
            {props.listItems.map((item: any, index: any) => (
              <li key={index} className={styles.item}>
                <h3 className={styles.item__title}>{item.title}</h3>
                <p className={styles.item__text}>{item.text}</p>
              </li>
            ))}
          </ul>
        )}

        {props.listAltItems && props.listAltItems.length > 0 && (
          <ul className={styles.listAlt}>
            {props.listAltItems.map((item: any, index: any) => (
              <li key={index} className={styles.itemAlt}>
                <img src={item.img} alt="icon" width={40} height={40} className={styles.icon} />
                <h3 className={styles.text}>{item.title}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default index;
