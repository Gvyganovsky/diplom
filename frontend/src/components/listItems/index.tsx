import styles from './listItems.module.scss';

const index = (props: any) => {
    return (
        <>
            <div className={styles.imageBlock}>
                <img
                    src="/iconDrone_flying.svg"
                    alt="Drone flying"
                    height={120}
                    className={styles.image}
                />
            </div>
            <ul className={styles.list}>
                {props.listItems.map((item: any, index: any) => (
                    <li key={index} className={styles.item}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.text}>{item.text}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default index
