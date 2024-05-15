import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import InfoProduct from '../components/ProductPage/infoProduct';
import Info from "../components/Info";
import DescriptionProduct from "../components/ProductPage/DescriptionProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://6630f40fc92f351c03dbb255.mockapi.io/product/${id}`);
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

  const { description } = product;

  const bonusData = [
    {
      img: "./Trust/iconPeople.svg",
      title: "Бесплатная доставка",
      text: "Купить кважракоптер - получить бесплатную доставку",
    },
    {
      img: "./Trust/iconPeople.svg",
      title: "Пробный первый полет",
      text: "Краткое обучение и техника безопасности",
    },
    {
      img: "./Trust/iconPeople.svg",
      title: "Гарантия лучшей цены",
      text: "Лучшая цена от официального производителя",
    },
    {
      img: "./Trust/iconPeople.svg",
      title: "Официальная гарантия",
      text: "На всю продукцию представленную в магазине",
    },
  ];

  return (
    <>
      <InfoProduct product={product} />

      {bonusData.map((bonusDataItem, index) => (
        <Info key={index} {...bonusDataItem} />
      ))}

      {description.map((desc, index) => (
        <DescriptionProduct
          key={index}
          title={desc.title}
          text={desc.text}
          image={desc.image}
        />
      ))}
    </>
  );
}

export default ProductDetail;
