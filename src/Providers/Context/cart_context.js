import React, { createContext, useContext, useEffect, useReducer } from "react";

// Reducer
import cart_reducer from "../Reducers/cart_reducer";

// getLocalStorage
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

// InitialState
const initialState = {
  cart: getLocalStorage(),
};

// createContext
const CartContext = createContext();

// Provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_reducer, initialState);

  const numberOfAmounts = state.cart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const total = state.cart
    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    .toFixed(2);

  useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, dispatch, numberOfAmounts, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// custom Hook
export const useCart = () => useContext(CartContext);
