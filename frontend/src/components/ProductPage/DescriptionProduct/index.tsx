import styles from './DescriptionProduct.module.scss';

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
                alt="Drone"
                width={1300}
                height={520}
                className={styles.image}
            />
        </div>
    );
};

export default index;
