import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import News from "./pages/News";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Entomophages from "./pages/Entomophages";
import Home from "./pages/Home";
import Spraying from "./pages/Spraying";
import MapMonitoring from "./pages/MapMonitoring";
import AboutUs from "./pages/About Us";
import Basket from "./components/Basket";

function App() {
  return (
    <>
      <Header />
      <Basket />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Entomophages" element={<Entomophages />} />
        <Route path="/Spraying" element={<Spraying />} />
        <Route path="/MapMonitoring" element={<MapMonitoring />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/News" element={<News />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
