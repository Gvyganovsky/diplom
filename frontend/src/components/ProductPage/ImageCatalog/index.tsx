import React, { useState } from 'react';
import styles from './ImageCatalog.module.scss';

interface ImageCatalogProps {
    images: string[];
}

const ImageCatalog: React.FC<ImageCatalogProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    return (
        <div className={styles.imageCatalog}>
            <img
                src={`/Product/${selectedImage}`}
                alt="Product"
                width={630}
                height={370}
                className={styles.heroImage}
            />
            <ul className={styles.images}>
                {images.map((imageUrl, index) => (
                    <li key={index} onClick={() => handleImageClick(imageUrl)}>
                        <img
                            src={`/Product/${imageUrl}`}
                            alt="Product"
                            width={200}
                            height={160}
                            className={styles.image}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageCatalog;
