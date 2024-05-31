import styles from './FeatureList.module.scss';

interface Feature {
    img: string;
    text: string;
}

const FeatureList = ({ features }: { features: Feature[] }) => {
    return (
        <ul className={styles.list}>
            {features.map((feature: Feature, index: number) => (
                <li key={index} className={styles.item}>
                    <img src={feature.img} alt="icon" width={40} height={40} className={styles.icon} />
                    <h3 className={styles.text}>{feature.text}</h3>
                </li>
            ))}
        </ul>
    );
};

export default FeatureList;
