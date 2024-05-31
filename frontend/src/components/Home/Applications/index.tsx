import style from "./Applications.module.scss";
import Button from "../../Button";

const index = () => {
  return (
    <div className={style.applications}>
      <div className={style.container}>
        <h2 className={style.title}>Оказываем услуги!</h2>
        <p className={style.text}>
          Принимаем заявки по биологической и химической защите растений
          дронами, картографии и мониторингу.
        </p>
        <Button title="Оставить заявку" className="ButtonGreen" />
      </div>
    </div>
  );
};

export default index;
