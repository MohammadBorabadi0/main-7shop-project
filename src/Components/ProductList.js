import React, { useState } from "react";

// Icons
import { BiSliderAlt } from "react-icons/bi";

// Components
import Filter from "./Filter";
import ProductItem from "./ProductItem";
// Layout
import Layout from "../Layout/Layout";
// Context
import { useFilter } from "../Providers/Context/filter_context";
import Sort from "./Sort";
import FilterByBrand from "./FilterByBrand";
import FilterMobile from "./FilterMobile";

const ProductList = ({ showFilter }) => {
  const { filtered_products } = useFilter();

  return (
    <div
      className={`${
        filtered_products.length ? "grid" : "flex"
      } grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        !showFilter ? "xl:grid-cols-4" : null
      } gap-x-2 gap-y-8 px-3 xl:px-0`}
    >
      {filtered_products.length ? (
        filtered_products.map((item, index) => (
          <ProductItem key={item.id} product={item} index={index} />
        ))
      ) : (
        <div className="font-medium p-2 text-lg flex-1">
          <h2>Sorry, no products matched your search.</h2>
        </div>
      )}
    </div>
  );
};

export default ProductList;
