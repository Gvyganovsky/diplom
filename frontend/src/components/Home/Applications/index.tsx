import styles from "./Applications.module.scss";
import { ButtonGreen } from "../../Button";

const index = () => {
  return (
    <div className={styles.applications}>
      <div className={styles.container}>
        <h2 className={styles.title}>Оказываем услуги!</h2>
        <p className={styles.text}>
          Принимаем заявки по биологической и химической защите растений
          дронами, картографии и мониторингу.
        </p>
        <ButtonGreen title="Оставить заявку" />
      </div>
    </div>
  );
};

export default index;
