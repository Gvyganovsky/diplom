import style from "./Clients.module.scss";
import Title from "../../Title";

const index = () => {
  return (
    <section className={style.clients}>
      <div className={style.container}>
        <Title text="Оказываем услуги!" />
        <div className={style.content}>
          <img
            src="./Clients/Bionovatic.svg"
            alt="Bionovatic"
            width={365}
            height={100}
            className={style.bionovatic}
          />

          <img src="./Clients/Bayer.svg" alt="Bayer" width={100} height={100} className={style.bayer} />

          <img
            src="./Clients/Corteva.svg"
            alt="Corteva"
            width={375}
            height={75}
            className={style.corteva}
          />

          <img src="./Clients/KWS.svg" alt="KWS" width={180} height={180} className={style.kws} />
        </div>
      </div>
    </section>
  );
};

export default index;
