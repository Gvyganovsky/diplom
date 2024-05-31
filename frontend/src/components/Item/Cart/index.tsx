import style from "./Cart.module.scss";

const index = () => {
  return (
    <div className={style.cart}>
      <div className={style.imgBlock}>
        <img
          src="./Product/AGR A22_3.png"
          alt="Product"
          width={650}
          height={380}
          className={style.img}
        />
        <img
          src="./Product/AGR A22.png"
          alt="Product"
          width={200}
          height={160}
          className={style.img}
        />
        <img
          src="./Product/AGR A22_1.png"
          alt="Product"
          width={200}
          height={160}
          className={style.img}
        />
        <img
          src="/Product/AGR A22_2.png"
          alt="Product"
          width={200}
          height={160}
          className={style.img}
        />
      </div>
      <div>
        <h2 className={style.title}>Дрон опрыскиватель AGR A22</h2>
        <p className={style.article}>Артикуль: 12358</p>
        <ul className={style.list}>
          <li className={style.item}>
            <img src="./Cart/iconFuel.svg" alt="Icon" width={30} height={30} />
            <p>Бак для распыления 22 л</p>
          </li>
          <li className={style.item}>
            <img src="./Cart/iconTree.svg" alt="Icon" width={30} height={30} />
            <p>Датчик высоты и обхода препятствий</p>
          </li>
          <li className={style.item}>
            <img src="./Cart/iconWidth.svg" alt="Icon" width={30} height={30} />
            <p>Ширина захвата 5-8 м</p>
          </li>
          <li className={style.item}>
            <img src="./Cart/iconIP67.svg" alt="Icon" width={30} height={30} />
            <p>Воднепроницаемость</p>
          </li>
          <li className={style.item}>
            <img src="./Cart/iconRTK.svg" alt="Icon" width={30} height={30} />
            <p>Высокоточное позиционирование</p>
          </li>
          <li className={style.item}>
            <img src="./Cart/iconSpeed.svg" alt="Icon" width={30} height={30} />
            <p>Скорость полета 10 м/с</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default index;
