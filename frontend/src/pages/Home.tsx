import Hero from "../components/Hero";
import Trust from "../components/Trust";
import OurOffers from "../components/Home/OurOffers";
import Applications from "../components/Home/Applications";
import Clients from "../components/Home/Clients";
import News from "../components/Home/News";
import WhereWeWork from "../components/Home/WhereWeWork";
import Text from "../components/Text";
import { trustData } from "../Data";

const Home = () => {
  return (
    <>
      <Hero
        title="AgroScout - беспилотные технологии для сельского хозяйства и промышлености"
        Background="/Background/bgBackgroundhero.jpg"
        imageAdapt="/Background/1.png"
        listItems={[
          { title: "50 000 Га", text: "ежегодной обработки" },
          { title: "30%", text: "экономии средств" },
          { title: "10 команд", text: "специалистов" },
        ]}
      />
      <Trust title="Почему нам доверяют?" data={trustData} />
      <OurOffers />
      <Applications />
      <Clients />
      <Text
        title="Кто мы такие"
        textFirst="Компания STS.center применяет высокотехнологичные агродроны и БПЛА, которые модернизированы и собраны нашими инженерами для сельского и лесного хозяйства, а также для промышленности. В СТС Центр работают опытные агрономы, энтомологи, пилоты, менеджеры и инженеры. Сегодня мы имеем один из самых современных парков дронов в России, что позволяет нам выполнять работы широкого спектра от простой аэрофотосъемки до лидарного сканирования местности и тепловизионного контроля. Внедрение беспилотных технологий в вашем бизнесе поможет сэкономить время и деньги, а также позволит получить большое преимущество перед вашими конкурентами."
        textSecond=" Компания STS.center применяет высокотехнологичные агродроны и БПЛА, которые модернизированы и собраны нашими инженерами для сельского и лесного хозяйства, а также для промышленности. В СТС Центр работают опытные агрономы, энтомологи, пилоты, менеджеры и инженеры. Сегодня мы имеем один из самых современных парков дронов в России, что позволяет нам выполнять работы широкого спектра от простой аэрофотосъемки до лидарного сканирования местности и тепловизионного контроля. Внедрение беспилотных технологий в вашем бизнесе поможет сэкономить время и деньги, а также позволит получить большое преимущество перед вашими конкурентами."
      />
      <WhereWeWork />
      <News />
    </>
  );
};

export default Home;
