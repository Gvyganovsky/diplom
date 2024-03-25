import stylesApplic from "./Applications.module.scss";
import stylesApp from "../../../App.module.scss";
import { ButtonGreen } from "../../Buttons";

const index = () => {
  return (
    <section className={stylesApplic.applications}>
      <div className={stylesApp.container}>
        <h2 className={stylesApplic.title}>Оказываем услуги!</h2>
        <p className={stylesApplic.text}>
          Принимаем заявки по биологической и химической защите растений
          дронами, картографии и мониторингу.
        </p>
        <ButtonGreen title="Оставить заявку" />
      </div>
    </section>
  );
};

export default index;
