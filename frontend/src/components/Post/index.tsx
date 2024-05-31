import Title from "../Title";
import style from "./Post.module.scss";

interface Post {
  text: string;
}

interface Props {
  title: string;
  text: string;
  img: string;
  description: string;
  enemy: string;
  postData: Post[];
}

const PostComponent: React.FC<Props> = (props) => {
  return (
    <div className={style.post}>
      <Title text={props.title} />
      <p className={style.text}>{props.text}</p>

      <div className={style.content}>
        <img src={props.img} alt="enemy" width={550} height={460} className={style.img} />
        <div className={style.textBlock}>
          <p className={style.description}>{props.description}</p>

          <div className={style.enemyBlock}>
            <img src="/iconBatterfly.svg" alt="Batterfly" width={40} height={40} className={style.icon} />
            <p>{props.enemy} эффективна против таких вредителей:</p>
          </div>

          <ul className={style.list}>
            {props.postData.map((post, index) => (
              <li className={style.item} key={index}>
                <img src="/IconCheck.svg" alt="IconCheck" width={18} height={18} className={style.iconCheck} />
                <p className={style.postText}>{post.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
