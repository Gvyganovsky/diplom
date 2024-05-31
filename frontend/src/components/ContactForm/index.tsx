<<<<<<< HEAD
import stylesApp from "../../App.module.scss";
import styles from "./ContactForm.module.scss";
import Button from "../Button";

const index = () => {
  return (
    <div className={styles.contactForm}>
      <div className={styles.content}>
        <h2 className={stylesApp.title}>Напишите нам</h2>
=======
import styles from "./ContactForm.module.scss";
import Button from "../Button";
import Title from "../Title";

const ContactForm = () => {
  return (
    <div className={styles.contactForm}>
      <div className={styles.content}>
        <Title text="Напишите нам" />
>>>>>>> master
        <p className={styles.text}>
          Заполните форму и мы за 5 минут подскажем вам лучшие способы защиты
          вашего урожая
        </p>
        <form action="/submit" method="post" className={styles.form}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ваше имя"
            className={styles.input}
<<<<<<< HEAD
=======
            required
>>>>>>> master
          />
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Ваш телефон"
            className={styles.input}
<<<<<<< HEAD
          />
          <input
            type="text"
=======
            required
          />
          <input
            type="email"
>>>>>>> master
            id="email"
            name="email"
            placeholder="Ваш Email"
            className={styles.input}
<<<<<<< HEAD
          />

          <Button title="Отправить" className="ButtonGreen" />
        </form>
        <img src="./image_Drone.png" alt="Drone" width={525} height={350} className={styles.img}/>
        {/* <img src="./iconLine.svg" alt="Line" /> */}
=======
            required
          />
          <Button title="Отправить" className={styles.buttonGreen} />
        </form>
        <img
          src="./image_Drone.png"
          alt="Drone"
          width={525}
          height={350}
          className={styles.img}
        />
>>>>>>> master
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default index;
=======
export default ContactForm;
>>>>>>> master
