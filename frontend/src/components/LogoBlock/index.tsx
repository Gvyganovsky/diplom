import style from './LogoBlock.module.scss';

const index = () => {
    return (
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
    )
}

export default index
