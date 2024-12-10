import React from "react";

// React-Router_Dom
import { useNavigate } from "react-router-dom";
// Icons
import { FaHeart } from "react-icons/fa";
import { BiCart, BiHeart } from "react-icons/bi";
// Context
import { useCart } from "../Providers/Context/cart_context";
import { useFilter } from "../Providers/Context/filter_context";
import { ADD_TO_CART } from "../actions";
import { isExists } from "../utils/helper";

const ProductDetailButtons = ({
  handleFavorites,
  product,
  isFavorite,
  selectedSize,
}) => {
  const { cart, dispatch, numberOfAmounts } = useCart();
  const { favorites_products } = useFilter();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch({ type: ADD_TO_CART, payload: product, size: selectedSize });
    } else {
      alert("Please select size !!!");
    }
  };

  return (
    <section className="flex items-center gap-4">
      <div
        onClick={handleAddToCart}
        className="flex items-center justify-center bg-orange-500 hover:bg-white hover:text-orange-500 border-2 border-orange-500 text-white transition-colors duration-200 gap-2 text-base md:text-lg px-3 py-1.5 font-bold cursor-pointer rounded-xl w-fit sm:px-6"
      >
        <BiCart size="25px" />
        <button className="font-medium">
          {isExists(cart, product) ? "In Cart" : "Add To Cart"}
        </button>
      </div>
      <div
        className={`flex items-center justify-center text-white transition-colors duration-200 gap-2 text-base md:text-lg px-3 py-1.5 font-bold cursor-pointer rounded-xl w-fit ${
          isExists(favorites_products, product) && isFavorite
            ? "bg-red-300 hover:bg-red-400 border-2 border-red-300 hover:border-red-400"
            : "bg-yellow-500 hover:bg-white hover:text-yellow-500 border-2 border-yellow-500"
        }`}
        onClick={handleFavorites}
      >
        {!isExists(favorites_products, product) && !isFavorite && (
          <button className="flex items-center gap-2 font-medium">
            <BiHeart size="25px" />
            <span className="hidden sm:flex">Add To Favorites</span>
          </button>
        )}
        {isExists(favorites_products, product) && (
          <button className="flex items-center gap-2 font-medium">
            <FaHeart size="22px" className="text-red-600" />
            <span className="hidden sm:flex">Remove From Favorites</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductDetailButtons;
