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
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from './contexts/delete';
import React from "react";
import BasketContext from "./contexts/BasketContext";

function App() {
  const [basketOpened, setBasketOpened] = React.useState(false);

  return (
    <AuthProvider>
      <BasketContext.Provider value={{ setBasketOpened }}>
        <Header />
        {basketOpened && <Basket />}
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
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<SignIn />} />
        </Routes>
        <Footer />
      </BasketContext.Provider>
    </AuthProvider>
  );
}

export default App;
