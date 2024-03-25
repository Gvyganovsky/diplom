import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const index = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.logoBlock}>
        <li className={styles.logo_item}>
          <img
            src="../../../public/logo.svg"
            alt="logo"
            width={70}
            height={70}
            className={styles.logo}
          />
        </li>
        <li className={styles.phone}>+7(861)-217-91-18</li>
      </ul>

      <ul className={styles.socialNetwork}>
        <li className={styles.socialNetwork__icon}>
          <img
            src="../../../public/iconVk.svg"
            alt="Vk"
            width={33}
            height={33}
            className={styles.socialNetwork__img}
          />
        </li>
        <li className={styles.socialNetwork__icon}>
          <img
            src="../../../public/iconInstagram.svg"
            alt="Instagram"
            width={33}
            height={33}
            className={styles.socialNetwork__img}
          />
        </li>
        <li className={styles.socialNetwork__icon}>
          <img
            src="../../../public/iconTikTok.svg"
            alt="TikTok"
            width={33}
            height={33}
            className={styles.socialNetwork__img}
          />
        </li>
      </ul>

      <ul className={styles.langBlock}>
        <li className={styles.lang__text}>EN</li>
        <li className={styles.lang__text}>RU</li>
      </ul>

      <ul className={styles.nav}>
        <li className={styles.nav__item}>
          <img
            src="../../../public/iconBasket.svg"
            alt="Basket"
            width={33}
            height={33}
            className={styles.nav__img}
          />
        </li>
        <li className={styles.nav__item}>
          <img
            src="../../../public/iconMenu.svg"
            alt="Menu"
            width={33}
            height={33}
            className={styles.nav__img}
          />
          <ul className={styles.menu}>
            <li className={styles.menu__item}>
              <Link to="/" className={styles.menu__link}>
                <img
                  src="../../../public/IconHome-outlined.svg"
                  alt="Home"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Главная</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/Entomophages" className={styles.menu__link}>
                <img
                  src="../../../public/IconInsects-outlined.svg"
                  alt="Insects"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Энтомофаги</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/Spraying" className={styles.menu__link}>
                <img
                  src="../../../public/iconDrone-outlined.svg"
                  alt="Drone"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Опрыскивание</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/MapMonitoring" className={styles.menu__link}>
                <img
                  src="../../../public/IconMap-outlined.svg"
                  alt="Map"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Картография и мониторинг</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/Catalog" className={styles.menu__link}>
                <img
                  src="../../../public/IconCatalog-outlined.svg"
                  alt="Catalog"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Каталог продукции</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/News" className={styles.menu__link}>
                <img
                  src="../../../public/IconNews-outlined.svg"
                  alt="News"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Новости</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/AboutUs" className={styles.menu__link}>
                <img
                  src="../../../public/IconCompany-outlined.svg"
                  alt="Company"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>О компании</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link to="/Contact" className={styles.menu__link}>
                <img
                  src="../../../public/iconPhone-outlined.svg"
                  alt="Company"
                  width={40}
                  height={40}
                  className={styles.menu__img}
                />
                <p className={styles.menu__text}>Контакты</p>
              </Link>
            </li>
            <li className={styles.menu__item}>
              <img
                src="../../../public/iconWhatsapp.svg"
                alt="Whatsapp"
                className={styles.menu__icon}
                width={30}
                height={30}
              />
              <img
                src="../../../public/iconTelegram.svg"
                alt="Telegram"
                className={styles.menu__icon}
                width={30}
                height={30}
              />
              <img
                src="../../../public/iconWechat.svg"
                alt="Wechat"
                className={styles.menu__icon}
                width={30}
                height={30}
              />
            </li>
          </ul>
        </li>
        <li className={`${styles.nav__item} ${styles.nav__item_phone}`}>
          <img
            src="../../../public/iconPhone.svg"
            alt="Menu"
            width={33}
            height={33}
            className={styles.nav__img}
          />
        </li>
      </ul>
    </header>
  );
};

export default index;
