import styles from './LogoBlock.module.scss';

const index = () => {
    return (
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
    )
}

export default index
