import styles from './SocialIcons.module.scss';

const index = () => {
    return (
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
    )
}

export default index
