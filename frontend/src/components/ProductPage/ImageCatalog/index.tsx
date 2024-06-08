import { useState } from 'react';
import style from './ImageCatalog.module.scss';

interface ImageCatalogProps {
    id: string;
    images: string[];
}

const ImageCatalog: React.FC<ImageCatalogProps> = ({ id, images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(images[0] || '');

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    if (images.length === 0) {
        return <div className={style.noImages}>Нет доступных изображений</div>;
    }

    const displayedImages = images.slice(0, 3);

    return (
        <div className={style.imageCatalog}>
            {selectedImage && (
                <img
                    src={`/backend/api/uploads/products/${id}/${selectedImage}`}
                    alt="Product"
                    width={630}
                    height={370}
                    className={style.heroImage}
                />
            )}
            <ul className={style.images}>
                {displayedImages.map((imageUrl, index) => (
                    <li key={index} onClick={() => handleImageClick(imageUrl)}>
                        <img
                            src={`/backend/api/uploads/products/${id}/${imageUrl}`}
                            alt="Product"
                            width={200}
                            height={160}
                            className={style.image}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageCatalog;
