import Breadcrumbs from "../../components/Breadcrumbs";
import Title from "../../components/Title";
import style from "./News.module.scss";
import newsData from "./newsData";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className={style.container}>
      <Breadcrumbs title="Новости" />
      <Title text="Что у нас нового?" />
      <ul className={style.content}>
        {newsData.map((newsData, index) => (
          <li className={style.news} key={index}>
            <img
              src={newsData.img}
              alt="News"
              width={500}
              height={320}
              className={style.img}
            />
            <div>
              <h2 className={style.title}>{newsData.title}</h2>
              <p className={style.text}>{newsData.text}</p>
              <Link to="/" className={style.link}>
                Читать полностью
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default index;
