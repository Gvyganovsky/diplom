import styles from "./Button.module.scss";

interface buttonProps {
  id?: number;
  title: string;
  link?: string;
  className: string;
  type?: "button" | "submit" | "reset"; 
  onClick?: () => void;
}

const Button: React.FC<buttonProps> = ({ id, title, link, className, type = "button", onClick }) => {
  if (link) {
    return (
        <a href={`${link}/${id}`} className={`${styles.button} ${className}`}>
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
