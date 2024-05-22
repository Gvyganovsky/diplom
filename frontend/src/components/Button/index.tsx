import styles from "./Button.module.scss";

interface ButtonProps {
  id?: number;
  title: string;
  link?: string;
  className: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ id, title, link, className, type = "button", onClick }) => {
  if (link) {
    return (
      <a href={`${link}/${id}`} className={`${styles.button} ${className}`}>
        {title}
      </a>
    );
  } else {
    return (
      <button type={type} className={`${styles.button} ${className}`} onClick={onClick}>
        {title}
      </button>
    );
  }
};

export default Button;
