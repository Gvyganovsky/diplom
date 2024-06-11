import { useState, useContext, useEffect } from "react";
import style from "./Header.module.scss";
import IconsNav from "./iconsNav";
import LogoBlock from "../LogoBlock";
import BasketContext from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
import { HeaderDropDownUser, HeaderDropDownNav } from "../../Data";

const Index = () => {
  const { setBasketOpened } = useContext(BasketContext);
  const { getUserData } = useAuth();
  const [userDropDown, setUserDropDown] = useState([...HeaderDropDownUser]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      if (userData && userData.user.admin === 1) {
        setUserDropDown(prevState => {
          const adminPanelExists = prevState.some(item => item.text === "Админ панель");
          if (!adminPanelExists) {
            return [
              ...prevState,
              {
                link: "https://dp-viganovsky.xn--80ahdri7a.site/api/site/login",
                image: "/IconAdmin-outlined.svg",
                text: "Админ панель",
              }
            ];
          }
          return prevState;
        });
      }
    };

    fetchData();
  }, [getUserData]);

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
