import React from 'react';
import styles from './Advantages.module.scss';

interface AdvantagesProps {
    image: string;
    title: string;
    data: string[];
}

const Advantages: React.FC<AdvantagesProps> = (props) => {
    return (
        <div className={styles.block}>
            <div className={styles.header}>
                <img src={props.image} alt={props.title} width={40} height={40} className={styles.image} />
                <p className={styles.title}>{props.title}</p>
            </div>
            <ul className={styles.list}>
                {props.data.map((item: string, index: number) => (
                    <li key={index} className={styles.item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Advantages;
