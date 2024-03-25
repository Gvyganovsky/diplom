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
      <Header />       <Basket />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/Entomophages" element={<Entomophages />} />
      </Routes>

      <Routes>
        <Route path="/Spraying" element={<Spraying />} />
      </Routes>

      <Routes>
        <Route path="/MapMonitoring" element={<MapMonitoring />} />
      </Routes>

      <Routes>
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>

      <Routes>
        <Route path="/Product" element={<Product />} />
      </Routes>

      <Routes>
        <Route path="/Contact" element={<Contact />} />
      </Routes>

      <Routes>
        <Route path="/News" element={<News />} />
      </Routes>

      <Routes>
        <Route path="/Catalog" element={<Catalog />} />
      </Routes>

      <Routes>
        <Route path="/Product" element={<Product />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
