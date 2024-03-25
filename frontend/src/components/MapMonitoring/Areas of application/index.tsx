import styles from "./AreasOfApplication.module.scss";
import Title from "../../Title";

const index = () => {
  const items = [
    {
      text: "Сельское хозяйство",
      image: "./Areas/Agricultural industry.svg",
    },
    {
      text: "Лесное хозяйство",
      image: "./Areas/Forestry.svg",
    },
    {
      text: "Геодезия",
      image: "./Areas/Geodesy.svg",
    },
    {
      text: "Энергетика",
      image: "./Areas/Energy industry.svg",
    },
    {
      text: "Строительство",
      image: "./Areas/Construction.svg",
    },
    {
      text: "Градостроительство",
      image: "./Areas/Urban planning.svg",
    },
    {
      text: "Маркшейдерия",
      image: "./Areas/Surveying.svg",
    },
    {
      text: "Тепловизионная съемка",
      image: "./Areas/Thermal imaging.svg",
    },
  ];

  return (
    <div className={styles.AreasOfApplication}>
      <Title text="Области применения" />
      <div className={styles.content}>
        <ul className={styles.list}>
          <img src="./iconLine.svg" alt="background" width={1000} height={900} className={styles.background} />
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <img src={item.image} alt={item.text} width={40} height={40} className={styles.icon} />
              <p className={styles.title}>{item.text}</p>
            </li>
          ))}
        </ul>
        <div>
          <p className={styles.text}>
            Инвентаризация сельхозугодий, состояние посевов и всхожести,
            развития заболеваний, количества растений при рядной посадке,
            зарастания сорняками, состояния переувлажненных или засушливых
            участков полей, расчет NDVI и других индексов. Мониторинг техники,
            сопровождение агротехнических мероприятий
          </p>
          <img
            src="./Areas of application.jpg"
            alt="Areas of application"
            width={750}
            height={450}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
