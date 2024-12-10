import React, { useState } from "react";

// Icons
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import {
  ADD_APPLIED_FILTERS,
  CLEAR_FILTERS,
  REMOVE_APPLIED_FILTERS,
  UPDATE_FILTERS,
} from "../actions";

// Context
import { useFilter } from "../Providers/Context/filter_context";

// Utils
import { getUniqueValue } from "../utils/helper";

const Filter = () => {
  const [showGender, setShowGender] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const { all_products, filtered_products, appliedFilters, filters, dispatch } =
    useFilter();

  // getUniqueValues
  const genderList = getUniqueValue(all_products, "gender");
  const categories = getUniqueValue(all_products, "category");
  const sizeList = getUniqueValue(all_products, "size");

  const handleFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "size") {
      value = e.target.dataset.size;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    dispatch({
      type: ADD_APPLIED_FILTERS,
      payload: { id: new Date().getTime(), name: name },
    });
  };

  const handleRemove = (item) => {
    dispatch({ type: REMOVE_APPLIED_FILTERS, payload: item });
  };

  return (
    <aside className="flex-1 px-3 py-6 border rounded-md shadow-md h-fit sticky top-16 bg-white">
      <div className="hidden sm:flex flex-col gap-4 max-h-[calc(100vh-200px)] pr-4 aside overflow-auto">
        {/* Header  */}
        <header className="pb-4 border-b">
          <h2 className="text-xl font-medium">Filter By</h2>
        </header>
        {/* AppliedFilters  */}
        {appliedFilters.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="font-medium">AppliedFilters</h2>
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map((item) => (
                <button
                  key={item.id}
                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <IoClose size="22px" onClick={() => handleRemove(item)} />
                  {item.name}
                </button>
              ))}
            </div>
          </section>
        )}
        {/* Gender  */}
        <section className="flex flex-col items-center gap-1.5 border-b pb-4">
          <div
            className="flex items-center justify-between w-full"
            onClick={() => setShowGender(!showGender)}
          >
            <h4 className="font-semibold">Gender</h4>
            <FiChevronDown
              size="25px"
              className={showGender ? "rotate-180" : null}
            />
          </div>
          {showGender &&
            genderList.map((item, index) => (
              <div key={index} className="form-check w-full">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  name="gender"
                  value={item.toLowerCase()}
                  onChange={(e) => handleFilters(e)}
                  id={item}
                  checked={
                    item.toLowerCase() === filters.gender.toLowerCase() && true
                  }
                />
                <label
                  className="w-3/4 form-check-label inline-block text-gray-800 cursor-pointer"
                  htmlFor={item}
                >
                  {item}
                </label>
              </div>
            ))}
        </section>
        {/* Category  */}
        <section className="flex flex-col gap-4 border-b pb-4">
          <div
            className="flex justify-between items-center font-semibold cursor-pointer"
            onClick={() => setShowCategories(!showCategories)}
          >
            <h4 className="font-semibold">Category</h4>
            <FiChevronDown
              size="25px"
              className={showCategories ? "rotate-180" : null}
            />
          </div>
          {showCategories &&
            categories.map((item, index) => (
              <div key={index} className="form-check w-full">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={item.toLowerCase()}
                  onChange={(e) => handleFilters(e)}
                  id={item}
                  name="category"
                  checked={
                    item.toLowerCase() === filters.category.toLowerCase() &&
                    true
                  }
                />
                <label
                  className="w-3/4 cursor-pointer form-check-label inline-block text-gray-800"
                  htmlFor={item}
                >
                  {item}
                </label>
              </div>
            ))}
        </section>
        {/* Sizes  */}
        <section className="flex flex-col gap-4 border-b pb-4">
          <div
            className="flex justify-between items-center font-semibold cursor-pointer"
            onClick={() => setShowSizes(!showSizes)}
          >
            <h4>Size</h4>
            <FiChevronDown
              size="25px"
              className={`${showSizes && "rotate-180"}`}
            />
          </div>
          {showSizes &&
            sizeList.map((item, index) => (
              <div key={index} className="form-check w-full">
                <input
                  data-size={item}
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={item.toString()}
                  onChange={(e) => handleFilters(e)}
                  id={item.toString()}
                  name="size"
                  checked={item.toString() === filters.size && true}
                />
                <label
                  className="w-3/4 cursor-pointer form-check-label inline-block text-gray-800"
                  htmlFor={item}
                >
                  {item}
                </label>
              </div>
            ))}
        </section>
        <section>
          <button
            className="bg-red-700 text-white font-semibold px-2 py-1 rounded-md"
            onClick={() => dispatch({ type: CLEAR_FILTERS })}
          >
            Clear Filters
          </button>
        </section>
      </div>
    </aside>
  );
};

export default Filter;
