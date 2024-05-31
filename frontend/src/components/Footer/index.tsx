import style from "./Footer.module.scss";

const index = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <ul className={style.logoBlock}>
          <li className={style.logo_item}>
            <img
              src="/logo.svg"
              alt="logo"
              width={70}
              height={70}
              className={style.logo}
            />
          </li>
          <li className={style.phone}>+7(861)-217-91-18</li>
        </ul>

        <p className={style.socialNetwork__text}>Подписывайтесь на наши соц. сети</p>
        <ul className={style.socialNetwork}>
          <li className={style.socialNetwork__icon}>
            <img
              src="/iconVk.svg"
              alt="Vk"
              width={40}
              height={40}
            />
          </li>
          <li className={style.socialNetwork__icon}>
            <img
              src="/iconInstagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
          </li>
          <li className={style.socialNetwork__icon}>
            <img
              src="/iconTikTok.svg"
              alt="TikTok"
              width={40}
              height={40}
            />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default index;
