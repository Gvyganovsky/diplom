<<<<<<< HEAD
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
=======
import { useState } from "react";
import styles from "./AreasOfApplication.module.scss";
import Title from "../../Title";

const Index = () => {
  const items = [
    {
      text: "Сельское хозяйство",
      image: "/Areas/Agricultural industry.svg",
      description:
        "Инвентаризация сельхозугодий, состояние посевов и всхожести, развитие заболеваний, количество растений при рядной посадке, зарастание сорняками, состояние переувлажненных или засушливых участков полей, расчет NDVI и других индексов. Мониторинг техники, сопровождение агротехнических мероприятий.",
      imageSrc: "./Areas/Agricultural industry.jpg",
    },
    {
      text: "Лесное хозяйство",
      image: "/Areas/Forestry.svg",
      description:
        "Мониторинг состояния лесов, оценка биоразнообразия, выявление повреждений от вредителей и болезней, анализ лесопосадок, определение запасов древесины, мониторинг лесных пожаров и их последствий, планирование лесовосстановительных мероприятий.",
      imageSrc: "./Areas/Forestry.jpg",
>>>>>>> master
    },
    {
      text: "Геодезия",
      image: "./Areas/Geodesy.svg",
<<<<<<< HEAD
=======
      description:
        "Топографическая съемка, создание цифровых карт и моделей местности, мониторинг земной поверхности и деформаций, проведение кадастровых работ, анализ данных для проектирования и строительства, контроль за изменениями в ландшафте.",
      imageSrc: "./Areas/Geodesy.jpg",
>>>>>>> master
    },
    {
      text: "Энергетика",
      image: "./Areas/Energy industry.svg",
<<<<<<< HEAD
=======
      description:
        "Обследование линий электропередач, мониторинг состояния оборудования, анализ местоположения и состояния возобновляемых источников энергии, оптимизация размещения солнечных и ветровых станций, оценка воздействия на окружающую среду.",
      imageSrc: "./Areas/Energy industry.jpg",
>>>>>>> master
    },
    {
      text: "Строительство",
      image: "./Areas/Construction.svg",
<<<<<<< HEAD
=======
      description:
        "Планирование и контроль строительных работ, создание 3D моделей зданий и сооружений, мониторинг прогресса строительства, оценка состояния объектов инфраструктуры, контроль за соблюдением строительных норм и стандартов, использование дронов для инспекции труднодоступных мест.",
      imageSrc: "./Areas/Construction.jpg",
>>>>>>> master
    },
    {
      text: "Градостроительство",
      image: "./Areas/Urban planning.svg",
<<<<<<< HEAD
=======
      description:
        "Разработка генеральных планов, мониторинг развития городских территорий, оценка инфраструктурных потребностей, анализ плотности застройки, создание цифровых моделей городов, планирование транспортных сетей, изучение воздействия на окружающую среду.",
      imageSrc: "./Areas/Urban planning.jpg",
>>>>>>> master
    },
    {
      text: "Маркшейдерия",
      image: "./Areas/Surveying.svg",
<<<<<<< HEAD
=======
      description:
        "Мониторинг горных выработок, контроль за состоянием шахт и карьеров, создание топографических планов и карт подземных коммуникаций, обеспечение безопасности горных работ, анализ геологических данных для разработки месторождений, контроль за деформациями земной поверхности.",
      imageSrc: "./Areas/Surveying.jpg",
>>>>>>> master
    },
    {
      text: "Тепловизионная съемка",
      image: "./Areas/Thermal imaging.svg",
<<<<<<< HEAD
    },
  ];

=======
      description:
        "Обследование тепловых потерь зданий, контроль за состоянием электрического и механического оборудования, выявление дефектов в системах отопления и вентиляции, анализ состояния сельскохозяйственных угодий, использование тепловизоров для поисково-спасательных операций, мониторинг животных в дикой природе.",
      imageSrc: "./Areas/Thermal imaging.jpg",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);

>>>>>>> master
  return (
    <div className={styles.AreasOfApplication}>
      <Title text="Области применения" />
      <div className={styles.content}>
        <ul className={styles.list}>
          <img src="./iconLine.svg" alt="background" width={1000} height={900} className={styles.background} />
          {items.map((item, index) => (
<<<<<<< HEAD
            <li key={index} className={styles.item}>
              <img src={item.image} alt={item.text} width={40} height={40} className={styles.icon} />
              <p className={styles.title}>{item.text}</p>
=======
            <li
              key={index}
              className={styles.item}
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={item.text} width={40} height={40} className={styles.icon} />
              <p className={`${styles.title} ${item.text === selectedItem.text ? styles.selected : ''}`}>
                {item.text}
              </p>
>>>>>>> master
            </li>
          ))}
        </ul>
        <div>
          <p className={styles.text}>
<<<<<<< HEAD
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
=======
            {selectedItem.description}
          </p>
          <img
            src={selectedItem.imageSrc}
            alt={selectedItem.text}
            className={styles.img}
            width={750}
            height={430}
>>>>>>> master
          />
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default index;
=======
export default Index;
>>>>>>> master
