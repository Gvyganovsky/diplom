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
        <>
            <img src={`/Product/${selectedImage}`} alt="Product" />
            <ul className={styles.imageCatalog}>
                {images.map((imageUrl, index) => (
                    <li key={index} onClick={() => handleImageClick(imageUrl)}>
                        <img src={`/Product/${imageUrl}`} alt="Product" />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ImageCatalog;
