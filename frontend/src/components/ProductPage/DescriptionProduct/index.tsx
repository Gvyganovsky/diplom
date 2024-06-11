import style from './DescriptionProduct.module.scss';

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
}

const index = ({ product }: { product: Product }) => {
    const images = JSON.parse(product.image);
    const lastImage = images[images.length - 1];

    return (
        <div className={style.description}>
            <h2 className={style.title}>{product.name}</h2>
            <p className={style.text}>{product.description}</p>
            <img
                src={`/backend/api/uploads/products/${product.id}/${lastImage}`}
                alt="Drone"
                width={1300}
                height={520}
                className={style.image}
            />
        </div>
    );
};

export default index;
