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
<<<<<<< HEAD
  if (link) {
    return (
      <a href={`${link}/${id}`} className={`${styles.button} ${className}`}>
=======
  const finalLink = id ? `${link}/${id}` : link;

  if (link) {
    return (
      <a href={finalLink} className={`${styles.button} ${className}`}>
>>>>>>> master
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
