import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import News from "./pages/News";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product";
import Entomophages from "./pages/Entomophages";
import Home from "./pages/Home";
import Spraying from "./pages/Spraying/Spraying";
import MapMonitoring from "./pages/MapMonitoring";
import AboutUs from "./pages/About Us";
import Basket from "./components/Basket";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Profile from "./pages/Profile";
import { AuthProvider } from './contexts/AuthContext';
import BasketContext from "./contexts/BasketContext";
import Orders from "./pages/Orders/Orders";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  const [basketOpened, setBasketOpened] = React.useState(false);

  useEffect(() => {
    if (basketOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [basketOpened]);

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
          <Route path="/Orders" element={<Orders />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BasketContext.Provider>
    </AuthProvider>
  );
}

export default App;
