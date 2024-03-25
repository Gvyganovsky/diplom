import stylesOurOffers from "./OurOffers.module.scss";
import stylesApp from "../../../App.module.scss";
import Product from "../../Product/index.tsx";
import OurOffersData from "./OurOffersData.tsx";

const index = () => {
  return (
    <section className={stylesOurOffers.ourOffers}>
      <div className={stylesApp.container}>
        <h2 className={stylesApp.title}>Наши предложения</h2>
        <div className={stylesOurOffers.content}>
          <p className={stylesOurOffers.favorite}>ТОП ПРОДАЖ</p>
          {OurOffersData.map((OurOffersData, index) => (
            <Product key={index} {...OurOffersData} />
          ))}
          <img
            src="./iconLine.svg"
            alt="Line"
            width={660}
            height={540}
            className={stylesOurOffers.img}
          />
        </div>
      </div>
    </section>
  );
};

export default index;
