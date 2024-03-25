import stylesNews from "./News.module.scss";
import stylesApp from "../../../App.module.scss";
import newsData from './newsData';
import New from '../New';

const index = () => {
  return (
    <section>
      <div className={stylesApp.container}>
        <h2 className={stylesApp.title}>Что у нас нового</h2>
        <ul className={stylesNews.content}>
          {newsData.map((newsData, index) => (
            <New key={index} {...newsData} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default index;
