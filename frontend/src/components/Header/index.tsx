import style from "./Header.module.scss";
import IconsNav from "../iconsNav";
import LogoBlock from "../LogoBlock";
import { useContext } from "react";
import BasketContext from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
import { HeaderDropDownNav, HeaderDropDownUser } from "../../Data";

const Index = () => {
  const { setBasketOpened } = useContext(BasketContext);
  const { user } = useAuth();
  let userDropDown = [...HeaderDropDownUser];

  if (user && user.admin === 1 && !userDropDown.some(item => item.link === "/admin")) {
    userDropDown.push({
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
      dropDown: userDropDown,
    },
    {
      image: "/iconMenu.svg",
      alt: "Menu",
      dropDown: HeaderDropDownNav,
    },
  ];

  return (
    <header className={style.header}>
      <div className={style.container}>
        <LogoBlock />
        <IconsNav icons={iconsNavData} />
      </div>
    </header>
  );
};

export default Index;
