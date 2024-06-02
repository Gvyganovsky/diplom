import style from "./ContactForm.module.scss";
import Button from "../Button";
import Title from "../Title";

const ContactForm = () => {
  return (
    <div className={style.contactForm}>
      <div className={style.content}>
        <Title text="Напишите нам" />
        <p className={style.text}>
          Заполните форму и мы за 5 минут подскажем вам лучшие способы защиты
          вашего урожая
        </p>
        <form action="/submit" method="post" className={style.form}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ваше имя"
            className={style.input}
            required
          />
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Ваш телефон"
            className={style.input}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ваш Email"
            className={style.input}
            required
          />
          <Button title="Отправить" className={style.buttonGreen} />
        </form>
        <img
          src="./image_Drone.png"
          alt="Drone"
          width={525}
          height={350}
          className={style.img}
        />
      </div>
    </div>
  );
};

export default ContactForm;
