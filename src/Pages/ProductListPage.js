import React, { useState } from "react";

// Icons
import { BiSliderAlt } from "react-icons/bi";

// Components
import Filter from "../Components/Filter";
import Sort from "../Components/Sort";
import FilterByBrand from "../Components/FilterByBrand";
import FilterMobile from "../Components/FilterMobile";
import ProductList from "../Components/ProductList";
// Layout
import Layout from "../Layout/Layout";
// Context
import { useFilter } from "../Providers/Context/filter_context";

const ProductListPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const { filtered_products } = useFilter();

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4 px-3 xl:px-0">
        <h4 className="text-sm lg:text-xl text-slate-400">
          {filtered_products.length} Products Found
        </h4>
        <div className="hidden lg:flex items-center gap-8">
          <button
            className="flex items-center gap-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Hide Filters" : "Show Filters"} <BiSliderAlt />
          </button>
          <Sort />
        </div>
        <div
          className="flex lg:hidden items-center gap-2 border border-slate-400 rounded-full px-4 py-1 cursor-pointer"
          onClick={() => setShowFilterMobile(true)}
        >
          Filter
          <BiSliderAlt />
        </div>
      </div>
      {showFilterMobile && (
        <FilterMobile
          showFilterMobile={showFilterMobile}
          setShowFilterMobile={setShowFilterMobile}
        />
      )}
      <FilterByBrand />
      <main className="flex gap-4">
        {showFilter ? <Filter /> : null}
        <section className="flex-[5_5_0%]">
          <ProductList showFilter={showFilter} />
        </section>
      </main>
    </Layout>
  );
};

export default ProductListPage;
