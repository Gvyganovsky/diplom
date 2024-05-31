import styles from './DescriptionProduct.module.scss';

<<<<<<< HEAD
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
=======
interface Product {
    name: string;
    description: string;
    image: string;
}

const index = ({ product }: { product: Product }) => {
    const images = JSON.parse(product.image);
    const lastImage = images[images.length - 1];

    return (
        <div className={styles.description}>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.text}>{product.description}</p>
            <img
                src={`/Product/${product.name}/${lastImage}`}
>>>>>>> master
                alt="Drone"
                width={1300}
                height={520}
                className={styles.image}
            />
        </div>
<<<<<<< HEAD
    )
}

export default index
=======
    );
};

export default index;
>>>>>>> master
