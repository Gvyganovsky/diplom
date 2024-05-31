import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import News from "./pages/News";
<<<<<<< HEAD
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Entomophages from "./pages/Entomophages";
import Home from "./pages/Home";
import Spraying from "./pages/Spraying";
=======
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product";
import Entomophages from "./pages/Entomophages";
import Home from "./pages/Home";
import Spraying from "./pages/Spraying/Spraying";
>>>>>>> master
import MapMonitoring from "./pages/MapMonitoring";
import AboutUs from "./pages/About Us";
import Basket from "./components/Basket";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from './contexts/AuthContext';
import React from "react";
import BasketContext from "./contexts/BasketContext";
import Orders from "./pages/Orders/Orders";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
<<<<<<< HEAD
import EditUser from "./pages/Admin/EditUser";
import EditProduct from "./pages/Admin/EditProduct";
=======
>>>>>>> master

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
          <Route path="/Orders" element={<Orders />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
<<<<<<< HEAD
          <Route path="/admin/users/edit/:id" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/edit/:id" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />
=======
>>>>>>> master

          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </BasketContext.Provider>
    </AuthProvider>
  );
}

export default App;
