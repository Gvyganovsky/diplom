import style from './FeatureList.module.scss';

interface Feature {
    img: string;
    text: string;
}

const FeatureList = ({ features }: { features: Feature[] }) => {
    return (
        <ul className={style.list}>
            {features.map((feature: Feature, index: number) => (
                <li key={index} className={style.item}>
                    <img src={feature.img} alt="icon" width={40} height={40} className={style.icon} />
                    <h3 className={style.text}>{feature.text}</h3>
                </li>
            ))}
        </ul>
    );
};

export default FeatureList;
