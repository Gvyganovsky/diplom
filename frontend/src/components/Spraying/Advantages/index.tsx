import style from './Advantages.module.scss';

interface AdvantagesProps {
    image: string;
    title: string;
    data: string[];
}

const Advantages: React.FC<AdvantagesProps> = (props) => {
    return (
        <div className={style.block}>
            <div className={style.header}>
                <img src={props.image} alt={props.title} width={40} height={40} className={style.image} />
                <p className={style.title}>{props.title}</p>
            </div>
            <ul className={style.list}>
                {props.data.map((item: string, index: number) => (
                    <li key={index} className={style.item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Advantages;
