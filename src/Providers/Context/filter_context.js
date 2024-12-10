import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from "../../actions";

// Reducer
import filter_reducer from "../Reducers/filter_reducer";
import { useProducts } from "./products_context";

// InitialState
const initialState = {
  filtered_products: [],
  all_products: [],
  favorites_products: [],
  appliedFilters: [],
  filters: {
    gender: "",
    brand: "",
    category: "",
    size: "",
    search: "",
  },
  sort: "lowest",
};

// createContext
const FilterContext = createContext();

// Provider
const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filter_reducer, initialState);
  const { products } = useProducts();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const updateSort = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (!value) {
      value = e.target.textContent;
    }
    dispatch({ type: UPDATE_SORT, payload: { name, value } });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // Size
    if (name === "size") {
      value = e.target.dataset.size;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, dispatch, updateSort, updateFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

// custom Hook
export const useFilter = () => useContext(FilterContext);
