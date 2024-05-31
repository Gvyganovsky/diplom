import styles from "./Footer.module.scss";
import stylesApp from "../../App.module.scss";

const index = () => {
  return (
    <footer className={styles.footer}>
      <div className={stylesApp.container}>
        <ul className={styles.logoBlock}>
          <li className={styles.logo_item}>
            <img
              src="/logo.svg"
              alt="logo"
              width={70}
              height={70}
              className={styles.logo}
            />
          </li>
          <li className={styles.phone}>+7(861)-217-91-18</li>
        </ul>

        <p className={styles.socialNetwork__text}>Подписывайтесь на наши соц. сети</p>
        <ul className={styles.socialNetwork}>
          <li className={styles.socialNetwork__icon}>
            <img
              src="/iconVk.svg"
              alt="Vk"
              width={40}
              height={40}
            />
          </li>
          <li className={styles.socialNetwork__icon}>
            <img
              src="/iconInstagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
          </li>
          <li className={styles.socialNetwork__icon}>
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
