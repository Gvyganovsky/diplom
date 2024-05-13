import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface buttonProps {
  id?: number;
  title: string;
  link?: string;
  className: string;
}

const Button: React.FC<buttonProps> = ({ id, title, link, className }) => {
  return (
    <Link to={`${link}/${id}`}>
      <button type="button" className={`${styles.button} ${className}`}>{title}</button>
    </Link>
  )
}

export default Button;

{/* <Button id={123} title="Green Button" link="Product" className={styles.buttonGreen} />
<Button id={456} title="Alternate Button" link="Product" className={styles.buttonAlt} />
<Button id={789} title="White Button" link="Product" className={styles.buttonWhite} /> */}