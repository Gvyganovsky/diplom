import styles from './HowItWorks.module.scss'
import Title from '../../Title'
import { useState } from 'react';

const Index = () => {
    const [isKamerallyOpen, setIsKamerallyOpen] = useState(false);
    const [isFieldOpen, setIsFieldOpen] = useState(true);

    return (
        <div className={styles.HowItWorks}>
            <Title text="Как это работает" />
            <p className={styles.text}>
                Аэрофотосъемки разделяется на этапы полевых и камеральных работ, при этом набор данных,
                получаемых по результатам камеральных работ, варьируется в зависимости от требований заказчика
            </p>

            <div className={styles.content}>
                <img src="./HowItWorks.png" alt="HowItWorks" width={620} height={370} className={styles.image} />

                <ul className={styles.list}>
                    <li className={`${styles.item} ${isFieldOpen ? styles.selected : ''}`}>
                        <p className={styles.item__title} onClick={() => {
                            setIsFieldOpen(!isFieldOpen);
                            setIsKamerallyOpen(false); // Скрываем список "Камеральные работы" при открытии "Полевых работ"
                        }}>Полевые работы</p>
                        {isFieldOpen && (
                            <ul className={styles.item__list}>
                                <li className={styles.item__text}>Получение разрешений на аэрофотосъемку</li>
                                <li className={styles.item__text}>Выполнение аэрофотосъемки с использованием БПЛА</li>
                            </ul>
                        )}
                    </li>
                    <li className={`${styles.item} ${isKamerallyOpen ? styles.selected : ''}`}>
                        <p className={styles.item__title} onClick={() => {
                            setIsKamerallyOpen(!isKamerallyOpen);
                            setIsFieldOpen(false); // Скрываем список "Полевые работы" при открытии "Камеральных работ"
                        }}>Камеральные работы</p>
                        {isKamerallyOpen && (
                            <ul className={styles.item__list}>
                                <li className={styles.item__text}>Обработка полученных данных</li>
                                <li className={styles.item__text}>Создание картографических материалов</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Index
