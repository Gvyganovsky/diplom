import styles from './ListAltItems.module.scss';

const index = (props: any) => {
    return (
        <ul className={styles.listAlt}>
            {props.listItem.map((item: any, index: any) => (
                <li key={index} className={styles.itemAlt}>
                    <img src={item.img} alt="icon" width={40} height={40} className={styles.icon} />
                    <h3 className={styles.text}>{item.title}</h3>
                </li>
            ))}
        </ul>
    )
}

export default index
