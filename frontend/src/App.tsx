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
import Registration from "./pages/Auth/Registration";
import Authorization from "./pages/Auth/Authorization";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
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

        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/signup" element={<Registration />} />
        <Route path="/auth/login" element={<Authorization />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
