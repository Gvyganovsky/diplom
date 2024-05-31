import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import InfoProduct from '../components/ProductPage/infoProduct';
<<<<<<< HEAD
import Info from "../components/Info";
import DescriptionProduct from "../components/ProductPage/DescriptionProduct";
import Trust from "../components/Trust";
=======
import DescriptionProduct from "../components/ProductPage/DescriptionProduct";
import Trust from "../components/Trust";
import DropDownList from "../components/ProductPage/DropDownList";
>>>>>>> master

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`https://6630f40fc92f351c03dbb255.mockapi.io/product/${id}`);
=======
        const response = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${id}`);
>>>>>>> master
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при получении продукта:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

<<<<<<< HEAD
  const { description } = product;

=======
>>>>>>> master
  const bonusData = [
    {
      img: "../iconDelivery.svg",
      title: "Бесплатная доставка",
      text: "Купить квадракоптер - получить бесплатную доставку. Участвуйте в нашей акции и получите скидку на следующую покупку. Обращайтесь к нашим консультантам для выбора подходящей модели.",
    },
    {
      img: "../IconWallet.svg",
      title: "Гарантия лучшей цены",
      text: "Лучшая цена от официального производителя. Получите гарантированную скидку на следующую покупку.",
    },
    {
      img: "../iconSecurity.svg",
      title: "Официальная гарантия",
      text: "На всю продукцию представленную в магазине, действует гарантия качества на срок до двух лет. Мы также предлагаем бесплатную доставку по всей стране для заказов свыше 100 долларов.",
    }
  ];

  return (
    <>
      <InfoProduct product={product} />

      <Trust data={bonusData} />

<<<<<<< HEAD
      {/* {description.map((desc, index) => (
        <DescriptionProduct
          key={index}
          title={desc.title}
          text={desc.text}
          image={desc.image}
        />
      ))} */}
=======
      <DescriptionProduct product={product} />

      <DropDownList  />
>>>>>>> master
    </>
  );
}

export default ProductDetail;
