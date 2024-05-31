import React, { useState } from 'react';
import styles from './ImageCatalog.module.scss';

interface ImageCatalogProps {
    name: string;
    images: string[];
}

const ImageCatalog: React.FC<ImageCatalogProps> = ({ name, images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const displayedImages = images.slice(0, 3);

    return (
        <div className={styles.imageCatalog}>
            <img
                src={`/Product/${name}/${selectedImage}`}
                alt="Product"
                width={630}
                height={370}
                className={styles.heroImage}
            />
            <ul className={styles.images}>
                {displayedImages.map((imageUrl, index) => (
                    <li key={index} onClick={() => handleImageClick(imageUrl)}>
                        <img
                            src={`/Product/${name}/${imageUrl}`}
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
