import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Context
import { Auth0Provider } from "@auth0/auth0-react";
import ProductsProvider from "./Providers/Context/products_context";
import FilterProvider from "./Providers/Context/filter_context";
import CartProvider from "./Providers/Context/cart_context";
import UserProvider from "./Providers/Context/user_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
  domain="dev-b5mz3as7.us.auth0.com"
  clientId="c0N25XxHzKn9pvNXohKdeejppnuSXSm4"
  redirectUri={window.location.origin}
  cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
