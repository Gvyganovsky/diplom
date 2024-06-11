import { useContext } from "react";
import style from "./Header.module.scss";
import IconsNav from "./iconsNav";
import LogoBlock from "../LogoBlock";
import BasketContext from "../../contexts/BasketContext";
import { HeaderDropDownUser, HeaderDropDownNav } from "../../Data";

const Index = () => {
  const { setBasketOpened } = useContext(BasketContext);

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
    <header className={style.header}>
      <div className={style.container}>
        <LogoBlock />
        <IconsNav icons={iconsNavData} />
      </div>
    </header>
  );
};

export default Index;
