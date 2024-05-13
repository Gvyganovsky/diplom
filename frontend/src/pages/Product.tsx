import { useParams } from "react-router-dom";
import React from "react";
import axios from 'axios';
import InfoProduct from '../components/ProductPage/infoProduct';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://6630f40fc92f351c03dbb255.mockapi.io/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <InfoProduct product={product} />
      {/* <h2>{product.title}</h2>
      <p>Brand: {product.brand}</p>
      <p>Model: {product.model}</p>
      <p>Price: ${product.price}</p> */}
    </section>
  );
}

export default ProductDetail;
