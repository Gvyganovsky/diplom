import style from "./AreasOfApplication.module.scss";
import { useState } from "react";
import Title from "../../Title";
import { items } from "../../../Data";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className={style.AreasOfApplication}>
      <Title text="Области применения" />
      <div className={style.content}>
        <ul className={style.list}>
          <img
            src="/iconLine.svg"
            alt="background"
            width={1000}
            height={900}
            className={style.background}
          />
          {items.map((item, index) => (
            <li
              key={index}
              className={style.item}
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={item.text}
                width={40}
                height={40}
                className={style.icon}
              />
              <p
                className={`${style.title} ${
                  item.text === selectedItem.text ? style.selected : ""
                }`}
              >
                {item.text}
              </p>
            </li>
          ))}
        </ul>
        <div>
          <p className={style.text}>{selectedItem.description}</p>
          <img
            src={selectedItem.imageSrc}
            alt={selectedItem.text}
            className={style.img}
            width={750}
            height={430}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
