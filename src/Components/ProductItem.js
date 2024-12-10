import React, { useState } from "react";
// Toastify
import { toast } from "react-toastify";
// Icons
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
// React-Router-Dom
import { useNavigate } from "react-router-dom";
// Actions
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions";
// Context
import { useFilter } from "../Providers/Context/filter_context";
// Utils
import { isExists } from "../utils/helper";

const ProductItem = ({ product, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { dispatch, favorites_products } = useFilter();
  const navigate = useNavigate();

  const addToFavoritesHandler = (e) => {
    e.stopPropagation();
    toast.success("Added to favorites");
    setIsFavorite(!isFavorite);
    dispatch({ type: ADD_TO_FAVORITES, payload: product });
  };

  const removeFavoritesHandler = (e) => {
    e.stopPropagation();
    toast.error("Remove from favorites");
    setIsFavorite(!isFavorite);
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: product });
  };

  return (
    <section
      className="shadow-md hover:shadow-xl cursor-pointer rounded-md py-8 bg-white"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="flex justify-end items-center px-6">
        {!isExists(favorites_products, product) && !isFavorite && (
          <button onClick={(e) => addToFavoritesHandler(e)}>
            <BiHeart size="28px" />
          </button>
        )}
        {isExists(favorites_products, product) && (
          <button onClick={(e) => removeFavoritesHandler(e)}>
            <FaHeart size="24px" className="text-red-600" />
          </button>
        )}
      </div>
      <div>
        <img
          src={product.imageURL}
          alt={product.name}
          className="h-[300px] w-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 text-center font-semibold px-4">
        <h3>{product.brand}</h3>
        <h4 className="text-lg text-slate-800 font-semibold">{product.name}</h4>
        <span className="text-orange-600">${product.price}</span>
      </div>
    </section>
  );
};

export default ProductItem;
