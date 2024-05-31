import stylesClients from "./Clients.module.scss";
import stylesApp from "../../../App.module.scss";

const index = () => {
  return (
    <section className={stylesClients.clients}>
      <div className={stylesApp.container}>
        <h2 className={stylesApp.title}>Оказываем услуги!</h2>
        <div className={stylesClients.content}>
          <img
            src="./Clients/Bionovatic.svg"
            alt="Bionovatic"
            width={365}
            height={100}
            className={stylesClients.bionovatic}
          />

          <img src="./Clients/Bayer.svg" alt="Bayer" width={100} height={100} className={stylesClients.bayer} />

          <img
            src="./Clients/Corteva.svg"
            alt="Corteva"
            width={375}
            height={75}
            className={stylesClients.corteva}
          />

          <img src="./Clients/KWS.svg" alt="KWS" width={180} height={180} className={stylesClients.kws} />
        </div>
      </div>
    </section>
  );
};

export default index;
