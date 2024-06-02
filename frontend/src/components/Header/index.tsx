import styles from "./Header.module.scss";
import IconsNav from "../iconsNav";
import LogoBlock from "../LogoBlock";
import { useContext } from "react";
import BasketContext from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
import { HeaderDropDownNav, HeaderDropDownUser } from "../../Data";

const Index = () => {
  const { setBasketOpened } = useContext(BasketContext);
  const { user } = useAuth();

  if (user && user.admin === 1) {
    HeaderDropDownUser.push({
      link: "/admin",
      image: "/IconAdmin-outlined.svg",
      text: "Админ панель",
    });
  }

  const iconsNavData = [
    {
      image: "/iconBasket.svg",
      alt: "Basket",
      onClick: () => setBasketOpened(true),
    },
    {
      image: "/iconUser.svg",
      alt: "User",
      dropDown: HeaderDropDownUser,
    },
    {
      image: "/iconMenu.svg",
      alt: "Menu",
      dropDown: HeaderDropDownNav,
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

export default Index;
