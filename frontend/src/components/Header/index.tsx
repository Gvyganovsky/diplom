import styles from "./Header.module.scss";
import IconsNav from "../iconsNav";
import LogoBlock from "./LogoBlock";
import React from "react";
import BasketContext from "../../contexts/BasketContext";

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
    image: "IconUser-outlined.svg",
    text: "Профиль"
  },
  {
    link: "/",
    image: "IconOrders-outlined.svg",
    text: "Мои заказы"
  },
  {
    link: "/auth/login",
    image: "IconSignIn-outlined.svg",
    text: "Авторизация"
  },
  {
    link: "/auth/signup",
    image: "IconSignUp-outlined.svg",
    text: "Регистрация"
  },
];

const index = () => {
  const { setBasketOpened } = React.useContext(BasketContext);

  const iconsNavData = [
    {
      image: 'iconBasket.svg',
      alt: 'Basket',
      onClick: () => setBasketOpened(true)
    },
    {
      image: 'iconUser.svg',
      alt: 'User',
      dropDown: HeaderDropDownUser
    },
    {
      image: 'iconMenu.svg',
      alt: 'Menu',
      dropDown: HeaderDropDownNav
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoBlock />
        <IconsNav icons={iconsNavData} />
      </div>
    </header>
  );
};

export default index;