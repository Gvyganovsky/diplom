import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import InfoProduct from '../components/ProductPage/infoProduct';
import DescriptionProduct from "../components/ProductPage/DescriptionProduct";
import Trust from "../components/Trust";
import DropDownList from "../components/ProductPage/DropDownList";
import { bonusData } from '../Data';
import { MoonLoader } from "react-spinners";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${id}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при получении продукта:', error);
        setIsLoading(false); 
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <MoonLoader color="#5A9CEC" size={100} />
      </div>
    );
  }

  if (!product) {
    return <div>Ошибка при загрузке данных</div>;
  }

  return (
    <>
      <InfoProduct product={product} />

      <Trust data={bonusData} title={undefined} />

      <DescriptionProduct product={product} />

      <DropDownList />
    </>
  );
}

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
};

export default ProductDetail;
