import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import InfoProduct from '../components/ProductPage/infoProduct';
import DescriptionProduct from "../components/ProductPage/DescriptionProduct";
import Trust from "../components/Trust";
import DropDownList from "../components/ProductPage/DropDownList";
import { bonusData } from '../Data';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${id}`);
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

  return (
    <>
      <InfoProduct product={product} />

      <Trust data={bonusData} />

      <DescriptionProduct product={product} />

      <DropDownList />
    </>
  );
}

export default ProductDetail;
