import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Title from "../../components/Title";
import style from "./News.module.scss";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

interface NewsItem {
  id: number;
  title: string;
  img: string;
  text: string;
}

const index = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const newsPerPage = 4;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://dp-viganovsky.xn--80ahdri7a.site/api/news");
        if (response.ok) {
          const data: NewsItem[] = await response.json();
          setNews(data);
          setIsLoading(false);
        } else {
          throw new Error("Ошибка загрузки данных");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className={style.loading}>
        <MoonLoader color="#5A9CEC" size={100} />
      </div>
    );
  }

  const truncateText = (text: string, maxSentences: number) => {
    const sentences = text.split(/[.!?]/).filter(Boolean); 
    const truncatedText = sentences.slice(0, maxSentences).join(". "); 
    return truncatedText;
  };

  return (
    <div className={style.container}>
      <Breadcrumbs title="Новости" />
      <Title text="Что у нас нового?" />
      <ul className={style.content}>
        {currentNews.map((newsItem, index) => (
          <li className={style.news} key={index}>
            <img
              src={`/backend/api/uploads/news/${newsItem.img}`}
              alt="News"
              width={460}
              height={300}
              className={style.img}
            />
            <div>
              <h2 className={style.title}>{newsItem.title}</h2>
              <p className={style.text}>{truncateText(newsItem.text, 2)}</p>
              <Link to={`/news/${newsItem.id}`} className={style.link}>
                Читать полностью
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className={style.pagination}>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className={style.pageItem}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default index;
