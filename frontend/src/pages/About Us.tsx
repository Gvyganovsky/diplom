import Hero from "../components/Hero";

const AboutUs = () => {
  return (
    <>
      <Hero
        title="О компании AgroScout"
        imageSrc="./iconDrone_flying.svg"
        backgroundImage="./Background/AboutUs.jpg"
        text="Наша команда состоит из профессионалов в области эффективного применения беспилотных летательных аппаратов"
        listItems={[
          { title: "50 000 Га", text: "ежегодной обработки" },
          { title: "30%", text: "экономии средств" },
          { title: "10 команд", text: "специалистов" },
        ]}
      />
    </>
  );
};

export default AboutUs;
