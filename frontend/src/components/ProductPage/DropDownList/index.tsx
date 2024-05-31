import React, { useState } from 'react';
import styles from './DropDownList.module.scss';

interface AccordionItemProps {
    title: string;
    content: JSX.Element;
    isActive: boolean;
    onToggle: () => void;
}

const DropDownList = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const accordionItems: { title: string; content: JSX.Element }[] = [
        {
            title: "Общие характеристики",
            content: (
                <table>
                    <tbody>
                        <tr><td>Вес общий</td><td>54.8kg</td></tr>
                        <tr><td>Габариты</td><td>1705*1695*840mm</td></tr>
                        <tr><td>Рабочее напряжение</td><td>51.8V（14S LiPo）</td></tr>
                        <tr><td>Сила тока</td><td>77A</td></tr>
                    </tbody>
                </table>
            )
        },
        {
            title: "Технические характеристики",
            content: (
                <table>
                    <tbody>
                        <tr><td>Мотор</td><td>Модель Х60</td></tr>
                        <tr><td>количество оборотов:</td><td>68RPM/V</td></tr>
                        <tr><td>Мощность</td><td>10kW (один мотор)</td></tr>
                        <tr><td>Количество двигателей</td><td>4</td></tr>
                        <tr><td>Максимальная частота работы</td><td>500Hz</td></tr>
                        <tr><td>Диаметр винта</td><td>56x20 дюймов</td></tr>
                        <tr><td>Вес</td><td>810гр</td></tr>
                    </tbody>
                </table>
            )
        },
        {
            title: "Система распыления",
            content: (
                <table>
                    <tbody>
                        <tr><td>Емкость бака для системы распыления</td><td>50 L</td></tr>
                        <tr><td>Вес</td><td>6,2кг, включая водяную помпу и прочие аксессуары</td></tr>
                        <tr><td>Количество каналов</td><td>2</td></tr>
                        <tr><td>Производительность</td><td>20L/min</td></tr>
                        <tr><td>Средний вольтаж</td><td>51.8</td></tr>
                        <tr><td>Защита от воды</td><td>IP 67</td></tr>
                        <tr><td>Максимальное количество оборотов диска центрифуги</td><td>11000 prm</td></tr>
                        <tr><td>Распыление в диапазоне</td><td>6-10м</td></tr>
                        <tr><td>Максимальная производительность распыления</td><td>8л/мин с одного сопла.</td></tr>
                    </tbody>
                </table>
            )
        },
        {
            title: "Цифровые характеристики",
            content: (
                <table>
                    <tbody>
                        <tr><td>Углы обзора:</td><td>Диагональный: 140гр, Горизонтальный: 87гр.</td></tr>
                        <tr><td>Разрешение записи</td><td>720Р</td></tr>
                        <tr><td>Типы интерфейсов</td><td>CANBus、RS485、PWM、USB etc</td></tr>
                        <tr><td>Поддержка мульти роторных летательных типов:</td><td>4-, 6-, 8-роторные типы</td></tr>
                    </tbody>
                </table>
            )
        }
    ];

    return (
        <section className={styles.accordion}>
            {accordionItems.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isActive={activeIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </section>
    );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isActive, onToggle }) => {
    return (
        <div className={styles["accordion-item"]}>
            <div className={`${styles["accordion-title"]} ${isActive ? styles.active : ''}`} onClick={onToggle}>
                {title}
            </div>
            {isActive && (
                <div className={styles["accordion-content"]}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default DropDownList;
