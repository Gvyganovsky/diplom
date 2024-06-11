import style from './ListAltItems.module.scss';

const index = (props: any) => {
    return (
        <ul className={style.listAlt}>
            {props.listItem.map((item: any, index: any) => (
                <li key={index} className={style.itemAlt}>
                    <img src={item.img} alt="icon" width={40} height={40} className={style.icon} />
                    <h3 className={style.text}>{item.title}</h3>
                </li>
            ))}
        </ul>
    )
}

export default index
