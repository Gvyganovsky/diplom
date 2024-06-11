import style from './listItems.module.scss';

const index = (props: any) => {
    return (
        <>
            <div className={style.imageBlock}>
                <img
                    src="/iconDrone_flying.svg"
                    alt="Drone flying"
                    height={120}
                    className={style.image}
                />
            </div>
            <ul className={style.list}>
                {props.listItems.map((item: any, index: any) => (
                    <li key={index} className={style.item}>
                        <h3 className={style.title}>{item.title}</h3>
                        <p className={style.text}>{item.text}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default index
