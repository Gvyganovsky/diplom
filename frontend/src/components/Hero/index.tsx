import ListAltItems from "../ListAltItems";
import ListItems from "../listItems";
import style from "./Hero.module.scss";

const index = (props: any) => {
  return (
    <div className={style.hero} style={{ backgroundImage: `url(${props.Background})` }}>
      <img src={props.imageAdapt} alt="Background" width={800} className={style.imageAdapt} />
      <div className={style.container}>
        <h1 className={style.title}>{props.title}</h1>

        {props.text && <p className={style.text}>{props.text}</p>}

        {props.listItems && <ListItems listItems={props.listItems} />}

        {props.listAltItems && <ListAltItems listItem={props.listAltItems} />}
      </div>
    </div >
  );
};

export default index;
