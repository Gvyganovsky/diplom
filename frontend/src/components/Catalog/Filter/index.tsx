import style from "./Filter.module.scss";
import { useState, ChangeEvent } from 'react';

interface FilterProps {
  selectedBrand: string;
  minPrice: string;
  maxPrice: string;
  onBrandChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onMinPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedBrand,
  minPrice,
  maxPrice,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onCategoryChange
}) => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  const toggleCategories = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  return (
    <div>
      <h3 className={style.filter__title} onClick={toggleCategories}>Фильтрация</h3>
      {categoriesVisible && (
        <ul className={style.filter}>
          <li className={style.filter__item} onClick={() => handleCategoryChange("БПЛА Самолетного типа")}>
            <img src="./Catalog/iconDrone-1.svg" alt="iconDrone" width={30} height={30} className={style.img} />
            <p className={style.text}>БПЛА Самолетного типа</p>
          </li>

          <li className={style.filter__item} onClick={() => handleCategoryChange("БПЛА мультироторного типа")}>
            <img src="./Catalog/iconDrone-2.svg" alt="iconDrone" width={30} height={30} className={style.img} />
            <p className={style.text}>БПЛА мультироторного типа</p>
          </li>

          <ul className={style.second__filter}>
            <li className={style.filter__item} onClick={() => handleCategoryChange("Дроны опрыскиватели")}>
              <img src="./Catalog/iconDrone-3.svg" alt="iconDrone" width={30} height={30} className={style.img} />
              <p className={style.text}>Дроны опрыскиватели</p>
            </li>
            <li className={style.filter__item} onClick={() => handleCategoryChange("Дроны для картографии")}>
              <img src="./Catalog/iconDrone-4.svg" alt="iconDrone" width={30} height={30} className={style.img} />
              <p>Дроны для картографии</p>
            </li>
          </ul>

          <li className={style.filter__item} onClick={() => handleCategoryChange("Полезные нагрузки")}>
            <img src="./Catalog/iconDrone-5.svg" alt="iconDrone" width={30} height={30} className={style.img} />
            <p className={style.text}>Полезные нагрузки</p>
          </li>

          <ul className={style.second__filter}>
            <li className={style.filter__item} onClick={() => handleCategoryChange("Фотокамеры")}>
              <img src="./Catalog/iconDrone-6.svg" alt="iconDrone" width={30} height={30} className={style.img} />
              <p className={style.text}>Фотокамеры</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Мультиспектральные камеры")}>
              <img src="./Catalog/iconDrone-7.svg" alt="iconDrone" width={30} height={30} className={style.img} />
              <p className={style.text}>Мультиспектральные камеры</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Гиростабилизированные видеокамеры и тепловизоры")}>
              <img src="./Catalog/iconThermal.svg" alt="iconDrone" width={30} height={42} className={style.img} />
              <p className={style.text}>
                Гиростабилизированные видеокамеры и тепловизоры
              </p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Cпециализированные модули")}>
              <img src="./Catalog/iconSettings.svg" alt="iconSettings" width={30} height={30} className={style.img} />
              <p className={style.text}>Cпециализированные модули</p>
            </li>
          </ul>

          <li className={style.filter__item} onClick={() => handleCategoryChange("Комплектующие")}>
            <img src="./Catalog/iconAdapter.svg" alt="iconAdapter" width={30} height={30} className={style.img} />
            <p className={style.text}>Комплектующие</p>
          </li>

          <ul className={style.second__filter}>
            <li className={style.filter__item} onClick={() => handleCategoryChange("Батареи")}>
              <img src="./Catalog/iconBattery.svg" alt="iconBattery" width={30} height={30} className={style.img} />
              <p className={style.text}>Батареи</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Зарядные устройства")}>
              <img src="./Catalog/iconIan.svg" alt="iconIan" width={30} height={30} className={style.img} />
              <p className={style.text}>Зарядные устройства</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Генераторы")}>
              <img src="./Catalog/iconGenerator.svg" alt="iconIan" width={30} height={30} className={style.img} />
              <p className={style.text}>Генераторы</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Пульты управления")}>
              <img src="./Catalog/iconEqualizer.svg" alt="iconEqualizer" width={30} height={30} className={style.img} />
              <p className={style.text}>Пульты управления</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Высокоточная навигация")}>
              <img src="./Catalog/iconMap.svg" alt="iconMap" width={30} height={30} className={style.img} />
              <p className={style.text}>Высокоточная навигация</p>
            </li>

            <li className={style.filter__item} onClick={() => handleCategoryChange("Привязные системы для коптеров")}>
              <img src="./Catalog/iconSettingsdron.svg" alt="iconSettingsdron" width={30} height={30} className={style.img} />
              <p className={style.text}>Привязные системы для коптеров</p>
            </li>
          </ul>

          <li className={style.filter__item} onClick={() => handleCategoryChange("Программное обеспечение")}>
            <img src="./Catalog/IconCoding 1.svg" alt="IconCoding" width={30} height={30} className={style.img} />
            <p className={style.text}>Программное обеспечение</p>
          </li>
        </ul>
      )}

      {categoriesVisible && (
        <div className={style.digital}>
          <div className={style.digital__price}>
            <p className={style.digital__title}>Цена</p>
            <input
              type="text"
              placeholder="От"
              id="from"
              className={style.input}
              value={minPrice}
              onChange={onMinPriceChange}
            />
            <input
              type="text"
              placeholder="До"
              id="to"
              className={style.input}
              value={maxPrice}
              onChange={onMaxPriceChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
