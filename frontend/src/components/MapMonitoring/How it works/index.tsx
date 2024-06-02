import style from './HowItWorks.module.scss'
import Title from '../../Title'
import { useState } from 'react';

const Index = () => {
    const [isKamerallyOpen, setIsKamerallyOpen] = useState(false);
    const [isFieldOpen, setIsFieldOpen] = useState(true);

    return (
        <div className={style.HowItWorks}>
            <Title text="Как это работает" />
            <p className={style.text}>
                Аэрофотосъемки разделяется на этапы полевых и камеральных работ, при этом набор данных,
                получаемых по результатам камеральных работ, варьируется в зависимости от требований заказчика
            </p>

            <div className={style.content}>
                <img src="./HowItWorks.png" alt="HowItWorks" width={620} height={370} className={style.image} />

                <ul className={style.list}>
                    <li className={`${style.item} ${isFieldOpen ? style.selected : ''}`}>
                        <p className={style.item__title} onClick={() => {
                            setIsFieldOpen(!isFieldOpen);
                            setIsKamerallyOpen(false);
                        }}>Полевые работы</p>
                        {isFieldOpen && (
                            <ul className={style.item__list}>
                                <li className={style.item__text}>Получение разрешений на аэрофотосъемку</li>
                                <li className={style.item__text}>Выполнение аэрофотосъемки с использованием БПЛА</li>
                            </ul>
                        )}
                    </li>
                    <li className={`${style.item} ${isKamerallyOpen ? style.selected : ''}`}>
                        <p className={style.item__title} onClick={() => {
                            setIsKamerallyOpen(!isKamerallyOpen);
                            setIsFieldOpen(false);
                        }}>Камеральные работы</p>
                        {isKamerallyOpen && (
                            <ul className={style.item__list}>
                                <li className={style.item__text}>Обработка полученных данных</li>
                                <li className={style.item__text}>Создание картографических материалов</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Index
