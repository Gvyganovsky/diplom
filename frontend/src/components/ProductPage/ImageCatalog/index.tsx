import React, { useState } from 'react';
import styles from './ImageCatalog.module.scss';

interface ImageCatalogProps {
<<<<<<< HEAD
    images: string[];
}

const ImageCatalog: React.FC<ImageCatalogProps> = ({ images }) => {
=======
    name: string;
    images: string[];
}

const ImageCatalog: React.FC<ImageCatalogProps> = ({ name, images }) => {
>>>>>>> master
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

<<<<<<< HEAD
    return (
        <div className={styles.imageCatalog}>
            <img
                src={`/Product/${selectedImage}`}
=======
    // Ограничиваем количество отображаемых изображений до максимум 3
    const displayedImages = images.slice(0, 3);

    return (
        <div className={styles.imageCatalog}>
            <img
                src={`/Product/${name}/${selectedImage}`}
>>>>>>> master
                alt="Product"
                width={630}
                height={370}
                className={styles.heroImage}
            />
            <ul className={styles.images}>
<<<<<<< HEAD
                {images.map((imageUrl, index) => (
                    <li key={index} onClick={() => handleImageClick(imageUrl)}>
                        <img
                            src={`/Product/${imageUrl}`}
=======
                {displayedImages.map((imageUrl, index) => (
                    <li key={index} onClick={() => handleImageClick(imageUrl)}>
                        <img
                            src={`/Product/${name}/${imageUrl}`}
>>>>>>> master
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
