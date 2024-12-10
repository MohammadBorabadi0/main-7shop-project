import React, { useState } from "react";
import data from "../db.json";
import { useParams, useNavigate } from "react-router-dom";
// Toastify
import { toast } from "react-toastify";
// Layout
import DetailLayout from "../Layout/DetailLayout";
// Context
import { useCart } from "../Providers/Context/cart_context";
import { useFilter } from "../Providers/Context/filter_context";
// Icons
import { FiChevronLeft } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
// Components
import ProductDetailButtons from "./ProductDetailButtons";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions";

const ProductDetail = () => {
  // useState
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const { dispatch } = useFilter();
  const { numberOfAmounts } = useCart();
  const id = +useParams().id;
  const product = data.find((i) => i.id === id);
  const sizeList = product.size;
  const navigate = useNavigate();

  const handleFavorites = () => {
    if (!isFavorite) {
      toast.success("Added to favorites");
      setIsFavorite(!isFavorite);
      dispatch({ type: ADD_TO_FAVORITES, payload: product });
    }
    if (isFavorite) {
      toast.error("Remove from favorites");
      setIsFavorite(!isFavorite);
      dispatch({ type: REMOVE_FROM_FAVORITES, payload: product });
    }
  };

  if (product)
    return (
      <DetailLayout>
        <section className="flex flex-col lg:flex-row bg-gray-300 md:bg-white md:rounded-xl md:overflow-hidden">
          <div className="flex flex-col sm:flex-1 border-r">
            <div className="flex sm:hidden justify-between items-center text-3xl text-slate-700 p-6">
              <span className="cursor-pointer" onClick={() => navigate("/")}>
                <FiChevronLeft />
              </span>
              <span className="block cursor-pointer relative">
                <BiCart size="25px" onClick={() => navigate("/cart")} />
                <span className="absolute top-[-12px] right-[-13px] bg-red-700 text-white px-1 rounded-md text-sm">
                  {numberOfAmounts === 0 ? null : numberOfAmounts}
                </span>
              </span>
            </div>
            <div className="flex justify-center">
              <img src={`../${product.imageURL}`} alt={product.name} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-1 gap-6 bg-white rounded-t-[2.5rem] sm:rounded-none px-6 py-8">
            <div className="flex justify-between items-center font-bold">
              <h4 className="text-lg">{product.name}</h4>
              <span className="text-xl">${product.price}</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Size</h4>
                <span className="text-gray-400 font-medium">Size Guide</span>
              </div>
              <div className="flex gap-2">
                {sizeList.map((item, index) => (
                  <button
                    key={index}
                    className={`px-2 py-1 bg-gray-100 shadow-lg rounded-md font-semibold text-lg ${
                      selectedSize === item && "bg-orange-700 text-white"
                    }`}
                    onClick={() => setSelectedSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className="flex justify-between items-center text-xl font-semibold cursor-pointer"
                onClick={() => setShowDescription(!showDescription)}
              >
                <h4>Description</h4>
                <FiChevronDown
                  size="25px"
                  className={`${showDescription && "rotate-180"}`}
                />
              </div>
              <p
                className={`mt-4 max-h-0 overflow-hidden ${
                  showDescription && "max-h-fit"
                }`}
              >
                {product.description}
              </p>
            </div>
            <ProductDetailButtons
              selectedSize={selectedSize}
              isFavorite={isFavorite}
              product={product}
              handleFavorites={handleFavorites}
            />
          </div>
        </section>
      </DetailLayout>
    );
};

export default ProductDetail;
