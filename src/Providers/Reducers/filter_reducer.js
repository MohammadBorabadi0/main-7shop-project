import React from "react";

// Actions
import {
  ADD_APPLIED_FILTERS,
  ADD_TO_FAVORITES,
  CLEAR_FILTERS,
  CLEAR_SEARCH_BOX,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  REMOVE_APPLIED_FILTERS,
  REMOVE_FROM_FAVORITES,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from "../../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    }
    case FILTER_PRODUCTS: {
      const { filters, all_products } = state;
      const { search, gender, category, size, brand } = filters;
      let tempProducts = [...all_products];

      // Search
      if (search) {
        tempProducts = tempProducts.filter((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Gender
      if (gender) {
        tempProducts = tempProducts.filter((i) =>
          i.gender.toLowerCase().startsWith(gender.toLowerCase())
        );
      }

      // Brand
      if (brand !== "all") {
        tempProducts = tempProducts.filter((i) =>
          i.brand.toLowerCase().includes(brand.toLowerCase())
        );
      }

      if (category) {
        tempProducts = tempProducts.filter((i) =>
          i.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      // Size
      if (size) {
        tempProducts = tempProducts.filter((i) =>
          i.size.find((c) => c.toString() === size)
        );
      }

      return { ...state, filtered_products: tempProducts };
    }
    case UPDATE_SORT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case SORT_PRODUCTS: {
      const { filtered_products, sort } = state;
      let tempProducts = [...filtered_products];

      if (sort === "lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }

      if (sort === "highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }

      return { ...state, filtered_products: tempProducts };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        appliedFilters: [],
        filters: { gender: "", brand: "", category: "", size: "", search: "" },
        sort: "lowest",
      };
    }
    case CLEAR_SEARCH_BOX: {
      return { ...state, filters: { ...state.filters, search: "" } };
    }
    case ADD_TO_FAVORITES: {
      const updatedFavoritesProducts = [...state.favorites_products];
      updatedFavoritesProducts.push({ ...action.payload });
      return { ...state, favorites_products: updatedFavoritesProducts };
    }
    case REMOVE_FROM_FAVORITES: {
      const updatedFavoritesProducts = [...state.favorites_products];
      const filteredFavoritesProducts = updatedFavoritesProducts.filter(
        (i) => i.id !== action.payload.id
      );
      return { ...state, favorites_products: filteredFavoritesProducts };
    }
    case ADD_APPLIED_FILTERS: {
      const updatedAppliedFilters = [...state.appliedFilters];
      const findItem = updatedAppliedFilters.find(
        (i) => i.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (!findItem && action.payload.name !== "sort") {
        updatedAppliedFilters.push({ ...action.payload });
      }
      return { ...state, appliedFilters: updatedAppliedFilters };
    }
    case REMOVE_APPLIED_FILTERS: {
      const { name } = action.payload;
      const updatedAppliedFilters = [...state.appliedFilters];
      const filteredApplied = updatedAppliedFilters.filter(
        (i) => i.name.toLowerCase() !== name.toLowerCase()
      );
      return {
        ...state,
        appliedFilters: filteredApplied,
        filters: { ...state.filters, [name]: "" },
      };
    }
    default: {
      return state;
    }
  }
};

export default filter_reducer;
