import Breadcrumbs from "../../components/Breadcrumbs";
import styleApp from "../../App.module.scss";
import styleNews from "./News.module.scss";
import newsData from "./newsData";
import HorizNews from '../../components/HorizNews';

const index = () => {
  return (
    <section>
      <div className={styleApp.container}>
        <Breadcrumbs title="Новости" />
        <h1 className={styleApp.title}>Что у нас нового?</h1>
        <ul className={styleNews.content}>
          {newsData.map((newsData, index) => (
            <HorizNews key={index} {...newsData} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default index;
