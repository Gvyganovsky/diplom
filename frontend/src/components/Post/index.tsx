import React from 'react';
import Title from "../Title";
import styles from "./Post.module.scss";

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
    <div className={styles.post}>
      <Title text={props.title} />
      <p className={styles.text}>{props.text}</p>

      <div className={styles.content}>
        <img src={props.img} alt="enemy" width={550} height={460} className={styles.img} />
        <div className={styles.textBlock}>
          <p className={styles.description}>{props.description}</p>

          <div className={styles.enemyBlock}>
            <img src="/iconBatterfly.svg" alt="Batterfly" width={40} height={40} className={styles.icon} />
            <p>{props.enemy} эффективна против таких вредителей:</p>
          </div>

          <ul className={styles.list}>
            {props.postData.map((post, index) => (
              <li className={styles.item} key={index}>
                <img src="/IconCheck.svg" alt="IconCheck" width={18} height={18} className={styles.iconCheck} />
                <p className={styles.postText}>{post.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
