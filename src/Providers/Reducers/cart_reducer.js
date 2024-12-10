import React from "react";

// Actions
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE,
  INCREASE,
  REMOVE_FROM_CART,
} from "../../actions";

// Toastify
import { toast } from "react-toastify";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const updatedCart = [...state.cart];
      const updatedIndex = updatedCart.findIndex(
        (i) => i.id === action.payload.id
      );
      if (updatedIndex < 0) {
        updatedCart.push({ ...action.payload, quantity: 1, size: action.size });
      } else if (updatedIndex === 0) {
        toast.error("This product has already been added to the cart !");
      }
      return { ...state, cart: updatedCart };
    }
    case REMOVE_FROM_CART: {
      const updatedCart = [...state.cart];
      const filteredCart = updatedCart.filter(
        (i) => i.id !== action.payload.id
      );
      return { ...state, cart: filteredCart };
    }
    case INCREASE: {
      const updatedCart = [...state.cart];
      const findIndex = updatedCart.findIndex(
        (i) => i.id === action.payload.id
      );
      updatedCart[findIndex].quantity++;
      return { ...state, cart: updatedCart };
    }
    case DECREASE: {
      const updatedCart = [...state.cart];
      const findIndex = updatedCart.findIndex(
        (i) => i.id === action.payload.id
      );
      updatedCart[findIndex].quantity--;
      return { ...state, cart: updatedCart };
    }
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    default: {
      return state;
    }
  }
};

export default cart_reducer;
