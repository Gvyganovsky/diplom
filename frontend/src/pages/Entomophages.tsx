import ContactForm from "../components/ContactForm";
import Hero from "../components/Hero";
import Post from "../components/Post";
import Trust from "../components/Trust";
import Text from "../components/Text";
import Problems from "../components/Entomophages/Problems";

const advantagesData = [
  {
    img: "iconRuble.svg",
    title: "Доступная цена",
    text: "Низкая стоимость по сравнению с расходами на химическую обработку растений."
  },
  {
    img: "IconWallet.svg",
    title: "Экономия",
    text: "Низкие затраты на внесение трихограмм, златоглазки и габробракону по сравнению с трационными методами обработки."
  },
  {
    img: "iconDrone.svg",
    title: "Эффективность",
    text: "Высокая эффективность, снижение потерь урожайности в результате обработки с/х культур более чем на 90%."
  },
  {
    img: "iconDrones.svg",
    title: "Оперативность",
    text: "За 6 0 минут полета дрон со специальным дозатором обрабатывает до 100 гектаров."
  },
  {
    img: "iconInsect.svg",
    title: "Широкий спектр действия",
    text: "Двукратное внесение позволяет уничтожать несколько поколений вредителей."
  },
  {
    img: "iconDroneone.svg",
    title: "Равномерное распределение",
    text: "Внесение с БПЛА гарантирует внедрение особей трихограммы, златогласки, габробракрну равномерно на всех участках поля."
  }
];

const Entomophages = () => {
  return (
    <>
      <Hero
        title="Высокоэффективные Энтомофаги"
        backgroundImage="./Background/Entomophages.jpg"
        text="Внесение энтофагов при помощи БПЛА увеличивает эффективность защиты растений до 90%"
        listAltItems={[
          { img: "./Hero/iconSoy.svg", title: "до 90% сои" },
          { img: "./Hero/iconBeet.svg", title: "до 85% сахарной свеклы" },
          { img: "./Hero/iconRape.svg", title: "до 70% рапса" },
          { img: "./Hero/iconSunflower.svg", title: "до 85% подсолнуха" },
          { img: "./Hero/iconCorn.svg", title: "до 80 % кукурудзы" },
          {
            img: "./Hero/iconFruits.svg",
            title: "до 90 % овощных и плодовых культ",
          },
        ]}
      />

      <Text
        title="Об Услуге"
        textFirst="Компания AGROSCOUT за время научной работы совместно с ведущими НИИ страны разработала высокоэффективный метод защиты посевов от вредителей с использованием энтомофагов. Самый современный технопарк в стране, позволяет нам точно и быстро вносить трихограмму, златоглазку и габробракон на любых посевных площадях, включая труднодоступные участки, без применения тяжелой техники."
        textSecond="Эти энтомофаги обеспечивают естественное регулирование численности вредителей, что позволяет существенно снизить или полностью отказаться от использования химических пестицидов. В результате повышается экологическая безопасность агропроизводства, улучшается качество продукции и сохраняется биоразнообразие. Кроме того, использование дронов и других передовых технологий позволяет проводить мониторинг состояния посевов в режиме реального времени. Это дает возможность оперативно реагировать на появление вредителей и своевременно вносить биопрепараты, обеспечивая максимальную эффективность защиты."
      />

      <Trust title="Плюсы использования" data={advantagesData} />

      <Problems />

      <ContactForm />

      <Post
        title="Эффективная защита"
        text="Трихограмма — мелкое насекомое, которое будучи личинкой, питается яйцами паразитов. Современные комплексы БПЛА (дроны) могут использоваться не только для сбора информации, но и для высокоэффективной и экономичной борьбы с вредителями урожая с помощью распыления трихограммы. Трихограмму можно вносить для защиты от совок, кукурузного мотылька, лугового мотылька и других чешуекрылых вредителей. Она паразитирует на яйцах более 70 видов вредителей."
        img="./Post/Trichogram.png"
        description1="Расселение трихограммы на полях России рекомендуется проводить как в стандартные сроки внесения, в которые наблюдается максимальная активность всех видов вредителей, так и при видимом появлении вредителей. В этом случае можно добиться максимальной эффективности с минимальным вредом для культур."
        description2="Для расселения трихограммы используется специальная автоматизированная система, которая устанавливается на дроны мультироторного типа."
        description3="За 60 минут полета дрон со специальным дозатором обрабатывает до 100 гектаров. Эффективность комплексной защиты растений с помощью энтомофагов достигает 90%."
      />
    </>
  );
};

export default Entomophages;
