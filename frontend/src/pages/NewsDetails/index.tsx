import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './NewsDetails.module.scss';
import { MoonLoader } from 'react-spinners';

const NewsDetails = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/news/${id}`)
            .then(response => response.json())
            .then(data => {
                setNewsItem(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке новости:', error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className={style.loading}>
                <MoonLoader color="#5A9CEC" size={100} />
            </div>
        );
    }

    if (!newsItem) {
        return <div>No news found</div>;
    }

    return (
        <div className={style.container}>
            <div className={style.newsDetails}>
                <h2 className={style.title}>{newsItem.title}</h2>
                <img src={`/backend/api/uploads/news/${newsItem.img}`} alt="News" className={style.image} />
                <p className={style.text}>{newsItem.text}</p>
            </div>
        </div>
    );
};

export default NewsDetails;
