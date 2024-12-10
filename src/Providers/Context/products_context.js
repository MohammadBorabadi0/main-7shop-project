import React, { createContext, useContext, useReducer } from "react";

// Data
import data from "../../db.json";
// Reducer 
import products_reducer from "../Reducers/products_reducer";

// InitialState
const initialState = {
  products: data,
};

// createContext
const ProductsContext = createContext();

// provider
const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

// custom Hooks
export const useProducts = () => useContext(ProductsContext);
