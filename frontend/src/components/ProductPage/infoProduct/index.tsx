import Button from "../../Button";
import FeatureList from "../../FeatureList/FeatureList";
import ImageCatalog from "../ImageCatalog";
import styles from "./infoProduct.module.scss";

const index = (props: any) => {
  const { product } = props;

  const FeatureListData = [
    { img: '../../../../public/IconFuel.svg', text: 'Бак для распыления 22 л' },
    { img: '../../../../public/iconWidth.svg', text: 'Ширина захвата 5-8 м' },
    { img: '../../../../public/RTK.svg', text: 'Высокоточное позиционирование' },
    { img: '../../../../public/iconTree.svg', text: 'Датчик высоты и обхода препятствий' },
    { img: '../../../../public/IP67.svg', text: 'Воднепроницаемость' },
    { img: '../../../../public/iconDroneone.svg', text: 'Скорость полета 10 м/с' },
  ];

  if (!product) {
    return <div>ЫЫы</div>
  }

  return (
    <div className={styles.infoBlock}>
      <ImageCatalog images={product.image} />

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.text}>Модель: {product.brand}</p>
        <FeatureList features={FeatureListData} />
        <p className={styles.link}>Все характеристики</p>
        <div>
          <p className={styles.price}>{product.price}</p>
          <div className={styles.countBlock}>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <div>
            <Button title="Добавить в корзину" link="Product" className={styles.buttonAlt} />
            <Button title="Купить в 1 клик" link="Product" className={styles.buttonAlt} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
