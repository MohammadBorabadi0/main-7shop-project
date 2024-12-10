import React, { useState } from "react";

// Icons
import { FaHeart } from "react-icons/fa";
import { REMOVE_FROM_FAVORITES } from "../actions";

// Context
import { useFilter } from "../Providers/Context/filter_context";

const FavoriteItem = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const { dispatch } = useFilter();

  const handleRemove = (item) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: item });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white py-6 shadow-md hover:shadow-xl rounded-md">
      <div className="flex justify-end items-center px-4">
        <span onClick={() => handleRemove(item)}>
          <FaHeart
            size="25px"
            className="text-red-600"
            onClick={() => handleRemove(item)}
          />
        </span>
      </div>
      <div className="flex justify-center">
        <img src={item.imageURL} alt={item.name} className="w-1/2" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h4>{item.name}</h4>
        <span className="text-orange-500 font-semibold">${item.price}</span>
      </div>
    </div>
  );
};

export default FavoriteItem;
