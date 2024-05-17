import styles from "./Button.module.scss";

interface buttonProps {
  title: string;
  link?: string;
  className: string;
  type?: "button" | "submit" | "reset"; 
  onClick?: () => void; // Добавлен обработчик события клика
}

const Button: React.FC<buttonProps> = ({ title, link, className, type = "button", onClick }) => {
  if (link) {
    return (
      <a href={link} className={`${styles.button} ${className}`}>
        {title}
      </a>
    );
  }
  return (
    <button type={type} className={`${styles.button} ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
