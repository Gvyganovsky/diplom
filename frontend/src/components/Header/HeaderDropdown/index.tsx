import { Link } from 'react-router-dom';
import styles from './HeaderDropdown.module.scss';
import React from 'react';

interface DropdownItem {
    link: string;
    image: string;
    text: string;
}

interface HeaderDropdownProps {
    HeaderDropdownData: DropdownItem[];
}

const Index: React.FC<HeaderDropdownProps> = ({ HeaderDropdownData }) => {
    return (
        <ul className={styles.menu}>
            {HeaderDropdownData.map((headerDropdown, index) => (
                <li key={index} className={styles.menu__item}>
                    <Link to={headerDropdown.link} className={styles.menu__link}>
                        <img
                            src={headerDropdown.image}
                            alt="Home"
                            width={40}
                            height={40}
                            className={styles.menu__img}
                        />
                        <p className={styles.menu__text}>{headerDropdown.text}</p>
                    </Link>
                </li>
            ))}
            <li className={styles.menu__item}>
                <img
                    src="../../../public/iconWhatsapp.svg"
                    alt="Whatsapp"
                    className={styles.menu__icon}
                    width={30}
                    height={30}
                />
                <img
                    src="../../../public/iconTelegram.svg"
                    alt="Telegram"
                    className={styles.menu__icon}
                    width={30}
                    height={30}
                />
                <img
                    src="../../../public/iconWechat.svg"
                    alt="Wechat"
                    className={styles.menu__icon}
                    width={30}
                    height={30}
                />
            </li>
        </ul>
    )
}

export default Index;
