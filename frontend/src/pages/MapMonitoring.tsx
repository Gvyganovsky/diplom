import ContactForm from "../components/ContactForm";
import Hero from "../components/Hero";
import AreasOfApplication from "../components/MapMonitoring/Areas of application";
import DataReceived from "../components/MapMonitoring/DataReceived";
import HowItWorks from "../components/MapMonitoring/How it works";

const MapMonitoring = () => {
  return (
    <>
      <Hero
        title="Агромониторинг для управления бизнесом"
        backgroundImage="./Background/MapMonitoring.jpg"
        text="Высокое качество продукции и хороший урожай - результат точного планирования и быстрого реагирования на возникающие посевам угроз."
        listAltItems={[
          {
            img: "./MapMonitoring/iconSetting.svg",
            title: "Полная автоматизация",
          },
          {
            img: "./MapMonitoring/iconTime.svg",
            title: "Оперативность съемки",
          },
          {
            img: "./MapMonitoring/iconDesign_tool.svg",
            title: "Высокая точность",
          },
        ]}
      />

      <DataReceived />


      <AreasOfApplication />

      <HowItWorks />
      
      <ContactForm />
    </>
  );
};

export default MapMonitoring;
