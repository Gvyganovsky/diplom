import style from './iconsNav.module.scss';
import { Link } from 'react-router-dom';

interface icon {
    link?: string;
    image: string;
    alt: string;
    onClick?: () => void;
    dropDown?: dropDownData[];
}

interface dropDownData {
    link: string;
    image: string;
    text: string;
}

interface iconsNavProps {
    icons: icon[];
}

const Index: React.FC<iconsNavProps> = ({ icons }) => {
    return (
        <ul className={style.iconsNav}>
            {icons.map((icon, index) => (
                <li className={style.iconsNav__icon} key={index}>
                    {icon.link ? (
                        <Link to={icon.link}>
                            <img
                                src={icon.image}
                                alt={icon.alt}
                                width={33}
                                height={33}
                                className={style.iconsNav__img}
                            />
                        </Link>
                    ) : (
                        <img
                            src={icon.image}
                            alt={icon.alt}
                            width={33}
                            height={33}
                            className={style.iconsNav__img}
                            onClick={icon.onClick}
                        />
                    )}
                    {icon.dropDown && (
                        <ul className={style.menu}>
                            {icon.dropDown.map((headerDropdown, index) => (
                                <li className={style.menu__item} key={index}>
                                    <Link to={headerDropdown.link} className={style.menu__link}>
                                        <img
                                            src={headerDropdown.image}
                                            alt="link"
                                            width={40}
                                            height={40}
                                            className={style.menu__img}
                                        />
                                        <p className={style.menu__text}>{headerDropdown.text}</p>
                                    </Link>
                                </li>
                            ))}
                            <li className={style.menu__item}>
                                <img
                                    src="/iconWhatsapp.svg"
                                    alt="Whatsapp"
                                    className={style.menu__icon}
                                    width={30}
                                    height={30}
                                />
                                <img
                                    src="/iconTelegram.svg"
                                    alt="Telegram"
                                    className={style.menu__icon}
                                    width={30}
                                    height={30}
                                />
                                <img
                                    src="/iconWechat.svg"
                                    alt="Wechat"
                                    className={style.menu__icon}
                                    width={30}
                                    height={30}
                                />
                            </li>
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default Index;
