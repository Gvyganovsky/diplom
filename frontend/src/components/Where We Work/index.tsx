import Title from "../Title";
import styles from "./Where We Work.module.scss";

const index = () => {
  const places = [
    "1. Московская область",
    "2. Ростовская область",
    "3. Краснодарский край",
    "4. Ставропольский край",
    "5. Северная Осетия",
    "6. Кабардино-Балкария",
    "7. Пензенская область",
    "8. Белгородская область",
    "9. Саратовская область",
    "10. Воронежская область",
    "11. Волгоградская область",
    "12. Астраханская область",
    "13. Самарская область",
    "14. Липецкая область",
    "15. Орловская область",
    "16. Курская область",
    "17. Ульяновская область",
    "18. Карачаево-Черкессия",
    "19. Брянская область",
    "20. Республика Татарстан",
    "21. Тамбовская область",
    "22. Тульская область",
    "23. Калужская область",
    "24. Республика Крым",
  ];

  return (
    <div className={styles.whereWeWork}>
      <img
        src="./Where We Work.png"
        alt="Where We Work"
        width={1000}
        height={1100}
        className={styles.img}
      />
      <div className={styles.container}>
        <Title text="Где мы работаем" />
        <ul className={styles.list}>
          {places.map((place, index) => (
            <li key={index} className={styles.item}>
              {place}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default index;
