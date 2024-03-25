import styles from "./Filter.module.scss";

const index = () => {
  return (
    <div>
      <ul className={styles.filter}>
        <li className={styles.filter__item}>
          <h3 className={styles.filter__title}>Категории</h3>
        </li>

        <li className={styles.filter__item}>
          <img
            src="./Catalog/iconDrone-1.svg"
            alt="iconDrone"
            width={30}
            height={30}
            className={styles.img}
          />
          <p className={styles.text}>БПЛА Самолетного типа</p>
        </li>

        <li className={styles.filter__item}>
          <img
            src="./Catalog/iconDrone-2.svg"
            alt="iconDrone"
            width={30}
            height={30}
            className={styles.img}
          />
          <p className={styles.text}>БПЛА мультироторного типа</p>
        </li>

        <ul className={styles.second__filter}>
          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconDrone-3.svg"
              alt="iconDrone"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Дроны опрыскиватели</p>
          </li>
          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconDrone-4.svg"
              alt="iconDrone"
              width={30}
              height={30}
              className={styles.img}
            />
            <p>Дроны для картографии</p>
          </li>
        </ul>

        <li className={styles.filter__item}>
          <img
            src="./Catalog/iconDrone-5.svg"
            alt="iconDrone"
            width={30}
            height={30}
            className={styles.img}
          />
          <p className={styles.text}>Полезные нагрузки</p>
        </li>

        <ul className={styles.second__filter}>
          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconDrone-6.svg"
              alt="iconDrone"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Фотокамеры</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconDrone-7.svg"
              alt="iconDrone"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Мультиспектральные камеры</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconThermal.svg"
              alt="iconDrone"
              width={30}
              height={42}
              className={styles.img}
            />
            <p className={styles.text}>
              Гиростабилизированные видеокамеры и тепловизоры
            </p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconSettings.svg"
              alt="iconSettings"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Cпециализированные модули</p>
          </li>
        </ul>

        <li className={styles.filter__item}>
          <img
            src="./Catalog/iconAdapter.svg"
            alt="iconAdapter"
            width={30}
            height={30}
            className={styles.img}
          />
          <p className={styles.text}>Комплектующие</p>
        </li>

        <ul className={styles.second__filter}>
          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconBattery.svg"
              alt="iconBattery"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Батареи</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconIan.svg"
              alt="iconIan"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Зарядные устройства</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconGenerator.svg"
              alt="iconIan"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Генераторы</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconEqualizer.svg"
              alt="iconEqualizer"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Пульты управления</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconMap.svg"
              alt="iconMap"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Высокоточная навигация</p>
          </li>

          <li className={styles.filter__item}>
            <img
              src="./Catalog/iconSettingsdron.svg"
              alt="iconSettingsdron"
              width={30}
              height={30}
              className={styles.img}
            />
            <p className={styles.text}>Привязные системы для коптеров</p>
          </li>
        </ul>

        <li className={styles.filter__item}>
          <img
            src="./Catalog/IconCoding 1.svg"
            alt="IconCoding"
            width={30}
            height={30}
            className={styles.img}
          />
          <p className={styles.text}>Программное обеспечение</p>
        </li>
      </ul>

      <div className={styles.digital}>
        <p className={styles.digital__title}>Производители</p>
        <select className={styles.select} name="" id=""></select>
        <div className={styles.digital__price}>
          <p className={styles.digital__title}>Цена</p>
          <input
            type="text"
            placeholder="От"
            id="from"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="До"
            id="to"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default index;