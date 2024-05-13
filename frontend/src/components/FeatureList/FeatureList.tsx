import styles from './FeatureList.module.scss';

const FeatureList = ({ features }) => {
    return (
        <ul className={styles.list}>
            {features.map((feature: any, index: any) => (
                <li key={index} className={styles.item}>
                    <img src={feature.img} alt="icon" width={40} height={40} className={styles.icon} />
                    <h3 className={styles.text}>{feature.text}</h3>
                </li>
            ))}
        </ul>
    )
}

export default FeatureList
