import style from "./Button.module.scss";

interface ButtonProps {
  id?: number;
  title: string;
  link?: string;
  className: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ id, title, link, className, type = "button", onClick }) => {
  const finalLink = id ? `${link}/${id}` : link;

  if (link) {
    return (
      <a href={finalLink} className={`${style.button} ${className}`}>
        {title}
      </a>
    );
  } else {
    return (
      <button type={type} className={`${style.button} ${className}`} onClick={onClick}>
        {title}
      </button>
    );
  }
};

export default Button;
