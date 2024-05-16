import styles from "./Header.module.scss";
import SocialIcons from "./SocialIcons";
import LogoBlock from "./LogoBlock";
import HeaderDropdown from "./HeaderDropdown";

const HeaderDropDownNav = [
  {
    link: "/",
    image: "IconHome-outlined.svg",
    text: "Главная"
  },
  {
    link: "/Entomophages",
    image: "IconInsects-outlined.svg",
    text: "Энтомофаги"
  },
  {
    link: "/Spraying",
    image: "iconDrone-outlined.svg",
    text: "Опрыскивание"
  },
  {
    link: "/MapMonitoring",
    image: "IconMap-outlined.svg",
    text: "Картография и мониторинг"
  },
  {
    link: "/Catalog",
    image: "IconCatalog-outlined.svg",
    text: "Каталог продукции"
  },
  {
    link: "/News",
    image: "IconNews-outlined.svg",
    text: "Новости"
  },
  {
    link: "/Contact",
    image: "iconPhone-outlined.svg",
    text: "Контакты"
  },
];

const HeaderDropDownUser = [
  {
    link: "/profile",
    image: "IconHome-outlined.svg",
    text: "Профиль"
  },
  {
    link: "/",
    image: "IconHome-outlined.svg",
    text: "Мои заказы"
  },
  {
    link: "/auth/login",
    image: "IconHome-outlined.svg",
    text: "Авторизация"
  },
  {
    link: "/auth/signup",
    image: "IconHome-outlined.svg",
    text: "Регистрация"
  },
];

const index = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoBlock />

        <SocialIcons />

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
              src="../../../public/iconUser.svg"
              alt="User"
              width={33}
              height={33}
              className={styles.nav__img}
            />
            <HeaderDropdown HeaderDropdownData={HeaderDropDownNav} />
          </li>

          <li className={styles.nav__item}>
            <img
              src="../../../public/iconMenu.svg"
              alt="Menu"
              width={33}
              height={33}
              className={styles.nav__img}
            />
            <HeaderDropdown HeaderDropdownData={HeaderDropDownUser} />
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
      </div>
    </header>
  );
};

export default index;