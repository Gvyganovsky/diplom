import styles from './DescriptionProduct.module.scss';

interface descriptionProps {
    title: string;
    text: string;
    image: string;
}

const index: React.FC<descriptionProps> = ({ title, text, image }) => {
    return (
        <div className={styles.description}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <img
                src={`/Product/${image}`}
                alt="Drone"
                width={1300}
                height={520}
                className={styles.image}
            />
        </div>
    )
}

export default index
