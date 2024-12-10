import React from "react";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React-Router-Dom
import { Navigate, Route, Routes } from "react-router-dom";
// Components
import ProductDetail from "./Components/ProductDetail";
import FavoriteList from "./Components/FavoriteList";
import CartPage from "./Pages/CartPage";
import ProfilePage from "./Pages/ProfilePage";
import ProductListPage from "./Pages/ProductListPage";
import CheckoutPage from "./Pages/CheckoutPage";
import PrivateRoute from "./Components/PrivateRoute";
import PaymentPage from "./Pages/PaymentPage";
import AboutPage from "./Pages/AboutPage";

const App = () => {
  return (
    <>
      {/* توسعه داده شده توسط محمد برآبادی 
    Developed By Mohammad Borabadi   */}

      <ToastContainer />
      <Routes>
        <Route path="about" element={<AboutPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="favorites" element={<FavoriteList />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route
          path="payment"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<ProductListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
