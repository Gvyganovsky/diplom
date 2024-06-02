import { useState, useEffect, ChangeEvent } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/index.tsx";
import styles from "./Catalog.module.scss";
import Filter from "../../components/Catalog/Filter/index.tsx";
import Product from "../../components/Product/index.tsx";
import Hero from "../../components/Hero/index.tsx";
import Title from "../../components/Title/index.tsx";

interface Product {
  id: number;
  image: string;
  name: string;
  brand: string;
  model: string;
  price: string;
  category: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsPerPage = 6;

  useEffect(() => {
    fetch("https://dp-viganovsky.xn--80ahdri7a.site/api/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    let passesBrandFilter = true;
    let passesPriceFilter = true;
    let passesCategoryFilter = true;

    if (selectedBrand !== "" && product.brand !== selectedBrand) {
      passesBrandFilter = false;
    }

    if (minPrice !== "" && parseFloat(product.price) < parseFloat(minPrice)) {
      passesPriceFilter = false;
    }

    if (maxPrice !== "" && parseFloat(product.price) > parseFloat(maxPrice)) {
      passesPriceFilter = false;
    }

    if (selectedCategory !== "" && product.category !== selectedCategory) {
      passesCategoryFilter = false;
    }

    return passesBrandFilter && passesPriceFilter && passesCategoryFilter;
  });

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Hero
        title="Дрон опрыскиватель AGR A22"
        Background="/Background/Catalog.jpg"
        imageAdapt="/Background/5.png"
        text="Высокое качество продукции и хороший урожай - результат точного планирования и быстрого реагирования на возникающие посевам угроз."
        listAltItems={[
          { img: "./Catalog/iconTime.svg", title: "Время полета 15 минут" },
          { img: "./Catalog/icoFly.svg", title: "Скорость полета" },
          { img: "./Catalog/iconRTK.svg", title: "Автономная работа" },
          { img: "./Catalog/iconWidth.svg", title: "Ширина захвата 8 м" },
          { img: "./Catalog/iconFuel.svg", title: "Емкость бака" },
          { img: "./Catalog/iconIP67.svg", title: "Водонепроницаемость" },
        ]}
      />

      <div className={styles.container}>
        <Breadcrumbs title="Каталог" />
        <Title text="Наши предложения" />
        <div className={styles.content}>
          <Filter
            selectedBrand={selectedBrand}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onBrandChange={handleBrandChange}
            onCategoryChange={handleCategoryChange}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
          />
          <div className={styles.catalog}>
            {currentProducts.map((product) => (
              <Product
                key={product.id}
                image={product.image}
                name={product.name}
                brand={product.brand}
                model={product.model}
                price={parseFloat(product.price)}
                id={product.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)} className={styles.pageItem}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalog;
