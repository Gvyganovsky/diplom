import Title from "../../Title";
import styles from "./Problems.module.scss";

const problems = [
  "Уничтожение опылителей (пчелы, шмели).",
  "Потеря урожая от работы тяжелой техники.",
  "Уничтожения природных энтомофагов (златоглазки, божьи коровки и т.д.",
  "Уничтожение на посевах таких вредителей как совки, огневки, кукурузные и стеблевые мотельки, тля, клещи.",
  "Дефицита воды для опрыскивания.",
  "Резистентности у вредителей к химическим препаратам, что ведет за собой увеличение инсектицидной нагрузки, соответственно увеличение бюджета на защиту растений.",
];

const Index = () => {
  return (
    <div className={styles.problems}>
      <Title text="Проблемы, кторые мы решаем" />
      <ul className={styles.list}>
        {problems.map((problem, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.number}>{index + 1}</div> 
            <p className={styles.text}>{problem}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
