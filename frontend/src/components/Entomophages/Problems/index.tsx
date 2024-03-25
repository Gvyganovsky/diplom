import Title from "../../Title";
import styles from "./Problems.module.scss";

const index = () => {
  const problems = [
    "Уничтожение опылителей (пчелы, шмели).",
    "Потеря урожая от работы тяжелой техники",
    "уничтожения природных энтомофагов (златоглазки, божьи коровки и т.д",
    "Уничтожение на посевах таких вредителей как совки, огневки, кукурузные и стеблевые мотельки, тля, клещи.",
    "Дефицита воды для опрыскивания",
    "Резистентности у вредителей к химическим препаратам, что ведет за собой увеличение инсектицидной нагрузки, соответственно увеличение бюджета на защиту растений.",
  ];

  return (
    <div className={styles.problems}>
      <Title text="Проблемы кторые мы решаем" />
      <ul className={styles.list}>
        {problems.map((problem, index) => (
          <li key={index} className={styles.item}>{problem}</li>
        ))}
      </ul>
    </div>
  );
};

export default index;
